import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers'
import thunkMiddleware from 'redux-thunk'

export type AuthenticationState = {
  state: string,
  phoneNumber: string,
  confirm: FirebaseAuthTypes.ConfirmationResult,
  user: FirebaseAuthTypes.UserCredential
}
export type ApplicationState = {
  isLoading: boolean,
  authenticationStatus: AuthenticationState
}

export default store = createStore(rootReducer, applyMiddleware(thunkMiddleware));