// @flow
import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import MaterialPasswordInput from "../../components/MaterialPasswordInput";
import MainButton from "../../components/MainButton";
import EStyleSheet from "react-native-extended-stylesheet";
import MaterialRightIconTextbox from '../../components/MaterialRightIconTextbox'

const EnterPasswordForRegister  = (props: any) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [displayName, setDisplayName] = useState('')

  const register = () => {
    if (password !== password2) {
      Alert.alert('Mật khẩu 2 lần phải giống nhau')
    } else {
      props.register(password, displayName)
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>Vui lòng nhập thông tin tài khoản</Text>
      <MaterialPasswordInput
        textInput="Mật khẩu"
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword} />
      <MaterialPasswordInput
        textInput="Xác nhận mật khẩu"
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword2} />
      <MaterialRightIconTextbox
        textInput="Tên hiển thị"
        onChangeText={setDisplayName}
        onSubmitEditing={register} />
      <MainButton 
        onPress={register}
        style={styles.mainButton}
        buttonLabel="Xác nhận" />
    </View>
  )
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
  }
});

export default EnterPasswordForRegister