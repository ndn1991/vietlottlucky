
// @flow
import React, { useState } from "react";
import { View, Text } from "react-native";
import FixedLabelTextInput from "../../components/FixedLabelTextInput";
import MainButton from "../../components/MainButton";
import EStyleSheet from "react-native-extended-stylesheet";

const EnterLoginPhoneNumber = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState(props.phoneNumber)
  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>Số điện thoại của bạn</Text>
      <FixedLabelTextInput
        label='+84'
        keyboardType="number-pad"
        onChangeText={setPhoneNumber}
        onSubmitEditing={() => {props.loginWithPhoneNumber(phoneNumber)}}
        value={phoneNumber} />
      <MainButton
        onPress={() => {props.loginWithPhoneNumber(phoneNumber)}}
        style={styles.mainButton}
        buttonLabel="Tiếp tục" />
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

export default EnterLoginPhoneNumber