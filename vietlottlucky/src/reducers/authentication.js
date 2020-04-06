import { AuthenticationActions } from "../../actions/authentication";

// @flow
export const authenticationStatus = (state: string = null, action) => {
  switch (action.type) {
    case AuthenticationActions.START_LOGIN:
      return 'START_LOGIN';
    case AuthenticationActions.START_LOGIN_SUCCESS:
      return 'START_LOGIN_SUCCESS';
    case AuthenticationActions.START_LOGIN_FAIL:
      return 'START_LOGIN_FAIL'
    case AuthenticationActions.VALIDATE_LOGIN_CODE:
      return 'VALIDATE_LOGIN_CODE'
    case AuthenticationActions.LOGIN_SUCCESS:
      return 'LOGIN_SUCCESS'
    case AuthenticationActions.REMOVE_AUTHENTICATION:
      return null
    default:
      return state;
  }
}
