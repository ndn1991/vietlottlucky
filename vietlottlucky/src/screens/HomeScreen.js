// @flow
import React, { useState, useEffect } from 'react';
import { Text, View, Button, BackHandler, AppState } from "react-native";
import { NavigationContainerRef, NavigationContainer, useFocusEffect } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Toast from 'react-native-simple-toast';
import MainScreen from './main/MainScreen'
import commonStyles from '../styles'

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const createView = (content: string) => (props) => (
  <View><Text>{content}</Text></View>
)

const createMainView = (content: string) => (props) => (<MainScreen title={content}><Text>{content}</Text></MainScreen>)

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
    <MainScreen
        title='Trang chủ'
        navigation={props.navigation} 
        onBellPress={() => props.navigation.navigate('Notifications')}
        onCartPress={() => props.navigation.navigate('Cart')} >
      <Tab.Navigator backBehavior='none'>
        <Tab.Screen name='Dat Ve' component={DatVeScreen}></Tab.Screen>
        <Tab.Screen name='Truc tuyen' component={createView('Truc tuyen')}></Tab.Screen>
        <Tab.Screen name='Ket qua' component={createView('Ket qua')}></Tab.Screen>
      </Tab.Navigator>
    </MainScreen>
  )
}

const HomeDrawer = (props: any) => {
  return (
    <Drawer.Navigator initialRouteName='Home' backBehavior='initialRoute' drawerType='front'>
      <Drawer.Screen name='Home' component={HomeTab} />
      <Drawer.Screen name='History' component={createMainView('History')} />
      <Drawer.Screen name='Cash In' component={createMainView('Cash In')} />
      <Drawer.Screen name='Cash Out' component={createMainView('Cash Out')} />
      <Drawer.Screen name='Guide' component={createMainView('Guide')} />
      <Drawer.Screen name='Statistic' component={createMainView('Statistic')} />
    </Drawer.Navigator>
  )
}

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