// @flow

import React, { Component, useState } from "react";
import { StyleSheet, View, StatusBar, Image, Text, ScrollView, Alert, ActivityIndicator } from "react-native";
import MaterialFixedLabelTextbox from "../components/MaterialFixedLabelTextbox";
import MaterialButtonPink from "../components/MaterialButtonPink";
import MaterialRightIconTextbox from "../components/MaterialRightIconTextbox";
import auth from '@react-native-firebase/auth';

function LoginScreen(props: any) {
  const [showLoading, setShowLoading] = useState(false)
  return (
      <ScrollView style={styles.container}>
          <StatusBar
            animated={true}
            backgroundColor="rgba(208,2,27,1)"
            translucent={true}
            barStyle="light-content"
            hidden={false}
          ></StatusBar>
          <View style={styles.topBar}></View>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logo-vietlott.png")}
              resizeMode="contain"
              style={styles.logo}
            ></Image>
          </View>
          <PhoneSignIn showLoading={showLoading} setShowLoading={value => setShowLoading(value)} />
          <ActivityIndicator animating={showLoading} size="large" color="rgba(208,2,27,1)" />
      </ScrollView>
  );
}

function PhoneSignIn(props) {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [confirm, setConfirm] = useState(null)

  const loginWithPhoneNumber = async () => {
    props.setShowLoading(true)
    try {
      const sendPhoneNumber = phoneNumber.startsWith('0') ? phoneNumber.slice(1) : phoneNumber;
      if (sendPhoneNumber.length != 9) {
        Alert.alert('Thông báo', 'Vui lòng nhập đúng số điện thoại')
      } else {
        const confirmation = await auth().signInWithPhoneNumber('+84' + sendPhoneNumber)
        setConfirm(confirmation)
        setCode('')
      }
    } catch (error) {
      console.log('error when send phone number to firebase authentication', error)
      Alert.alert('Thông báo', 'Có lỗi khi kết nối đến server')
    } finally {
      props.setShowLoading(false)
    }
  }

  const verifyLoginCode = async () => {
    if (!code) {
      Alert.alert('Thông báo', 'Hãy nhập mã xác thực')
    } else {
      props.setShowLoading(true)
      try {
        await (confirm: any).confirm(code)
        Alert.alert('Thông báo', 'Đăng nhập thành công')
      } catch (error) {
        console.log('error when verify login code', error)
        Alert.alert('Thông báo', 'Sai mã xác nhận')
      } finally {
        props.setShowLoading(false)
      }
    }
  }

  if (!confirm) {
    return (
      <View style={styles.body} accessible={false}>
        <Text style={styles.phoneNumberLabel}>Số điện thoại của bạn</Text>
        <MaterialFixedLabelTextbox 
          onChangeText={text => setPhoneNumber(text)}
          style={styles.phoneNumberInput}
          editable={!props.showLoading}
          value={phoneNumber}
          onSubmitEditing={() => {loginWithPhoneNumber()}} />
        <MaterialButtonPink 
          onPress={() => {loginWithPhoneNumber()}}
          style={styles.materialButtonPink}
          buttonLabel="Tiếp tục"
          disabled={props.showLoading} />
      </View>
    )
  } else {
    return (
      <View style={styles.body}>
        <Text style={styles.phoneNumberLabel}>Vui lòng nhập mã xác nhận</Text>
        <MaterialRightIconTextbox
          textInput1="Mã xác nhận"
          style={styles.phoneNumberInput}
          keyboardType="number-pad"
          onChangeText={text => setCode(text)}
          editable={!props.showLoading}
          value={code}
          onSubmitEditing={() => {verifyLoginCode()}} />
        <MaterialButtonPink 
          onPress={() => {verifyLoginCode()}}
          style={styles.materialButtonPink}
          buttonLabel="Xác nhận"
          disabled={props.showLoading} />
        <Text style={styles.changePhoneNumber} onPress={() => setConfirm(null)}>Thay đổi số điện thoại</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  topBar: {
    height: 100,
    backgroundColor: "rgba(208,2,27,1)"
  },
  logoContainer: {
    height: 200,
    backgroundColor: "#ffffff",
  },
  logo: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "center",
    height: 200
  },
  body: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingLeft: 20,
    paddingRight: 20,
  },
  phoneNumberLabel: {
    color: "#121212",
    fontSize: 16,
    fontFamily: "calibri-bold",
    marginTop: 18
  },
  phoneNumberInput: {
    height: 50,
    marginTop: 3
  },
  materialButtonPink: {
    width: 200,
    height: 50,
    marginTop: 12,
    marginBottom: 20,
    alignSelf: "center"
  },
  changePhoneNumber: {
    color: "#121212",
    fontFamily: "roboto-regular",
    textDecorationLine: "underline",
    alignSelf: "center"
  }
});

export default LoginScreen;
