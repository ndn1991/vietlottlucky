import React, { Component } from "react";
import { View, StatusBar } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Header from './Header'
import commonStyles from '../../styles';

function MainScreen(props) {
  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={commonStyles.mainColor}
        translucent={false}
        barStyle="light-content"
        hidden={false} />
      <Header
        navigation={props.navigation}
        onBellPress={props.onBellPress}
        onCartPress={props.onCartPress}
        text={props.title}
        style={styles.header} />
      {props.children}
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 56
  }
});

export default MainScreen;
