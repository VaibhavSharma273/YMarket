import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

import API from '../../api/ymarket_api';

import { Text, View } from '../../components/Themed';
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton';
import { TouchableOpacity } from 'react-native'

import { theme } from '../../assets/theme'
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';

import { getToken, setToken, deleteToken } from '../../storage/tokenStorage';

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }

        const email_val = email.value;
        const password_val = password.value;
        // const token_val = 

        const response = await API.post('api/users/login/', 
                                        {email: email_val, password: password_val})
        .then((response) => {
          console.log(response.data)
          navigation.reset({
            index: 0,
            routes: [{ name: 'Root' }]
          })
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response)
            setPassword({...password, error: error.response.data[Object.keys(error.response.data)[0]]})
          }
        });
    }

  return (
    <View style={styles.container}>
      {/* back button doesnt work if coming from email confirmation */}
      <BackButton goBack={navigation.goBack} />
      {/* <View style={styles.separator} /> */}
      <Text style={styles.header}>Welcome Back!</Text>
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
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}
        >
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity 
        style={styles.button}
        onPress={onLoginPressed}>
        <Text style={styles.title}>Login</Text>
        </TouchableOpacity>
    <View style={styles.separator} />
    <View style={styles.row}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
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
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
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
    marginTop: 20
  },
  separator: {
    marginVertical: 6,
    height: 3,
    width: '50%',
  },
  forgotPassword: {
    width: '80%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: 'gray',
  },
});
