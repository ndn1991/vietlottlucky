// @flow
import { AuthenticationActions } from '../actions/authentication';

export const loginSuccess = (state: boolean = false, action: {type: string}) => {
  switch (action.type) {
    case AuthenticationActions.LOGIN_SUCCESS:
      return true;
    default:
      return state;
  }
}
