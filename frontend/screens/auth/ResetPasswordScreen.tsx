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

export default function ResetPasswordScreen({ navigation }: any) {
    const [email, setEmail] = useState({ value: '', error: '' })

    const sendResetPasswordEmail = async () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({...email, error: emailError})
            return
        }

        const email_val = email.value;

        const response = await API.post('users/reset-password/', {email: email_val})
        .then((response) => {
          console.log(response.data)
          navigation.navigate('LoginScreen') // dummy screen -- your email has been sent -- add go back to login button
        })
        .catch((error) => {
          console.log(error)
          if (error.response) {
            setEmail({...email, error: error.response.data[Object.keys(error.response.data)[0]]})
          }
        });

        navigation.navigate('LoginScreen')
    }

  return (
    <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />
      {/* <View style={styles.separator} /> */}
      <Text style={styles.header}>Restore Password</Text>
      <TextInput
        label='Yale Email'
        returnKeyType="done"
        value={email.value}
        onChangeText={(text: any) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive an email with a password reset link."
      />
      
      <TouchableOpacity 
        style={styles.button}
        onPress={sendResetPasswordEmail}>
        <Text style={styles.title}>Send Instructions</Text>
        </TouchableOpacity>
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
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  forgot: {
    fontSize: 13,
    color: 'gray',
  },
});
