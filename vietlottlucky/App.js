// @flow

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import React, { Component } from 'react';
import { loginAuto, logout } from './src/actions/authentication';
import ApplicationLoader from './src/ApplicationsLoader';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/login';
import SplashScreen from './src/screens/SplashScreen';
import store from './store';
import { Provider } from 'react-redux';

const MainApp = (props: any) => {
  if (!props.initialized) {
    return (<SplashScreen />)
  } else if (!props.loginSuccess) {
    return (<LoginScreen />)
  } else {
    return (<HomeScreen />)
  }
}

export default class App extends Component<{}, {initialized: boolean, loginSuccess: boolean}> {

  unsubscribeStore: Function;
  ubsubscribeRefreshToken: Function

  constructor() {
    super();
    this.state = {
      initialized: false,
      loginSuccess: false
    }
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {
      console.log('state', store.getState())
      if (store.getState().authenticationStatus.state === 'LOGGED_IN') {
        this.setState(Object.assign({}, this.state, {loginSuccess: true}))
      } else if (store.getState().authenticationStatus.state === '') {
        this.setState(Object.assign({}, this.state, {loginSuccess: false}))
      }
    });

    auth().onAuthStateChanged(async (user) => {
      console.log('onAuthStateChanged', user)
      if (user) {
        if (!this.state.initialized) {
          if (user.providerData.find(ele => ele.providerId === 'password')) {
            store.dispatch(loginAuto(user))
          } else {
            const firestoreUser = (await firestore().doc(`users/${user.uid}`).get()).data()
            if (firestoreUser && firestoreUser.registered) {
              store.dispatch(loginAuto(user))
            }
          }
        }

        const token = await messaging().getToken();
        await this.saveTokenToDatabase(user.uid, token);
    
        this.ubsubscribeRefreshToken = messaging().onTokenRefresh((token) => {
          return this.saveTokenToDatabase(user.uid, token);
        })
      } else {
        store.dispatch(logout())
      }
      this.setState(Object.assign({}, this.state, {initialized: true}))
    });
  }

  componentWillUnmount() {
    if (this.ubsubscribeRefreshToken) {
      this.ubsubscribeRefreshToken()
    }
    if (this.unsubscribeStore) {
      this.unsubscribeStore()
    }
  }
  
  render() {
    return (
      <Provider store={store}>
        <ApplicationLoader />
        <MainApp initialized={this.state.initialized} loginSuccess={this.state.loginSuccess} />
      </Provider>
    ) 
  }

  async saveTokenToDatabase(uid: string, token: string) {
    await firestore().collection('users').doc(uid).set({token}, {merge: true})
  }
}