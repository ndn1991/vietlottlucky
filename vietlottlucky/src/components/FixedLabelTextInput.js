import React from "react";
import { View, Text, TextInput } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

function FixedLabelTextInput(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput 
        editable={props.editable} 
        style={styles.inputStyle} 
        keyboardType={props.keyboardType} 
        onChangeText={props.onChangeText} 
        onSubmitEditing={props.onSubmitEditing}
        value={props.value}>
      </TextInput>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    borderColor: "$borderTextInputColor",
    borderBottomWidth: 1
  },
  label: {
    color: "$inputTextColor",
    paddingBottom: '0.4rem',
    fontSize: '$defaultFontSize',
    fontFamily: "roboto-700",
    alignSelf: "flex-end",
    textAlign: 'right',
    paddingRight: '0.3rem',
    width: '4rem'
  },
  inputStyle: {
    flex: 1,
    color: "$inputTextColor",
    alignSelf: "flex-end",
    paddingBottom: '0.4rem',
    fontSize: '$defaultFontSize',
    fontFamily: "roboto-700",
  }
});

export default FixedLabelTextInput;
