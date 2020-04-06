// @flow

import { combineReducers } from 'redux'
import { authenticationStatus } from "./authentication";

const rootReducer = combineReducers({
  authenticationInformation: authenticationStatus
})

export default rootReducer