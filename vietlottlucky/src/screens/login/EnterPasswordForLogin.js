// @flow
import React, { useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { startLoginWithPassword } from "../../actions/authentication";
import MainButton from "../../components/MainButton";
import MaterialPasswordInput from "../../components/MaterialPasswordInput";

const EnterPasswordForLogin = (props: any) => {
  const [password, setPassword] = useState('')

  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>Nhập mật khẩu để đăng nhập</Text>
      <MaterialPasswordInput
        textInput="Mật khẩu"
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword}
        onSubmitEditing={() => { props.login(password) }} />
      <MainButton
        onPress={() => { props.login(password) }}
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

const mapDispatchToProps = (dispatch: Function) => ({
  login: (password: string) => {
    dispatch(startLoginWithPassword(password))
  }
})

export default connect(null, mapDispatchToProps)(EnterPasswordForLogin)