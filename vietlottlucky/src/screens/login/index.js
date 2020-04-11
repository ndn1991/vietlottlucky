// @flow
import React, { useState } from "react";
import { ScrollView, StatusBar, View, Image, ActivityIndicator, StyleSheet } from "react-native";
import commonStyles from '../../styles';
import PhoneSignIn from './PhoneSignIn';

const LoginWraper = (props: any) => {
  const [showLoading, setShowLoading] = useState(false)
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
      <PhoneSignIn setShowLoading={value => setShowLoading(value)} loginSuccess={props.loginSuccess} />
      <ActivityIndicator animating={showLoading} size="large" color={commonStyles.mainColor} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: commonStyles.backgroundColor,
  },
  topBar: {
    height: 100,
    backgroundColor: commonStyles.mainColor
  },
  logoContainer: {
    height: 200,
    backgroundColor: commonStyles.backgroundColor,
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    height: 200
  }
});

export default LoginWraper;