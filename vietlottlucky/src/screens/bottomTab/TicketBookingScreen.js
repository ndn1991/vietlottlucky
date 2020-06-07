// @flow
import React, { useEffect } from 'react';
import { Image, ScrollView, View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import GameElement from '../../components/GameElement';

const TicketBookingScreen = () => {
  useEffect(() => {
    console.log('TicketBookingScreen rerender')
  })

  return (
    <View style={style.container}>
      <View style={style.bannerContainer}>
        <ScrollView pagingEnabled directionalLockEnabled horizontal>
        <Image
          source={require('../../assets/images/example1.jpg')}
          style={style.image}
          resizeMode="cover" />
        <Image
          source={require('../../assets/images/example2.jpg')}
          style={style.image}
          resizeMode="cover" />
        <Image
          source={require('../../assets/images/example3.jpg')}
          style={style.image}
          resizeMode="cover" />
        </ScrollView>
      </View>
      <View style={style.gameContainer}>
        <ScrollView>
          <GameElement image={require("../../assets/images/keno.png")} 
            text1="Cả tuần, 10 phút/ 1 kỳ quay"
            text2="2.000.000.000 đ"
            text3="Đánh nhanh, trúng lớn" />
          <GameElement image={require("../../assets/images/keno.png")} 
            text1="Cả tuần, 10 phút/ 1 kỳ quay"
            text2="2.000.000.000 đ"
            text3="Đánh nhanh, trúng lớn" />
          <GameElement image={require("../../assets/images/keno.png")} 
            text1="Cả tuần, 10 phút/ 1 kỳ quay"
            text2="2.000.000.000 đ"
            text3="Đánh nhanh, trúng lớn" />
          <GameElement image={require("../../assets/images/keno.png")} 
            text1="Cả tuần, 10 phút/ 1 kỳ quay"
            text2="2.000.000.000 đ"
            text3="Đánh nhanh, trúng lớn" />
          <GameElement image={require("../../assets/images/keno.png")} 
            text1="Cả tuần, 10 phút/ 1 kỳ quay"
            text2="2.000.000.000 đ"
            text3="Đánh nhanh, trúng lớn" />
          <GameElement image={require("../../assets/images/keno.png")} 
            text1="Cả tuần, 10 phút/ 1 kỳ quay"
            text2="2.000.000.000 đ"
            text3="Đánh nhanh, trúng lớn" />
        </ScrollView>
      </View>
    </View>
  )
}

const style = EStyleSheet.create({
  container: {
    flex: 1
  },
  bannerContainer: {
    flex: 1
  },
  gameContainer: {
    flex: 3,
    backgroundColor: "$mainBackgroundColor",
    paddingBottom: "0.3rem"
  },
  image: {
    width: "$fullWidth",
    "height": "100%"
  }
})
export default TicketBookingScreen;