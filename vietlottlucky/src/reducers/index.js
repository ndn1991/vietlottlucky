// @flow

import { combineReducers } from 'redux'
import { authenticationStatus } from './authentication'
import { ApplicationActions } from '../actions/constants';

const isLoading = (state: boolean = false, action: {type: string}) => {
  switch (action.type) {
    case ApplicationActions.TURN_OFF_LOADING:
      return false;
    case ApplicationActions.TURN_ON_LOADING:
      return true;
    default:
      return false;
  }
}

const rootReducer = combineReducers({
  isLoading,
  authenticationStatus
})


export default rootReducer