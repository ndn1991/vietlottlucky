// @flow
import React, { useState } from "react";
import { Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { chooseAnotherPhoneNumber, startVerifyLoginCodeForChangePassword } from "../../actions/authentication";
import MainButton from "../../components/MainButton";
import MaterialRightIconTextbox from "../../components/MaterialRightIconTextbox";
import I18n from '../../i18n/i18n'

const VerifyLoginCodeForChangePassword = (props: any) => {
  const [code, setCode] = useState('')
  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>{I18n.t('textVerificationCode')}</Text>
      <MaterialRightIconTextbox
        textInput={I18n.t('placeHolderVerificationCode')}
        style={styles.phoneNumberInput}
        keyboardType="number-pad"
        onChangeText={setCode}
        iconName='code-tags'
        onSubmitEditing={() => { props.verifyLoginCode(code) }} />
      <MainButton
        onPress={() => { props.verifyLoginCode(code) }}
        style={styles.mainButton}
        buttonLabel={I18n.t('buttonLabelConfirm')} />
      <Text style={styles.changePhoneNumber} onPress={() => props.changePhoneNumber()}>{I18n.t('textChangePhoneNumber')}</Text>
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

const mapDispatchToProps = (dispatch: Function) => ({
  verifyLoginCode: (code: string) => {
    dispatch(startVerifyLoginCodeForChangePassword(code))
  },
  changePhoneNumber: () => {
    dispatch(chooseAnotherPhoneNumber())
  }
})

export default connect(null, mapDispatchToProps)(VerifyLoginCodeForChangePassword)