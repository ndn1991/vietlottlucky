/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Platform } from 'react-native';
import firebase from '@react-native-firebase/app';

const iosConfig = {
  clientId: '7407660873-1c3plqana9cgvo3kludb7tkmd0vjh4lh.apps.googleusercontent.com',
  appId: '1:7407660873:ios:8545bd879fc9f438ce3498',
  apiKey: 'AIzaSyCkjfY3DgVyXBrn8k0edsSH3rdff3_WDPk',
  databaseURL: 'https://vietlott-lucky.firebaseio.com',
  storageBucket: 'vietlott-lucky.appspot.com',
  messagingSenderId: 'x',
  projectId: 'vietlott-lucky',
 
  // enable persistence by adding the below flag
  persistence: true,
};
const androidConfig = {
  clientId: '7407660873-2eb52c8tfvfklo9auap2nd6krldlnk9r.apps.googleusercontent.com',
  appId: '1:7407660873:android:e51596a08c2d5d7bce3498',
  apiKey: 'AIzaSyCqOkyydU-sYYj1AUL-1229LxxQ5INT_yM',
  databaseURL: 'https://vietlott-lucky.firebaseio.com',
  storageBucket: 'vietlott-lucky.appspot.com',
  messagingSenderId: 'x',
  projectId: 'vietlott-lucky',
 
  // enable persistence by adding the below flag
  persistence: true,
};

AppRegistry.registerComponent(appName, () => App);
console.log('AppRegistry.registerComponent(appName, () => App)')

const vietlottLuckyApp = firebase
  .initializeApp(
    // use platform-specific firebase config
    Platform.OS === 'ios' ? iosConfig : androidConfig,
    // name of this app
    'Vietlott Lucky',
  )
  .then(app => console.log('initialized apps ->', firebase.apps));
console.log('initializing firebase app')