import React, { useState } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import EStyleSheet from "react-native-extended-stylesheet";

function MaterialPasswordInput(props) {
  const [obscures, setObscures] = useState(true)
  return (
    <View style={[styles.container, props.style]}>
      <TextInput
        placeholder={props.textInput || "Password"}
        style={styles.inputStyle}
        keyboardType={props.keyboardType}
        onChangeText={props.onChangeText} 
        onSubmitEditing={props.onSubmitEditing}
        editable={props.editable}
        value={props.value}
        autoCompleteType='password'
        secureTextEntry={obscures}
        textContentType='newPassword'
        blurOnSubmit={props.blurOnSubmit} />
      <Icon name={'eye'} style={styles.iconStyle} onPress={() => setObscures(!obscures)} />
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "$borderTextInputColor",
    borderBottomWidth: 1
  },
  inputStyle: {
    flex: 1,
    color: "$inputTextColor",
    alignSelf: "flex-end",
    fontSize: '1rem',
    fontFamily: "roboto-regular",
  },
  iconStyle: {
    color: "$iconColor",
    fontSize: '1.5rem',
  }
});

export default MaterialPasswordInput;