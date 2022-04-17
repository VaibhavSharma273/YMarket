import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as Input } from 'react-native-paper'
import { theme } from '../assets/theme'
import { normalize } from '../components/TextNormalize';

export default function TextInput({ errorText, description, ...props }: any) {
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        theme={{ colors: { primary : theme.colors.primary}}}
        {...props}
      />
      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginVertical: 1,
  },
  input: {
    backgroundColor: theme.colors.surface,
  },
  description: {
    fontSize: normalize(13),
    color: 'gray',
    paddingTop: 0,
  },
  error: {
    fontSize: normalize(13),
    color: theme.colors.error,
    paddingTop: 8,
  },
})