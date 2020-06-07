// @flow
import React, { useEffect } from "react";
import { Image, Text, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "react-native-vector-icons/Ionicons";

const GameElement = (props: {
  style? : any,
  image: any,
  text1: string,
  text2: string,
  text3: string
}) => {
  useEffect(() => {
    console.log('GameElement rerender')
  })

  return (
    <View style={[styles.container, props.style]}>
      <View style={styles.rect}>
        <View style={styles.imageRow}>
          <Image
              source={props.image}
              resizeMode="cover"
              style={styles.image}
          />
          <View style={styles.content}>
            <Text style={styles.text1}>{props.text1}</Text>
            <Text style={styles.text2}>{props.text2}</Text>
            <Text style={styles.text3}>{props.text3}</Text>
          </View>
          <View style={styles.enter}>
            <Icon name="ios-arrow-forward" style={styles.icon}></Icon>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    marginTop: '0.5rem',
    marginLeft: '0.5rem',
    marginRight: '0.5rem'
  },
  rect: {
    flexDirection: "row",
    flex: 1,
    height: '4.4rem',
    backgroundColor: "$backgroundColor",
    borderRadius: 5
  },
  imageRow: {
    height: '4.4rem',
    flexDirection: "row",
    marginLeft: 3,
    flex: 1
  },
  image: {
    height: '4.4rem',
    width: '4.4rem',
    alignSelf: 'center'
  },
  content: {
    flex: 1,
    marginLeft: '1rem',
    alignSelf: 'center'
  },
  text1: {
    color: "#121212",
    fontSize: '0.5rem',
    fontFamily: "roboto-regular",
    fontWeight: 'bold'
  },
  text2: {
    color: "rgba(255,118,48,1)",
    fontSize: '1rem',
    fontFamily: "roboto-regular",
    fontWeight: 'bold'
  },
  text3: {
    color: "#121212",
    fontFamily: "roboto-regular",
    fontSize: '0.6rem',
    fontWeight: 'bold'
  },
  enter: {
    width: '1.4.4rem',
    height: '4.4rem',
    backgroundColor: "rgba(6,69,142,1)",
    borderColor: "$backgroundColor",
    borderWidth: 1,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    color: "$backgroundColor",
    fontSize: '1.6rem',
    height: '1.6rem',
    width: '0.6rem'
  }
});

export default GameElement;
