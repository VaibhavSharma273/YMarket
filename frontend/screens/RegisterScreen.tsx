import React, { useState } from 'react'
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton';
import { TouchableOpacity } from 'react-native'
// import { RootStackParamList, RootTabScreenProps } from '../types';
// import { StackScreenProps } from '@react-navigation/stack';

import { theme } from '../assets/theme'
import { nameValidator } from '../helpers/nameValidator';
import { emailValidator } from '../helpers/emailValidator';
import { phoneValidator } from '../helpers/phoneValidator';

export default function RegisterScreen({ navigation }: any) {
    const [firstName, setFirstName] = useState({ value: '', error: '' })
    const [lastName, setLastName] = useState({ value: '', error: '' })
    const [email, setEmail] = useState({ value: '', error: '' })
    const [phone, setPhone] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        const firstNameError = nameValidator(firstName.value)
        const lastNameError = nameValidator(lastName.value)
        const emailError = emailValidator(email.value)
        const phoneError = phoneValidator(phone.value)
        if (firstNameError || lastNameError || emailError || phoneError) {
            setFirstName({...firstName, error: firstNameError})
            setLastName({...lastName, error: lastNameError})
            setEmail({...email, error: emailError})
            setPhone({...phone, error: phoneError})
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
      <Text style={styles.header}>Create Account</Text>
      <TextInput
        label='First Name'
        returnKeyType="next"
        value={firstName.value}
        onChangeText={(text: any) => setFirstName({ value: text, error: '' })}
        error={!!firstName.error}
        errorText={firstName.error}
        description
      />
      <TextInput
        label='Last Name'
        returnKeyType="next"
        value={lastName.value}
        onChangeText={(text: any) => setLastName({ value: text, error: '' })}
        error={!!lastName.error}
        errorText={lastName.error}
        description
      />
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
        label='Phone Number'
        returnKeyType="next"
        value={phone.value}
        onChangeText={(text: any) => setPhone({ value: text, error: '' })}
        error={!!phone.error}
        errorText={phone.error}
        keyboardType="numeric"
        description
      />
      <TouchableOpacity 
        style={styles.button}
        onPress={onSignUpPressed}>
        <Text style={styles.title}>Sign Up</Text>
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
  separator: {
    marginVertical: 10,
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
    marginTop: 20
  }
});
