// @flow
import React, { useEffect } from "react";
import { Image, ScrollView, StatusBar, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import commonStyles from '../../styles';
import PhoneSignIn from './PhoneSignIn';

const LoginWraper = () => {
  useEffect(() => {
    console.log('LoginWraper re-render')
    return () => {
      console.log('LoginWraper unmount')
    }
  })

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={commonStyles.mainColor}
        translucent={true}
        barStyle="light-content"
        hidden={false} />
      <View style={styles.topBar} />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo-vietlott.png")}
          resizeMode="contain"
          style={styles.logo} />
      </View>
      <PhoneSignIn />
    </ScrollView>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '$backgroundColor',
  },
  topBar: {
    height: '5rem',
    backgroundColor: '$mainBackgroundColor'
  },
  logoContainer: {
    backgroundColor: '$backgroundColor',
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    height: '11rem'
  },
  indicator: {
    marginTop: '1rem'
  }
});

export default LoginWraper;