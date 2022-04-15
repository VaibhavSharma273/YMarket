import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

export default function LoadingIndicator() {
    return (
        <View style = {styles.container}>
            <ActivityIndicator size="large" color="#0f4d92"/>
        </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
  },
})
