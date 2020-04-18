// @flow
import React, { useState, useEffect } from "react";
import { Alert, View } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import EnterLoginPhoneNumber from "./EnterLoginPhoneNumber";
import VerifyLoginCode from "./VerifyLoginCode";
import EnterPasswordForLogin from "./EnterPasswordForLogin";
import EnterPasswordForRegister from './EnterPasswordForRegister'
import { loginSuccess } from "../../actions/authentication";
import Loader from '../../components/Loader'
import { connect } from "react-redux";

function PhoneSignIn(props: any) {
  const [confirm, setConfirm] = useState((null: any))
  const [showLoading, setShowLoading] = useState(false)
  const [hasPassword, setHasPassword] = useState(false)
  const [loginSuccessFirstTime, setLoginSuccessFirstTime] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    const user = auth().currentUser;
    console.log('user', user)
    if (user) {
      setLoginSuccessFirstTime(true)
    }
  })

  const standardPhoneNumberWithoutCountryCode = (phoneNumber: string) => phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber;
  const emailFromPhoneNumber = (phoneNumber: string) => `84${standardPhoneNumberWithoutCountryCode(phoneNumber)}@vietlottlucky.vn`;
  const standardPhoneNumber = (phoneNumber: string) => `+84${standardPhoneNumberWithoutCountryCode(phoneNumber)}`;
  
  const loginWithPhoneNumber = async (phoneNumber: string) => {
    setPhoneNumber(phoneNumber)
    const sendPhoneNumber = standardPhoneNumberWithoutCountryCode(phoneNumber);
    if (sendPhoneNumber.length != 9) {
      Alert.alert('Thông báo', 'Vui lòng nhập đúng số điện thoại')
    } else {
      setShowLoading(true)
      try {
        const authInfo = await auth().fetchSignInMethodsForEmail(emailFromPhoneNumber(phoneNumber))
        if (authInfo.includes('password')) {
          setHasPassword(true)
        } else {
          const confirmation = await auth().signInWithPhoneNumber(standardPhoneNumber(phoneNumber))
          setConfirm(confirmation)
        }
        setShowLoading(false)
      } catch (error) {
        console.log('error when send phone number to firebase authentication', error)
        setShowLoading(false)
        Alert.alert('Thông báo', 'Có lỗi khi kết nối đến server')
      }
    }
  }

  const register = (password: string, displayName: string) => {
    const user = auth().currentUser;
    if (user) {
      setShowLoading(true)
      firestore().collection('users').doc(user.uid).set({
        password,
        displayName
      }, {merge: true})
      .then(() => {console.log('update user info sucess'); setShowLoading(false); props.dispatch(loginSuccess())})
      .catch(error => {console.log('error', error); setShowLoading(false)})
    }
  }

  const verifyLoginCode = (code: string) => {
    if (!code) {
      Alert.alert('Thông báo', 'Hãy nhập mã xác thực')
    } else {
      setShowLoading(true)
      confirm.confirm(code)
      .then(user => {
        setShowLoading(false)
        setLoginSuccessFirstTime(true)
        setConfirm((null: any))
      }).catch(error => {
        console.log('error', error)
        setShowLoading(false)
        Alert.alert('Thông báo', 'Sai mã xác nhận')
      })
    }
  }

  const login = (password: string) => {
    const email = emailFromPhoneNumber(phoneNumber);
    setShowLoading(true)
    auth().signInWithEmailAndPassword(email, password)
    .then(user => Alert.alert('Thông báo', 'Đăng nhập thành công bằng mật khẩu'))
    .catch(error => {
      console.log('error', error)
      setShowLoading(false)
      Alert.alert('Thông báo', 'Thông tin đăng nhập không chính xác')
    })
  }

  const changePhoneNumber = () => setConfirm((null: any))

  if (!confirm && !hasPassword && !loginSuccessFirstTime) {
    return (
      <View>
        <Loader isLoading={showLoading} />
        <EnterLoginPhoneNumber phoneNumber={phoneNumber} loginWithPhoneNumber={loginWithPhoneNumber} />
      </View>
    )
  } else if (confirm) {
    return (
      <View>
        <Loader isLoading={showLoading} />
        <VerifyLoginCode 
          verifyLoginCode={verifyLoginCode}
          changePhoneNumber={changePhoneNumber} />
      </View>
    )
  } else if (loginSuccessFirstTime) {
    return (
      <View>
        <Loader isLoading={showLoading} />
        <EnterPasswordForRegister register={register} />
      </View>
    )
  } else {
    return (
      <View>
        <Loader isLoading={showLoading} />
        <EnterPasswordForLogin login={login} />
      </View>
    )
  }
}

export default connect()(PhoneSignIn)