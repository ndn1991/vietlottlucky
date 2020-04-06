import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text, View, Alert } from "react-native";

function MaterialButtonPink(props) {
  // const onPress = () => Alert.alert("Thông báo", "Báo thông");
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]} disabled={props.disabled}>
      <View style={styles.nextWrapper}>
        <Text style={styles.next}>{props.buttonLabel}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(168,0,0,1)",
    flexDirection: "column",
    justifyContent: "center",
    elevation: 2,
    minWidth: 100,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  nextWrapper: {
    flexDirection: "row",
    justifyContent: "center"
  },
  next: {
    color: "rgba(255,255,255,1)",
    alignSelf: "flex-start",
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 9,
    paddingRight: 0,
    paddingBottom: 9,
    fontSize: 16,
    fontFamily: "roboto-700",
    textAlign: "center"
  }
});

export default MaterialButtonPink;
