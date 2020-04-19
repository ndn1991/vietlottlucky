// @flow
import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import EStyleSheet from 'react-native-extended-stylesheet';
import { View, Text, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SmallButton from '../../components/SmallButton';

function MainDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.avatar}>
            <Icon name="account-circle" style={styles.avatarIcon}></Icon>
          </View>
          <View style={styles.profile}>
            <Text style={styles.name}>Nguyen Doan Noi</Text>
            <Text style={styles.phoneNumber}>84986219084</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.dollar}>
            <Icon name="cash-100" style={styles.dollarIcon}></Icon>
          </View>
          <Text style={styles.nap}>0 đ</Text>
          <View style={styles.smallButtonWraper}>
            <SmallButton buttonLabel='Nạp' style={styles.smallButton} />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.cup}>
            <Icon name="trophy-variant" style={styles.cupIcon}></Icon>
          </View>
          <Text style={styles.rut}>0 đ</Text>
          <View style={styles.smallButtonWraper}>
            <SmallButton buttonLabel='Rút' style={styles.smallButton} />
          </View>
        </View>
      </View>
      <DrawerItemList  {...props} />
      <DrawerItem icon={() => (<Icon name='arrow-left-bold-hexagon-outline' style={{fontSize: 22}} />)} 
        label='Logout' onPress={props.logout} />
      <View style={styles.footer}>
        <Text style={styles.footerText}>Version: 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = EStyleSheet.create({
  contentContainerStyle: {
    flex: 1,
    paddingTop: 0,
  },
  header: {
    backgroundColor: '$mainBackgroundColor',
  },
  headerTop: {
    height: '4rem',
    flexDirection: 'row',
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem'
  },
  avatar: {
    width: '4rem',
    alignSelf: 'center',
    alignItems: 'center'
  },
  avatarIcon: {
    fontSize: '3.2rem',
    color: '$mainTextColor'
  },
  profile: {
    justifyContent: 'center'
  },
  name: {
    color: '$mainTextColor',
    fontSize: '0.8rem'
  },
  phoneNumber: {
    color: '$mainTextColor',
    fontSize: '0.8rem'
  },
  row: {
    height: '2rem',
    flexDirection: 'row',
    paddingLeft: '1rem',
    paddingBottom: '0.5rem',
  },
  dollar: {
    justifyContent: 'center'
  },
  dollarIcon: {
    color: '$mainTextColor',
    fontSize: '1rem'
  },
  nap: {
    color: '$mainTextColor',
    paddingLeft: '0.5rem',
  },
  cup: {
    justifyContent: 'center'
  },
  cupIcon: {
    color: '$yellowColor',
    fontSize: '1rem'
  },
  rut: {
    color: '$yellowColor',
    paddingLeft: '0.5rem',
  },
  smallButtonWraper: {
    flex: 1,
    paddingRight: '0.7rem'
  },
  smallButton: {
    alignSelf: 'flex-end',
    flex: 1,
    borderWidth: 1,
    borderColor: '$backgroundColor'
  },
  footer: {
    flex: 1,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: '1rem',
    paddingBottom: '0.5rem'
  }
})

export default MainDrawerContent