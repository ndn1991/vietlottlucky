// @flow

import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

export const AuthenticationActions = {
  START_LOGIN : 'START_LOGIN',
  START_LOGIN_SUCCESS : 'START_LOGIN_SUCCESS',
  START_LOGIN_FAIL: 'START_LOGIN_FAIL',
  VALIDATE_LOGIN_CODE : 'VALIDATE_LOGIN_CODE',
  LOGIN_SUCCESS : 'LOGIN_SUCCESS',
  REMOVE_AUTHENTICATION : 'REMOVE_AUTHENTICATION',
}

export const startLogin = (phoneNumber: string) => ({ type: AuthenticationActions.START_LOGIN, phoneNumber })
export const startLoginSuccess = () => ({ type: AuthenticationActions.START_LOGIN_SUCCESS })
export const startLoginFail = () => ({ type: AuthenticationActions.START_LOGIN_FAIL })
export const loginSuccess = () => ({ type: AuthenticationActions.LOGIN_SUCCESS })
export const removeAuthentication = () => ({ type: AuthenticationActions.REMOVE_AUTHENTICATION })
export const validateLoginCode = () => ({ type: AuthenticationActions.VALIDATE_LOGIN_CODE })

export const enterValidationCode = (code: string, props: any) => (dispatch: any) => {
  dispatch(validateLoginCode())
  console.log('enterValidationCode props', props.route.params.confirmmation)
  props.route.params.confirmmation.confirm(code).then(() => {
    dispatch(loginSuccess())
  }, (error) => {
    console.log('Fail to validate login code')
    Alert.alert('Thông báo', 'Sai mã xác nhận')
  })
}

export const login = (phoneNumber: string, props: any) => (dispatch: any) => {
  dispatch(startLogin(phoneNumber))
  auth().signInWithPhoneNumber('+84986219084').then((confirmmation) => {
    dispatch(startLoginSuccess())
    props.navigation.navigate('LoginValidation', {confirmmation})
  }, (error) => {
    dispatch(startLoginFail())
    console.log('error connect to firebase authentication', error)
    Alert.alert('Thông báo', 'Có lỗi kết nối đến server');
  })
}