import React, { Component } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import EStyleSheet from "react-native-extended-stylesheet";

function MainHeader(props) {
  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity style={styles.leftIconButton} onPress={() => props.navigation.toggleDrawer()}>
        <MaterialCommunityIconsIcon
          name="menu"
          style={styles.leftIcon}
        ></MaterialCommunityIconsIcon>
      </TouchableOpacity>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.title}>
          {props.text || "Title"}
        </Text>
      </View>
      <View style={styles.rightWraper}>
        <TouchableOpacity style={styles.bellIconButton} onPress={() => props.onBellPress()}>
          <MaterialCommunityIconsIcon
            name="bell"
            style={styles.bellIcon}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartIconButton} onPress={() => props.onCartPress()}>
          <MaterialCommunityIconsIcon
            name="cart"
            style={styles.cartIcon}
          ></MaterialCommunityIconsIcon>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$mainBackgroundColor",
    flexDirection: "row",
    alignItems: "center",
    padding: '0.2rem',
    elevation: 3,
    shadowOffset: {
      height: 2,
      width: 0
    },
    shadowColor: "#111",
    shadowOpacity: 0.2,
    shadowRadius: 1.2
  },
  leftIconButton: {
    marginLeft: '0.25rem'
  },
  leftIcon: {
    backgroundColor: "transparent",
    color: "$mainTextColor",
    fontFamily: "Roboto",
    fontSize: '1.5rem'
  },
  textWrapper: {
    marginLeft: '2rem'
  },
  title: {
    backgroundColor: "transparent",
    color: "$mainTextColor",
    fontSize: '1.1rem',
    fontFamily: "roboto-regular",
  },
  rightWraper: {
    flex: 1, 
    justifyContent: 'flex-end', 
    flexDirection: 'row'
  },
  bellIconButton: {
    marginRight: '1rem'
  },
  bellIcon: {
    backgroundColor: "transparent",
    color: "$mainTextColor",
    fontFamily: "Roboto",
    fontSize: '1.5rem'
  },
  cartIconButton: {
    marginRight: '0.5rem'
  },
  cartIcon: {
    color: "$mainTextColor",
    fontSize: '1.5rem',
    justifyContent: 'flex-end'
  }
});

export default MainHeader;
