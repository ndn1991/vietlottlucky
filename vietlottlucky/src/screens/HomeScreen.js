// @flow
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from "react-native";
import commonStyles from '../styles';
import HomeDrawer from './drawer/DrawerScreen';
import MainScreen from './main/MainScreen';

const Stack = createStackNavigator();

const createView = (content: string) => (props) => (
  <View><Text>{content}</Text></View>
)

const createMainView = (content: string) => (props) => (<MainScreen title={content}><Text>{content}</Text></MainScreen>)

const HomeScreen = (props: any) => {
  const containerRef = React.useRef<NavigationContainerRef>();
  return (
    <NavigationContainer ref = {containerRef}>
      <Stack.Navigator screenOptions={{
        animationEnabled: false,
        headerStyle: {
          backgroundColor: commonStyles.mainColor,
          height: 56
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontFamily: 'roboto-regular'
        }
      }}>
        <Stack.Screen 
          name='HomeScreen' 
          options={{
            headerShown: false
          }}
          component={HomeDrawer} />
        <Stack.Screen name='Notifications' component={createView('Notifications')} />
        <Stack.Screen name='Play Keno' component={createView('Play Keno')} />
        <Stack.Screen name='Play Power' component={createView('Play Power')} />
        <Stack.Screen name='Play Mega' component={createView('Play Mega')} />
        <Stack.Screen name='Result Detail' component={createView('Result Detail')} />
        <Stack.Screen name='Order' component={createView('Order')} />
        <Stack.Screen name='Cart' component={createView('Cart')} />
        <Stack.Screen name='Order Success' component={createMainView('Order Success')} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default HomeScreen