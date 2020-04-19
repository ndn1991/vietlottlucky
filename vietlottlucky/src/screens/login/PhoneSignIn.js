// @flow
import React from "react";
import { connect } from "react-redux";
import { AuthenticationState } from "../../../store";
import ChangePassword from "./ChangePassword";
import EnterLoginPhoneNumber from "./EnterLoginPhoneNumber";
import EnterPasswordForLogin from "./EnterPasswordForLogin";
import EnterPasswordForRegister from './EnterPasswordForRegister';
import VerifyLoginCode from "./VerifyLoginCode";
import VerifyLoginCodeForChangePassword from "./VerifyLoginCodeForChangePassword";

function PhoneSignIn(props: any) {
  switch (props.authenticationStatus) {
    case 'HAS_PHONE_FOR_LOGIN':
      return (<VerifyLoginCode />)
    case 'HAS_PHONE_FOR_CHANGE_PASSWORD':
      return (<VerifyLoginCodeForChangePassword />)
    case 'CAN_LOGIN_BY_PASSWORD':
      return (<EnterPasswordForLogin />)
    case 'LOGGED_IN_FIRST_TIME':
      return (<EnterPasswordForRegister />)
    case 'LOGGED_IN_NEED_CHANGE_PASSWORD':
      return (<ChangePassword />)
    default:
      return (<EnterLoginPhoneNumber />)
  }
}

const stateToProps = (state: AuthenticationState) => {
  return { authenticationStatus: state.authenticationStatus.state }
}

export default connect(stateToProps)(PhoneSignIn)