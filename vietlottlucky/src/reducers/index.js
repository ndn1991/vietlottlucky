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

const language = (state: string = 'en', action: {type: string, lang: string}) => {
  switch (action.type) {
    case ApplicationActions.CHANGE_LANGUAGE:
      return action.lang;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  isLoading,
  authenticationStatus,
  language
})


export default rootReducer