import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, SafeAreaView, StatusBar, Button } from 'react-native';

import API from '../../api/ymarket_api';

import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../types';
import ProfilePhoto from '../../components/ProfilePhoto';

import { getToken, setToken, deleteToken } from '../../storage/tokenStorage';
import { TouchableOpacity } from 'react-native'
import AppContext from "../AppContext"
import UploadImage from '../../components/UploadImage';


export default function UserProfileScreen({ navigation } : any) {
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', avatar: '', bio: '' });

    const myContext = useContext(AppContext);

    const getUserProfile = async () => {
      const path = 'api/users/profile/' + myContext.user
      const response = await API.get(path)
                                .then((response) => {
                                  const firstName = response.data.first_name
                                  const lastName = response.data.last_name
                                  const email = response.data.email
                                  const avatar = response.data.avatar_url
                                  const bio = response.data.biography
                                  setUser({ firstName, lastName, email, avatar, bio })
                                })
                                .catch((error) => {
                                  console.log(error)
                                });
    }

    const updateUserProfile = (firstName: string, lastName: string, avatar: string, bio: string) => {
      setUser({ ...user, firstName, lastName, avatar, bio });
    }

    const onLogoutPressed = async () => {
      await API.post('/api/users/logout/')
         .catch(error =>  console.log(error.response.data));

      await deleteToken('access')
      await deleteToken('refresh')
      myContext.logout()
    }
      
    useEffect(() => {
      getUserProfile();
    }, []);
    
    if (!user.email)
    {
      return null;
    }

    return (
        <View style={styles.container}>
            <View style={{marginVertical: 20, height: 1, width: '80%'}}/>
            <ProfilePhoto src={user.avatar}/>
            <Text style={styles.title}>{String(user.firstName) + ' ' + String(user.lastName)}</Text>
            <View style={{marginVertical: 5, height: 1, width: '80%'}}/> 
            <Text style={styles.contact}>{user.email}</Text>
            <View style={styles.separator}/>
            {user.bio ? <Text>{user.bio}</Text> : null}
            <View style={styles.separator}/>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("EditUserProfile", { initialValues: user, updateCallback: updateUserProfile })}>
              <Text style={styles.logout}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{marginVertical: 4}}/>
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