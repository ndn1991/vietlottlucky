// @flow
import React, { useState } from "react";
import { Alert, View, Text } from "react-native";
import auth from '@react-native-firebase/auth';
import FixedLabelTextInput from "../../components/FixedLabelTextInput";
import MainButton from "../../components/MainButton";
import MaterialRightIconTextbox from "../../components/MaterialRightIconTextbox";
import EStyleSheet from "react-native-extended-stylesheet";

function PhoneSignIn(props: any) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [confirm, setConfirm] = useState(null)
  const [showLoading, setShowLoading] = useState(false)

  const _setShowLoading = (value: boolean) => {
    setShowLoading(value)
    props.setShowLoading(value)
  }

  const loginWithPhoneNumber = async () => {
    _setShowLoading(true)
    try {
      const sendPhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber;
      if (sendPhoneNumber.length != 9) {
        Alert.alert('Thông báo', 'Vui lòng nhập đúng số điện thoại')
      } else {
        const confirmation = await auth().signInWithPhoneNumber('+84' + sendPhoneNumber)
        setConfirm(confirmation)
        setCode('')
      }
    } catch (error) {
      console.log('error when send phone number to firebase authentication', error)
      Alert.alert('Thông báo', 'Có lỗi khi kết nối đến server')
    } finally {
      _setShowLoading(false)
    }
  }

  const verifyLoginCode = async () => {
    if (!code) {
      Alert.alert('Thông báo', 'Hãy nhập mã xác thực')
    } else {
      _setShowLoading(true)
      try {
        await (confirm: any).confirm(code)
        props.loginSuccess()
      } catch (error) {
        console.log('error when verify login code', error)
        Alert.alert('Thông báo', 'Sai mã xác nhận')
      } finally {
        _setShowLoading(false)
      }
    }
  }

  if (!confirm) {
    return (
      <View style={styles.body}>
        <Text style={styles.phoneNumberLabel}>Số điện thoại của bạn</Text>
        <FixedLabelTextInput 
          label='+84'
          keyboardType="number-pad"
          onChangeText={text => setPhoneNumber(text)}
          editable={!showLoading}
          value={phoneNumber}
          onSubmitEditing={() => {loginWithPhoneNumber()}} />
        <MainButton
          onPress={() => {loginWithPhoneNumber()}}
          style={styles.mainButton}
          buttonLabel="Tiếp tục"
          disabled={showLoading} />
      </View>
    )
  } else {
    return (
      <View style={styles.body}>
        <Text style={styles.phoneNumberLabel}>Vui lòng nhập mã xác nhận</Text>
        <MaterialRightIconTextbox
          textInput="Mã xác nhận"
          style={styles.phoneNumberInput}
          keyboardType="number-pad"
          onChangeText={text => setCode(text)}
          editable={!showLoading}
          value={code}
          iconName='code-tags'
          onSubmitEditing={() => {verifyLoginCode()}} />
        <MainButton 
          onPress={() => {verifyLoginCode()}}
          style={styles.mainButton}
          buttonLabel="Xác nhận"
          disabled={showLoading} />
        <Text style={styles.changePhoneNumber} onPress={() => setConfirm(null)}>Thay đổi số điện thoại</Text>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '$backgroundColor',
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
  phoneNumberLabel: {
    color: "$textColor",
    fontSize: '1rem',
    fontFamily: "calibri-bold",
    marginTop: '1rem'
  },
  mainButton: {
    marginTop: '1rem',
    alignSelf: "center"
  },
  changePhoneNumber: {
    color: '$textColor',
    fontFamily: "roboto-regular",
    textDecorationLine: "underline",
    alignSelf: "center",
    marginTop: '1rem',
    fontSize: '0.7rem'
  }
});

export default PhoneSignIn