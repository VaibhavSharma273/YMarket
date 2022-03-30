import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { getToken, setToken, deleteToken } from './storage/tokenStorage';
import AppContext from './screens/AppContext'
import jwt_decode from "jwt-decode";

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

  // function that will run each time App is called -- checks the token value
  useEffect(() => {
    const checkToken = async () => {
      const refreshToken = await getToken('refresh');
      // check if refresh token exists 
      if (refreshToken !== null && refreshToken !== undefined) {
        const decoded = jwt_decode<JwtToken>(String(refreshToken))
        // user needs to login if refresh token expires
        if (decoded.exp < Date.now() / 1000) {
          setLoginStatus(false)
        } else {
          setLoginStatus(true)
          setUser(decoded.user_id)
        }
      }
      else {
        setLoginStatus(false)
      }      
    }

    checkToken();    
    
  }, []);

  const contextValue = useMemo(() => ({
    user,
    loginStatus,
    logout,
    login,
  }), [user, loginStatus, logout, login]);

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
