// @flow
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { emailFromPhoneNumber, standardPhoneNumber } from '../utils/AuthenticationItils';
import { turnOffLoading, turnOnLoading } from './index';
import { AuthenticationActions } from './constants';

export const loginByPhone = (phoneNumber: string, confirm: FirebaseAuthTypes.ConfirmationResult) => 
  ({type: AuthenticationActions.LOGIN_BY_PHONE, phoneNumber, confirm})
export const canLoginByPassword = (phoneNumber: string) => ({type: AuthenticationActions.CAN_LOGIN_BY_PASSWORD, phoneNumber})
export const loginByPassword = (user: FirebaseAuthTypes.UserCredential) => ({type: AuthenticationActions.LOGIN_BY_PASSWORD, user})
export const forgotPassword = (phoneNumber: string, confirm: FirebaseAuthTypes.ConfirmationResult) => 
  ({type: AuthenticationActions.FORGOT_PASSWORD, phoneNumber, confirm})
export const verifyLoginCode = (user: FirebaseAuthTypes.UserCredential) => ({type: AuthenticationActions.VERIFY_LOGIN_CODE, user})
export const verifyLoginCodeForChangePassword = (user: FirebaseAuthTypes.UserCredential) => ({type: AuthenticationActions.VERIFY_LOGIN_CODE_FOR_CHANGE_PASSWORD, user})
export const register = () => ({type: AuthenticationActions.REGISTER})
export const changePassword = (password: string) => ({type: AuthenticationActions.CHANGE_PASSWORD, password})
export const loginAuto = (user: FirebaseAuthTypes.UserCredential) => ({type: AuthenticationActions.LOGIN_AUTO, user})
export const chooseAnotherPhoneNumber = () => ({type: AuthenticationActions.CHOOSE_ANOTHER_PHONE_NUMBER})
export const logout = () => ({type: AuthenticationActions.LOGOUT})

export const startLogin = (phoneNumber: string) => async (dispatch: Function) => {
  dispatch(turnOnLoading())
  try {
    const authenProviders = await auth().fetchSignInMethodsForEmail(emailFromPhoneNumber(phoneNumber))
    if (authenProviders && authenProviders.includes('password')) {
      dispatch(canLoginByPassword(phoneNumber))
    } else {
      const confirm = await auth().signInWithPhoneNumber(standardPhoneNumber(phoneNumber));
      dispatch(loginByPhone(phoneNumber, confirm))
    }
  } catch (error) {
    console.log('error', error);
    Alert.alert('Thông báo', 'Có lỗi kết nối đến server')
  } finally {
    dispatch(turnOffLoading())
  }
}

export const startForgotPassword = (phoneNumber: string) => async (dispatch: Function) => {
  dispatch(turnOnLoading())
  try {
    const authenProviders = await auth().fetchSignInMethodsForEmail(emailFromPhoneNumber(phoneNumber))
    if (authenProviders && authenProviders.includes('password')) {
      const confirm = await auth().signInWithPhoneNumber(standardPhoneNumber(phoneNumber));
      dispatch(forgotPassword(phoneNumber, confirm))
    } else {
      Alert.alert('Thông báo', 'Số điện thoại chưa tồn tại')
    }
  } catch (error) {
    console.log('error', error);
    Alert.alert('Thông báo', 'Có lỗi kết nối đến server')
  } finally {
    dispatch(turnOffLoading())
  }
}

export const startLoginWithPassword = (password: string) => async (dispatch: Function, getState: Function) => {
  dispatch(turnOnLoading())
  try {
    const phoneNumber: string = getState().authenticationStatus.phoneNumber
    const user = await auth().signInWithEmailAndPassword(emailFromPhoneNumber(phoneNumber), password)
    dispatch(loginByPassword(user))
  } catch (error) {
    console.log('error', error)
    Alert.alert('Thông báo', 'Sai mật khẩu')
  } finally {
    dispatch(turnOffLoading())
  }
}

export const startVerifyLoginCode = (code: string) => async (dispatch: Function, getState: Function) => {
  dispatch(turnOnLoading())
  try {
    const confirm: FirebaseAuthTypes.ConfirmationResult = getState().authenticationStatus.confirm
    const user = await confirm.confirm(code);
    dispatch(verifyLoginCode(user))
  } catch (error) {
    console.log('error', error)
    Alert.alert('Thông báo', 'Sai mã xác nhận')
  } finally {
    dispatch(turnOffLoading())
  }
}

export const startVerifyLoginCodeForChangePassword = (code: string) => async (dispatch: Function, getState: Function) => {
  dispatch(turnOnLoading())
  try {
    const confirm: FirebaseAuthTypes.ConfirmationResult = getState().authenticationStatus.confirm
    const user = await confirm.confirm(code);
    dispatch(verifyLoginCodeForChangePassword(user))
  } catch (error) {
    console.log('error', error)
    Alert.alert('Thông báo', 'Sai mã xác nhận')
  } finally {
    dispatch(turnOffLoading())
  }
}

export const startRegister = (password: string, displayName: string) => async (dispatch: Function, getState: Function) => {
  dispatch(turnOnLoading())
  try {
    const uid: string = getState().authenticationStatus.user.uid
    await firestore().collection('users').doc(uid).set({
      password,
      displayName
    }, {merge: true})
    dispatch(register())
  } catch (error) {
    console.log('error', error)
    Alert.alert('Thông báo', 'Có lỗi kết nối đến server')
  } finally {
    dispatch(turnOffLoading())
  }
}

export const startChangePassword = (password: string) => async (dispatch: Function, getState: Function) => {
  dispatch(turnOnLoading())
  try {
    if (password.length < 6) {
      Alert.alert('Thông báo', 'Mật khẩu phải lớn hơn 6 kí tự')
    } else {
      const uid: string = getState().authenticationStatus.user.uid
      await firestore().collection('users').doc(uid).set({ password }, {merge: true})
      dispatch(register())
    }
  } catch (error) {
    console.log('error', error)
    Alert.alert('Thông báo', 'Có lỗi kết nối đến server')
  } finally {
    dispatch(turnOffLoading())
  }
}