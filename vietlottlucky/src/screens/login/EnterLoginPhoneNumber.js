
// @flow
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { startForgotPassword, startLogin } from '../../actions/authentication';
import FixedLabelTextInput from "../../components/FixedLabelTextInput";
import MainButton from "../../components/MainButton";
import { standardPhoneNumberWithoutCountryCode } from '../../utils/AuthenticationItils';
import I18n from '../../i18n/i18n'

const EnterLoginPhoneNumber = (props: any) => {
  const [phoneNumber, setPhoneNumber] = useState('')
  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>{I18n.t('textPhoneNumberToLogin')}</Text>
      <FixedLabelTextInput
        label='+84'
        keyboardType="number-pad"
        onChangeText={setPhoneNumber}
        value={phoneNumber} />
      <MainButton
        onPress={() => { props.loginWithPhoneNumber(phoneNumber) }}
        style={styles.mainButton}
        buttonLabel={I18n.t('labelButtonContinue')} />
      <Text style={styles.forgotPassword} onPress={() => props.forgotPassword(phoneNumber)}>{I18n.t('textForgotPassword')}</Text>
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
  forgotPassword: {
    color: '$textColor',
    fontFamily: "roboto-regular",
    textDecorationLine: "underline",
    alignSelf: "center",
    marginTop: '1rem',
    fontSize: '0.7rem'
  }
});

const mapDispatchToProps = (dispatch: Function) => ({
  loginWithPhoneNumber: (phoneNumber) => {
    const sendPhoneNumber = standardPhoneNumberWithoutCountryCode(phoneNumber);
    if (sendPhoneNumber.length !== 9) {
      Alert.alert(I18n.t('alertTitleInform'), I18n.t('alertContentWrongPhoneFormat'))
    } else {
      dispatch(startLogin(phoneNumber))
    }
  },
  forgotPassword: (phoneNumber) => {
    const sendPhoneNumber = standardPhoneNumberWithoutCountryCode(phoneNumber);
    if (sendPhoneNumber.length !== 9) {
      Alert.alert(I18n.t('alertTitleInform'), I18n.t('alertContentWrongPhoneFormat'))
    } else {
      dispatch(startForgotPassword(phoneNumber))
    }
  }
})

export default connect(null, mapDispatchToProps)(EnterLoginPhoneNumber)