import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import API from '../api/ymarket_api';

import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProfilePhoto from '../components/ProfilePhoto';

import { getToken, setToken, deleteToken } from '../storage/tokenStorage';
import { TouchableOpacity } from 'react-native'
import AppContext from "./AppContext"

export default function UserProfileScreen({ navigation } : RootTabScreenProps<'UserProfile'>) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [mounted, setMounted] = useState(false)

    const myContext = useContext(AppContext);

    const getUserProfile = async () => {
      const path = 'api/users/profile/' + myContext.user + '/?fields!=posts'
      const response = await API.get(path)
                                .then((response) => {
                                  const firstName = response.data.first_name
                                  const lastName = response.data.last_name
                                  const email = response.data.email
                                  const fullName = String(firstName) + ' ' + String(lastName)
                                  setUserName(fullName)
                                  setUserEmail(email)
                                })
                                .catch((error) => {
                                  console.log(error)
                                });
    }

    if (!mounted) {
      getUserProfile()
    }

    useEffect(() => {
      setMounted(true)
    }, []);

    const onLogoutPressed = async () => {
      await API.post('/api/users/logout/')
         .catch(error =>  console.log(error.response.data));

      await deleteToken('access')
      await deleteToken('refresh')
      myContext.logout()
    }
    
    return (
        <View style={styles.container}>
            <View style={{marginVertical: 20, height: 1, width: '80%'}}/> 
            <ProfilePhoto/>
            <Text style={styles.title}>{userName}</Text>
            <View style={{marginVertical: 5, height: 1, width: '80%'}}/> 
            <Text style={styles.contact}>{userEmail}</Text> 
            <View style={styles.separator}/>
            <TouchableOpacity 
              style={styles.button}
              onPress={onLogoutPressed}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
            <View style={styles.separator}/>
        </View>

    )
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
      color: '#00356b',
    },
    logout: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white',
    },
    contact: {
        fontSize: 17,
        color: "#4a4a4a",
      },
    separator: {
      marginVertical: 8,
      height: 1,
      width: '80%',
    },
    button: {
      alignItems: "center",
      backgroundColor: "#0f4d92",
      padding: 10,
      width: 170,
    }
  });