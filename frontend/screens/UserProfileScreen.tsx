import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import API from '../api/ymarket_api';

// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import ProfilePhoto from '../components/ProfilePhoto';
import { ScrollView } from 'react-native-gesture-handler';

export default function UserProfileScreen({ navigation } : RootTabScreenProps<'UserProfile'>) {
    const [user, setUser] = useState(null);

    const getUser = async () => {
      const response = await API.get('users/')
      .then((response) => {
        const userInfo = response.data;
        setUser(userInfo);
      })
      .catch((error) => {
        console.log(error)
      });
    }
    
    return (
        <View style={styles.container}>
            <View style={{marginVertical: 20, height: 1, width: '80%'}}/> 
            <ProfilePhoto/>
            <Text style={styles.title}>user.first_name</Text>
            <View style={{marginVertical: 5, height: 1, width: '80%'}}/> 
            <Text style={styles.contact}>User Profile Email</Text> 
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
    contact: {
        fontSize: 17,
        color: "#4a4a4a",
      },
    separator: {
      marginVertical: 8,
      height: 1,
      width: '80%',
    },
  });