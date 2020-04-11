// @flow
import React, { useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import auth from '@react-native-firebase/auth';
import MaterialFixedLabelTextbox from "../../components/MaterialFixedLabelTextbox";
import MaterialButtonPink from "../../components/MaterialButtonPink";
import MaterialRightIconTextbox from "../../components/MaterialRightIconTextbox";
import commonStyles from '../../styles'

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
        <MaterialFixedLabelTextbox 
          onChangeText={text => setPhoneNumber(text)}
          style={styles.phoneNumberInput}
          editable={!showLoading}
          value={phoneNumber}
          onSubmitEditing={() => {loginWithPhoneNumber()}} />
        <MaterialButtonPink
          onPress={() => {loginWithPhoneNumber()}}
          style={styles.materialButtonPink}
          buttonLabel="Tiếp tục"
          disabled={showLoading} />
      </View>
    )
  } else {
    return (
      <View style={styles.body}>
        <Text style={styles.phoneNumberLabel}>Vui lòng nhập mã xác nhận</Text>
        <MaterialRightIconTextbox
          textInput1="Mã xác nhận"
          style={styles.phoneNumberInput}
          keyboardType="number-pad"
          onChangeText={text => setCode(text)}
          editable={!showLoading}
          value={code}
          onSubmitEditing={() => {verifyLoginCode()}} />
        <MaterialButtonPink 
          onPress={() => {verifyLoginCode()}}
          style={styles.materialButtonPink}
          buttonLabel="Xác nhận"
          disabled={showLoading} />
        <Text style={styles.changePhoneNumber} onPress={() => setConfirm(null)}>Thay đổi số điện thoại</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: commonStyles.backgroundColor,
    paddingLeft: 20,
    paddingRight: 20,
  },
  phoneNumberLabel: {
    ...commonStyles.mainLabel,
    marginTop: 18
  },
  phoneNumberInput: {
    height: 50,
    marginTop: 3
  },
  materialButtonPink: {
    width: 200,
    height: 50,
    marginTop: 12,
    marginBottom: 20,
    alignSelf: "center"
  },
  changePhoneNumber: {
    color: commonStyles.mainLabel.color,
    fontFamily: "roboto-regular",
    textDecorationLine: "underline",
    alignSelf: "center"
  }
});

export default PhoneSignIn