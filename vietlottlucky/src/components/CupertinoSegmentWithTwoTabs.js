// @flow

import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

function CupertinoSegmentWithTwoTabs(props: {
  leftTitle: string, 
  rightTitle: string,
  choosed: 'left' | 'right',
  onValueChange: Function
}) {
  const [choosed, setChoosed] = useState(props.choosed)
  const onPress = (side: 'left' | 'right') => {
    if (choosed !== side) {
      setChoosed(side);
      props.onValueChange(side)
    }
  }

  return (
    <View style={styles.textWrapper}>
      <TouchableOpacity 
          style={[choosed === 'left' ? styles.segmentTextWrapperChoosed : styles.segmentTextWrapperNotChoosed, styles.segmentTextWrapperLeft]} 
          onPress={() => onPress('left')}>
        <Text style={choosed === 'left' ? styles.titleChoosed : styles.titleNotChoosed}>{props.leftTitle}</Text>
      </TouchableOpacity>
      <TouchableOpacity 
          style={[choosed === 'right' ? styles.segmentTextWrapperChoosed : styles.segmentTextWrapperNotChoosed, styles.segmentTextWrapperRight]} 
          onPress={() => onPress('right')}>
        <Text style={choosed === 'right' ? styles.titleChoosed : styles.titleNotChoosed}>{props.rightTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  textWrapper: {
    height: '1.5rem',
    flex: 1,
    flexDirection: "row",
    marginLeft: '2rem',
    marginRight: '2rem',
    marginTop: '1rem'
  },
  segmentTextWrapperLeft: {
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderColor: "$mainBackgroundColor",
    borderWidth: 1,
  },
  segmentTextWrapperChoosed: {
    flex: 1,
    backgroundColor: "$mainBackgroundColor",
    alignItems: "center",
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleChoosed: {
    color: "$mainTextColor",
    fontSize: '0.7rem',
    fontFamily: "roboto-regular"
  },
  segmentTextWrapperRight: {
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    borderColor: "$mainBackgroundColor",
    borderWidth: 1,
  },
  segmentTextWrapperNotChoosed: {
    flex: 1,
    backgroundColor: "$backgroundColor",
    alignItems: "center",
    justifyContent: 'center',
  },
  titleNotChoosed: {
    color: "$mainBackgroundColor",
    fontSize: '0.7rem',
    fontFamily: "roboto-regular"
  }
});

export default CupertinoSegmentWithTwoTabs;