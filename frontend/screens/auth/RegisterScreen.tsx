import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton';
import { TouchableOpacity } from 'react-native'

import { theme } from '../../assets/theme'
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }
        navigation.navigate('CreateProfileScreen')
    }

  return (
    <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />
      {/* <View style={styles.separator} /> */}
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        label='Yale Email'
        returnKeyType="next"
        value={email.value}
        onChangeText={(text: any) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text: any) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={onSignUpPressed}>
        <Text style={styles.title}>Sign Up</Text>
      </TouchableOpacity>
      <View style={styles.separator} />
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Arial',
  },
  separator: {
    marginVertical: 6,
    height: 3,
    width: '50%',
  },
  header: {
    fontSize: 21,
    color: '#0f4d92',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#0f4d92",
    padding: 10,
    marginTop: 20,
    width: 100
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
