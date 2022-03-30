import React from 'react'
import { Image, StyleSheet } from 'react-native'

export default function ProfilePhoto() {
  return <Image source={require('../assets/images/blank-profile-picture.png')} style={styles.image} />
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 400/2,
  },
})