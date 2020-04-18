import React, { Component, useState, useCallback, useEffect } from 'react';
import LoginScreen from './src/screens/login';
import { Alert, AppState } from "react-native";
import auth from '@react-native-firebase/auth';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import { Provider } from 'react-redux';
import store from './store'

export const App = () => {
  const [loginSuccess, setLoginSuccess] = useState(false)
  const [initialized, setInitialized] = useState(false)
  store.subscribe(() => {
    console.log('state', store.getState())
    setLoginSuccess(store.getState().loginSuccess)
  });
  
  useEffect(() => {
    auth().onAuthStateChanged(async (user) => {
      console.log('onAuthStateChanged', user)
      if (user) {
        if (user.providerData.find(ele => ele.providerId === 'password')) {
          setLoginSuccess(true)
        } else {
          const firestoreUser = (await firestore().doc(`users/${user.uid}`).get()).data()
          if (firestoreUser && firestoreUser.registered) {
            setLoginSuccess(true)
          }
        }
        setInitialized(true)

        const token = await messaging().getToken();
        await saveTokenToDatabase(user.uid, token);
    
        messaging().onTokenRefresh((token) => {
          return saveTokenToDatabase(user.uid, token);
        })
      } else {
        setLoginSuccess(false)
      }
      setInitialized(true)
    });
  })
  
  if (!initialized) {
    return (<SplashScreen></SplashScreen>)
  } else if (!loginSuccess) {
    return (<LoginScreen />)
  } else {
    return (
      <HomeScreen />
    );
  }
}

export default RootApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

async function saveTokenToDatabase(uid, token) {
  await firestore().collection('users').doc(uid).set({
    token
  }, {merge: true})
}