// import thunkMiddleware from 'redux-thunk'
import React, { Component } from 'react';
import LoginScreen from './src/screens/LoginScreen'
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

export default class App extends Component {
  render() {
    return (
      <LoginScreen />
      // <Provider store={store}>
      //   <NavigationContainer>
      //     <Stack.Navigator>
      //       <Stack.Screen name="Login" component={Login} options={{title: '', headerStyle: {backgroundColor: 'rgba(208,2,27,1)'}}} />
      //       <Stack.Screen name="LoginValidation" component={LoginValidation} options={{title: '', headerStyle: {backgroundColor: 'rgba(208,2,27,1)'}}} />
      //     </Stack.Navigator>
      //   </NavigationContainer>
      // </Provider>
    );
  }
}

