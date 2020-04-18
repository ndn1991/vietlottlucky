// @flow

import { combineReducers } from 'redux'
import { loginSuccess } from "./authentication";

const rootReducer = combineReducers({
  loginSuccess
})

export default rootReducer