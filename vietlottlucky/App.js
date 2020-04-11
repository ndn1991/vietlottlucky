// import thunkMiddleware from 'redux-thunk'
import React, { Component, useState, useCallback, useEffect } from 'react';
import LoginScreen from './src/screens/login';
import { Alert, AppState } from "react-native";
import auth from '@react-native-firebase/auth';
import HomeScreen from './src/screens/HomeScreen';
import SplashScreen from './src/screens/SplashScreen';
// import LoginScreen from './src/screens/LoginScreen'
// import { createStore, applyMiddleware } from 'redux'
// import { Provider } from 'react-redux'
// import rootReducer from './src/reducers'
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// const store = createStore(
//   rootReducer,
//   applyMiddleware(
//     thunkMiddleware, // lets us dispatch() functions
//   )
// );
// store.subscribe(() => {
//   console.log('state', store.getState())
//   // if (!state.authenticationInformation.loginStarted && state.authenticationInformation.loginStartSuccess) {
//   //   Stack.
//   // }
// })

export default App = (props) => {
  const [user, setUser] = useState();
  const [initialized, setInitialized] = useState(false)
  console.log('App init', initialized, initialized)
  auth().onAuthStateChanged((u) => {setUser(u); setInitialized(true); console.log('onAuthStateChanged')})
  
  if (!initialized) {
    return (<SplashScreen></SplashScreen>)
  } else if (!user) {
    return (<LoginScreen loginSuccess={() => {Alert.alert('Thông báo', 'Đăng nhập thành công')}} />)
  } else {
    return (
      <HomeScreen />
    );
  }
  // <Provider store={store}>
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="Login" component={Login} options={{title: '', headerStyle: {backgroundColor: 'rgba(208,2,27,1)'}}} />
  //       <Stack.Screen name="LoginValidation" component={LoginValidation} options={{title: '', headerStyle: {backgroundColor: 'rgba(208,2,27,1)'}}} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // </Provider>
}

