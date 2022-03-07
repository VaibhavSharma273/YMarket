import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import TextInput from '../../components/TextInput'
import BackButton from '../../components/BackButton';
import { TouchableOpacity } from 'react-native'
// import { RootStackParamList, RootTabScreenProps } from '../types';
// import { StackScreenProps } from '@react-navigation/stack';

import { theme } from '../../assets/theme'
import { emailValidator } from '../../helpers/emailValidator';
import { passwordValidator } from '../../helpers/passwordValidator';

export default function RegisterScreen({ navigation }: any) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })

    const onLoginPressed = () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({...email, error: emailError})
            setPassword({...password, error: passwordError})
            return
        }
        navigation.reset({
            index: 0,
            routes: [{ name: 'Root' }]
        })
    }

  return (
    <View style={styles.container}>
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
});
