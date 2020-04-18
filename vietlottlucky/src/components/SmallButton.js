import React from "react";
import { TouchableOpacity, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

function SmallButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]} disabled={props.disabled}>
      <Text style={styles.content}>{props.buttonLabel}</Text>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$pinkColor",
    justifyContent: "center",
    alignItems: 'center',
    elevation: 2,
    borderRadius: 2,
    width: '4rem',
    height: '1rem',
  },
  content: {
    color: "$mainTextColor",
    alignSelf: "center",
    fontSize: '0.5rem',
    fontFamily: "roboto-regular"
  }
});

export default SmallButton;
