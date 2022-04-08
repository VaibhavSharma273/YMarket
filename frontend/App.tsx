import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { getToken, setToken, deleteToken } from './storage/tokenStorage';
import AppContext from './screens/AppContext'
import jwt_decode from "jwt-decode";

import API from './api/ymarket_api';

interface JwtToken {
  exp: number; 
  iat: number; 
  jti: string; 
  token_type: string;
  user_id: string
}

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  // setting up context to use login status as a global variable
  const [loginStatus, setLoginStatus] = useState(false);
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  // function to setup logout to change loginStatus
  const logout = useCallback(() => {
    setLoginStatus(false);
  }, []);

  // function to setup login to change loginStatus
  const login = useCallback(() => {
    setLoginStatus(true);

    // once logged in, retrieve user profile id from refresh token
    const setUserProfile = async () => {
      const refreshToken = await getToken('refresh');
      const decoded = jwt_decode<JwtToken>(String(refreshToken))
      setUser(decoded.user_id)
    }

    setUserProfile() 
  }, []);

  // function to refresh access token using refresh token
  const refreshAccessToken = async () => {
    const path = 'api/token/refresh/'
    const response = await API.post(path)
                              .then((response) => {
                                const accessToken = response.data.access
                                setToken('access', accessToken)
                              })
                              .catch((error) => {
                                console.log(error)
                              });
  }

  // function that loads the splash screen for given ms
  const load = ({time}: any) => {
    setTimeout(() => {
      setLoading(false)
    }, time);
  }

  // function to check the refresh token and determine if user is logged in
  const checkToken = async () => {
    const refreshToken = await getToken('refresh');
    // check if refresh token exists 
    if (refreshToken !== null && refreshToken !== undefined) {
      const decoded = jwt_decode<JwtToken>(String(refreshToken))
      // user needs to login if refresh token expires
      if (decoded.exp < Date.now() / 1000) {
        setLoginStatus(false)
        load(500)
      } 
      // otherwise user is logged in already and should refresh access token
      else {
        await refreshAccessToken() 
        setLoginStatus(true)
        setUser(decoded.user_id)
        load(500)
      }
    }
    else {
      setLoginStatus(false)
      load(500)
    }      
  }

  // function that will run each time App is called -- checks the token value
  useEffect(() => {
    checkToken();    
  }, []);

  const contextValue = useMemo(() => ({
    user,
    loginStatus,
    loading,
    logout,
    login,
  }), [user, loginStatus, loading, logout, login]);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AppContext.Provider value={contextValue}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AppContext.Provider>
    );
  }
}
