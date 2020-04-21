// @flow

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import messaging from '@react-native-firebase/messaging';
import React, { Component, memo } from 'react';
import { Provider, connect } from 'react-redux';
import { loginAuto, logout, verifyLoginCode } from './src/actions/authentication';
import ApplicationLoader from './src/ApplicationsLoader';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/login';
import SplashScreen from './src/screens/SplashScreen';
import store from './store';

const MainApp = (props: any) => {
  if (!props.initialized) {
    return (<SplashScreen />)
  } else if (!props.loginSuccess) {
    return (<LoginScreen />)
  } else {
    return (<HomeScreen />)
  }
}

const mapStateToProps = (state, ownProps) => {
  if (state.authenticationStatus.state === 'LOGGED_IN') {
    return Object.assign({}, ownProps, {loginSuccess: true});
  } else if (state.authenticationStatus.state === '') {
    return Object.assign({}, ownProps, {loginSuccess: false});
  }
  return ownProps;
}

const CachedMainApp = memo(connect(mapStateToProps)(MainApp))

export default class App extends Component<{}, {initialized: boolean}> {
  ubsubscribeRefreshToken: Function

  constructor() {
    super();
    console.log('App created')
    this.state = {
      initialized: false,
    }
  }

  componentDidMount() {
    console.log('App re-render')
    auth().onAuthStateChanged(async (user) => {
      // console.log('onAuthStateChanged', user ? true : false)
      if (user) {
        if (!this.state.initialized) {
          if (user.providerData.find(ele => ele.providerId === 'password')) {
            store.dispatch(loginAuto(user))
          } else {
            const firestoreUser = (await firestore().doc(`users/${user.uid}`).get()).data()
            if (firestoreUser && firestoreUser.registered) {
              store.dispatch(loginAuto(user))
            } else {
              store.dispatch(verifyLoginCode(user))
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
    console.log('App unmount')
    if (this.ubsubscribeRefreshToken) {
      this.ubsubscribeRefreshToken()
    }
  }
  
  render() {
    return (
      <Provider store={store}>
        <ApplicationLoader />
        <CachedMainApp initialized={this.state.initialized} />
      </Provider>
    ) 
  }

  async saveTokenToDatabase(uid: string, token: string) {
    await firestore().collection('users').doc(uid).set({token}, {merge: true})
  }
}