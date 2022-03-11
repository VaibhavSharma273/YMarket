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
import { nameValidator } from '../../helpers/nameValidator';
import { phoneValidator } from '../../helpers/phoneValidator';

export default function RegisterScreen({ navigation }: any) {
    const [firstName, setFirstName] = useState({ value: '', error: '' })
    const [lastName, setLastName] = useState({ value: '', error: '' })
    const [phone, setPhone] = useState({ value: '', error: '' })

    const onSignUpPressed = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'LoginScreen' }]
        })
    }

  return (
    <View style={styles.container}>
        <BackButton goBack={navigation.goBack} />
      {/* <View style={styles.separator} /> */}      
      <TouchableOpacity 
        style={styles.button}
        onPress={onSignUpPressed}>
        <Text style={styles.title}>Confirm Email</Text>
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
    marginTop: 20,
    width: 100
  }
});
