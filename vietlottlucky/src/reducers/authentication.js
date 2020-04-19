// @flow
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { AuthenticationState } from '../../store'
import { AuthenticationActions } from '../actions/constants';

export const authenticationStatus = (state: AuthenticationState = {
  state: '',
  phoneNumber: '',
  confirm: null,
  user: null
}, action: {
  type: string,
  phoneNumber?: string,
  confirm?: FirebaseAuthTypes.ConfirmationResult,
  user: FirebaseAuthTypes.UserCredential
}) => {
  switch (action.type) {
    case AuthenticationActions.LOGIN_BY_PHONE:
      return { state: 'HAS_PHONE_FOR_LOGIN', phoneNumber: action.phoneNumber, confirm: action.confirm }
    case AuthenticationActions.FORGOT_PASSWORD:
      return { state: 'HAS_PHONE_FOR_CHANGE_PASSWORD', phoneNumber: action.phoneNumber, confirm: action.confirm }
    case AuthenticationActions.CAN_LOGIN_BY_PASSWORD:
      return { state: 'CAN_LOGIN_BY_PASSWORD', phoneNumber: action.phoneNumber }
    case AuthenticationActions.LOGIN_BY_PASSWORD:
      return Object.assign({}, state, { state: 'LOGGED_IN', user: action.user })
    case AuthenticationActions.VERIFY_LOGIN_CODE:
      return Object.assign({}, state, { state: 'LOGGED_IN_FIRST_TIME', user: action.user })
    case AuthenticationActions.VERIFY_LOGIN_CODE_FOR_CHANGE_PASSWORD:
      return Object.assign({}, state, { state: 'LOGGED_IN_NEED_CHANGE_PASSWORD', user: action.user })
    case AuthenticationActions.REGISTER:
      return Object.assign({}, state, { state: 'LOGGED_IN' })
    case AuthenticationActions.CHANGE_PASSWORD:
      return Object.assign({}, state, { state: 'LOGGED_IN' })
    case AuthenticationActions.LOGIN_AUTO:
      return Object.assign({}, state, { state: 'LOGGED_IN', user: action.user })
    case AuthenticationActions.CHOOSE_ANOTHER_PHONE_NUMBER:
      return Object.assign({}, state, { state: '' })
      case AuthenticationActions.LOGOUT:
        return Object.assign({}, state, { state: '' })
    default:
      return state
  }
}