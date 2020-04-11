// @flow
import React, { Component, useState, useEffect } from 'react';
import { Text, View, Button, BackHandler, AppState } from "react-native";
import { NavigationContainerRef, NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { createDrawerNavigator, DrawerNavigationProp } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Toast from 'react-native-simple-toast';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const createView = (content: string) => (props) => (
  <View><Text>{content}</Text></View>
)

const DatVeScreen = (props) => {
  return (
    <View>
      <Button title='Play Keno' onPress={() => props.navigation.navigate('Play Keno')} />
      <Button title='Play Power' onPress={() => props.navigation.navigate('Play Power')} />
      <Button title='Play Mega' onPress={() => props.navigation.navigate('Play Mega')} />
    </View>
  )
}

const HomeTab = (props: any) => {
  const HomeStack = createStackNavigator();
  const [canExit, setCanExit] = useState(false)
  const [timeoutPointers] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        if (!canExit) {
          setCanExit(true)
          Toast.show('Press again to exit', 3500)
          timeoutPointers.push(setTimeout(() => setCanExit(false), 3000))
          return true
        } else {
          return false
        }
      }
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress)
      }
    }, [canExit, setCanExit])
  )

  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        while (timeoutPointers.length > 0) {
          clearTimeout(timeoutPointers.pop())
        }
      }
    }
    AppState.addEventListener('change', handleAppStateChange)
    return () => AppState.removeEventListener('change', handleAppStateChange)
  })

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
          name='Home'
          options={{
            title: '',
            headerRight: () => (
              <View style={{flexDirection: 'row'}}>
                <Button title='Cart' onPress={() => props.navigation.navigate('Cart')} />
                <Button title='Notifications' onPress={() => props.navigation.navigate('Notifications')} />
              </View>
            ),
            headerLeft: () => (
              <Button title='Menu' onPress={() => props.navigation.toggleDrawer()} />
            )
          }}>
        {() => (
          <Tab.Navigator backBehavior='none'>
            <Tab.Screen name='Dat Ve' component={DatVeScreen}></Tab.Screen>
            <Tab.Screen name='Truc tuyen' component={createView('Truc tuyen')}></Tab.Screen>
            <Tab.Screen name='Ket qua' component={createView('Ket qua')}></Tab.Screen>
          </Tab.Navigator>
        )}
      </HomeStack.Screen>
    </HomeStack.Navigator>
  )
}

const HomeDrawer = (props: any) => {
  return (
    <Drawer.Navigator initialRouteName='Home' backBehavior='initialRoute' drawerType='front'>
      <Drawer.Screen name='Home' component={HomeTab} />
      <Drawer.Screen name='History' component={createView('History')} />
      <Drawer.Screen name='Cash In' component={createView('Cash In')} />
      <Drawer.Screen name='Cash Out' component={createView('Cash Out')} />
      <Drawer.Screen name='Guide' component={createView('Guide')} />
      <Drawer.Screen name='Statistic' component={createView('Statistic')} />
    </Drawer.Navigator>
  )
}

const HomeScreen = (props: any) => {
  const containerRef = React.useRef<NavigationContainerRef>();
  return (
    <NavigationContainer ref = {containerRef}>
      <Stack.Navigator screenOptions={{
        animationEnabled: false
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
        <Stack.Screen name='Order Success' component={createView('Order Success')} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default HomeScreen