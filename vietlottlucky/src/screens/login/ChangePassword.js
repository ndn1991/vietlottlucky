// @flow
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { startChangePassword } from "../../actions/authentication";
import MainButton from "../../components/MainButton";
import MaterialPasswordInput from "../../components/MaterialPasswordInput";

const ChangePassword = (props: any) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const changePassword = () => {
    if (password !== password2) {
      Alert.alert('Mật khẩu 2 lần phải giống nhau')
    } else {
      props.changePassword(password)
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>Nhập mật khẩu mới</Text>
      <MaterialPasswordInput
        textInput="Mật khẩu"
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword} />
      <MaterialPasswordInput
        textInput="Xác nhận mật khẩu"
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword2}
        onSubmitEditing={changePassword} />
      <MainButton
        onPress={changePassword}
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
  changePassword: (password: string) => {
    dispatch(startChangePassword(password))
  }
})

export default connect(null, mapDispatchToProps)(ChangePassword)