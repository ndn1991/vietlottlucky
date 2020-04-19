// @flow
import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';
import { Text } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MainScreen from '../main/MainScreen';
import MainDrawerContent from './DrawerContent';
import HomeTab from '../bottomTab/BottomTabScreen';
import auth from '@react-native-firebase/auth';

const Drawer = createDrawerNavigator();

const createMainView = (content: string) => (props) => (<MainScreen title={content}><Text>{content}</Text></MainScreen>)

const HomeDrawer = (props: any) => {

  const logout = () => {
    auth().signOut();
  }

  return (
    <Drawer.Navigator 
        initialRouteName='Home' 
        backBehavior='initialRoute' 
        drawerType='front'
        drawerContent={(props) => (<MainDrawerContent {...props} logout={logout}></MainDrawerContent>)} >
      <Drawer.Screen name='Home' component={HomeTab} options={{drawerIcon: () => (<Icon name='home' style={{fontSize: 22}} />)}} />
      <Drawer.Screen name='History' component={createMainView('History')} options={{drawerIcon: () => (<Icon name='history' style={{fontSize: 22}} />)}} />
      <Drawer.Screen name='Cash In' component={createMainView('Cash In')} options={{drawerIcon: () => (<Icon name='cash-100' style={{fontSize: 22}} />)}} />
      <Drawer.Screen name='Cash Out' component={createMainView('Cash Out')} options={{drawerIcon: () => (<Icon name='cash-refund' style={{fontSize: 22}} />)}} />
      <Drawer.Screen name='Guide' component={createMainView('Guide')} options={{drawerIcon: () => (<Icon name='help-circle-outline' style={{fontSize: 22}} />)}} />
      <Drawer.Screen name='Statistic' component={createMainView('Statistic')} options={{drawerIcon: () => (<Icon name='chart-line' style={{fontSize: 22}} />)}} />
    </Drawer.Navigator>
  )
}

export default HomeDrawer