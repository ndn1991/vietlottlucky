// @flow
import React, { useState } from "react";
import { Modal, View, StyleSheet, ActivityIndicator } from "react-native";
import commonStyles from '../styles'

const Loader = (props: any) => {
  
  return (
    <Modal visible={props.isLoading} transparent={true} animationType='none'>
      <View style={styles.loaderContainer}>
        <ActivityIndicator animating={props.isLoading} size="large" color={commonStyles.mainColor} />
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040'
  }
})

export default Loader