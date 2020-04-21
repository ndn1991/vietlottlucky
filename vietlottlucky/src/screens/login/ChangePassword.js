// @flow
import React, { useState } from "react";
import { Alert, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { connect } from "react-redux";
import { startChangePassword } from "../../actions/authentication";
import MainButton from "../../components/MainButton";
import MaterialPasswordInput from "../../components/MaterialPasswordInput";
import I18n from '../../i18n/i18n'

const ChangePassword = (props: any) => {
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const changePassword = () => {
    if (password !== password2) {
      Alert.alert(I18n.t('alertTitleInform'), I18n.t('alertContentTwoPasswordNotMatch'))
    } else {
      props.changePassword(password)
    }
  }

  return (
    <View style={styles.body}>
      <Text style={styles.phoneNumberLabel}>{I18n.t('textEnterNewPassword')}</Text>
      <MaterialPasswordInput
        textInput={I18n.t('placeHolderPassword')}
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword} />
      <MaterialPasswordInput
        textInput={I18n.t('placeHolderPasswordAgain')}
        style={styles.phoneNumberInput}
        keyboardType="default"
        onChangeText={setPassword2}
        onSubmitEditing={changePassword} />
      <MainButton
        onPress={changePassword}
        style={styles.mainButton}
        buttonLabel={I18n.t('buttonLabelConfirm')} />
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