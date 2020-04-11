import React, { Component } from "react";
import { StyleSheet, View, Image } from "react-native";

function SplashScreen(props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo-vietlott.png")}
        resizeMode="contain"
        style={styles.image}
      ></Image>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,1)",
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    // width: 200,
    // height: 200
  }
});

export default SplashScreen;
