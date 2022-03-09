import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function Logo() {
  return <Image source={require('../assets/images/ymarket_logo.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 170,
    height: 150,
    marginBottom: 10,
  },
})