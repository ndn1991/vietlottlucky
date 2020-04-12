import React from "react";
import { TouchableOpacity, Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

function MainButton(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={[styles.container, props.style]} disabled={props.disabled}>
      <Text style={styles.content}>{props.buttonLabel}</Text>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  container: {
    backgroundColor: "$mainBackgroundColor",
    justifyContent: "center",
    alignItems: 'center',
    elevation: 2,
    borderRadius: 2,
    width: '10rem',
    height: '3rem',
  },
  content: {
    color: "$mainTextColor",
    alignSelf: "center",
    fontSize: '$defaultFontSize',
    fontFamily: "roboto-700"
  }
});

export default MainButton;
