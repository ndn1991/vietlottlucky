// @flow
import React, { useState } from "react";
import { View, Text } from "react-native";
import MaterialRightIconTextbox from "../../components/MaterialRightIconTextbox";
import MainButton from "../../components/MainButton";
import EStyleSheet from "react-native-extended-stylesheet";

const VerifyLoginCode = (props: any) => {
  const [code, setCode] = useState('')
  return (
    <View style={styles.body}>
        <Text style={styles.phoneNumberLabel}>Vui lòng nhập mã xác nhận</Text>
        <MaterialRightIconTextbox
          textInput="Mã xác nhận"
          style={styles.phoneNumberInput}
          keyboardType="number-pad"
          onChangeText={setCode}
          iconName='code-tags'
          onSubmitEditing={() => {props.verifyLoginCode(code)}} />
        <MainButton 
          onPress={() => {props.verifyLoginCode(code)}}
          style={styles.mainButton}
          buttonLabel="Xác nhận" />
        <Text style={styles.changePhoneNumber} onPress={() => props.changePhoneNumber()}>Thay đổi số điện thoại</Text>
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

export default VerifyLoginCode