// @flow
import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import { BackHandler, AppState, View, Button, Text } from 'react-native';
import MainScreen from '../main/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from "react-native-vector-icons/Entypo";
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../../styles'

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
      <Tab.Navigator 
          backBehavior='none'
          tabBarOptions={{
            activeTintColor: commonStyles.mainColor
          }}>
        <Tab.Screen name='Dat Ve' component={DatVeScreen} options={{tabBarIcon: ({focused}) => (<Icon name='ticket' style={iconStyle(focused)} />)}}></Tab.Screen>
        <Tab.Screen name='Truc tuyen' component={createView('Truc tuyen')} options={{tabBarIcon: ({focused}) => (<Ionicon name='md-microphone' style={iconStyle(focused)} />)}}></Tab.Screen>
        <Tab.Screen name='Ket qua' component={createView('Ket qua')} options={{tabBarIcon: ({focused}) => (<MaterialIcon name='gesture-double-tap' style={iconStyle(focused)} />)}}></Tab.Screen>
      </Tab.Navigator>
    </MainScreen>
  )
}

const styles = EStyleSheet.create({
  icon: {
    fontSize: '1.2rem'
  },
  iconSlected: {
    fontSize: '1.2rem',
    color: '$mainBackgroundColor'
  }
})

const iconStyle = (focused: boolean) => focused ? styles.iconSlected : styles.icon

export default HomeTab