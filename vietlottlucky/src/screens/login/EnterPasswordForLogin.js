// @flow
import React, { useState } from "react";
import { View, Text } from "react-native";
import MaterialPasswordInput from "../../components/MaterialPasswordInput";
import MainButton from "../../components/MainButton";
import EStyleSheet from "react-native-extended-stylesheet";

const EnterPasswordForLogin  = (props: any) => {
  const [password, setPassword] = useState('')

  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>Vui lòng nhập mật khẩu để đăng nhập</Text>
      <MaterialPasswordInput
        textInput="Mật khẩu"
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword}
        onSubmitEditing={() => {props.login(password)}} />
      <MainButton 
        onPress={() => {props.login(password)}}
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

export default EnterPasswordForLogin