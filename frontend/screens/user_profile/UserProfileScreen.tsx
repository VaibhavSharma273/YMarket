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
import LoadingIndicator from '../../components/LoadingIndicator';

import { normalize } from '../../components/TextNormalize';

export default function UserProfileScreen({ route, navigation } : any) {
  const params = route.params;
  const myContext = useContext(AppContext);
  const is_post = params === undefined || params['is_post'] === undefined ? false : true;
  const userId = params === undefined || params['id'] === undefined ? myContext.user : params['id'];
  const [user, setUser] = useState({ firstName: '', lastName: '', email: '', avatar: '', bio: '' });

  const getUserProfile = async () => {
    const path = 'api/users/profile/' + userId;
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
    return <LoadingIndicator></LoadingIndicator>
  }

  return (
      <View style={styles.container}>
        <View style={styles.info_container}>
          {!is_post ? <View style={{marginVertical: 20, height: 1, width: '80%'}}/> 
          : null}
            <View style={{flexDirection: 'row'}}>
              <ProfilePhoto src={user.avatar}/>
              <View style={{flexDirection: 'column', width: '60%', paddingHorizontal: '4%', justifyContent: 'center'}}>
                <Text numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.title}>
                        {String(user.firstName) + ' ' + String(user.lastName)}
                </Text>
                <Text numberOfLines={1}
                      adjustsFontSizeToFit
                      style={styles.contact}>{user.email}
                </Text>
                <Text numberOfLines={2}
                    adjustsFontSizeToFit
                    style={styles.bio}>
                      {user.bio ? 
                        <>
                          {user.bio.length < 42 ?
                            user.bio :
                            `${user.bio.substring(0, 42)}...`
                          }
                        </> : ""}
              </Text>
                <View style={{marginVertical: 6, height: 1, width: '80%'}}/> 
              </View>
            </View>
          </View>
          <View style={styles.separator}/>
          { userId === myContext.user ? <View style={styles.bottom_container}>
            <TouchableOpacity
            style={styles.button}
            // onPress={() => navigation.push("EditUserProfileScreen", { initialValues: user, updateCallback: updateUserProfile })}
            onPress={() => navigation.navigate("EditUserProfile", { initialValues: user, updateCallback: updateUserProfile })}
            >
            <Text style={styles.logout}>Edit Profile</Text>
            </TouchableOpacity>
            <View style={{marginVertical: 4}}/>
            <TouchableOpacity
              style={styles.button}
              onPress={onLogoutPressed}>
              <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
          </View>
          : null}
          <View style={styles.separator}/>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: '5%',
    },
    info_container: {
      paddingLeft: '5%',
    },
    title: {
      fontSize: normalize(20),
      fontWeight: 'bold',
      color: '#00356b',
    },
    logout: {
      fontSize: normalize(15),
      fontWeight: 'bold',
      color: 'white',
    },
    contact: {
        fontSize: normalize(15),
        color: "#5f712d",
      },
    bio: {
      fontSize: normalize(15),
      color: "#4a4a4a",
    },
    separator: {
      marginVertical: 8,
      height: 1,
      width: '80%',
    },
    button: {
      alignItems: "center",
      justifyContent: 'center',
      backgroundColor: "#0f4d92",
      padding: 10,
      width: 170,
    },
    bottom_container: {
      width: '100%',
      position: 'absolute',
      bottom: 20,
      alignItems: 'center',
    },
    middle_container: {
      display: 'flex', 
      alignItems: 'center',
    }
  });