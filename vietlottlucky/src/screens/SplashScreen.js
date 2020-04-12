import React from "react";
import { View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

function SplashScreen() {
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

const styles = EStyleSheet.create({
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
