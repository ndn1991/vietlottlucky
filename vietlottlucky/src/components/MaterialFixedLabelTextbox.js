import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";

function MaterialFixedLabelTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>+84</Text>
      <TextInput 
        editable={props.editable} 
        style={styles.inputStyle} 
        keyboardType="number-pad" 
        onChangeText={props.onChangeText} 
        onSubmitEditing={props.onSubmitEditing}
        value={props.value}>
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 16,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },
  label: {
    color: "#000",
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-700",
    lineHeight: 16,
    alignSelf: "flex-end"
  },
  inputStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "flex-end",
    paddingTop: 16,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 30,
    fontSize: 16,
    fontFamily: "roboto-700",
    lineHeight: 16
  }
});

export default MaterialFixedLabelTextbox;
