import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState, useMemo } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

import { getToken, setToken, deleteToken } from './storage/tokenStorage';
import AppContext from './screens/AppContext'
import jwt_decode, { JwtPayload } from "jwt-decode";

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

    const checkToken = async () => {
      const refreshToken = await getToken('refresh');
      const decoded = jwt_decode<JwtPayload>(String(refreshToken))
      // this is the user id
      console.log(Object.values(decoded)[4])
      setUser(Object.values(decoded)[4])
    }

    checkToken() 
  }, []);

  // function that will run each time App is called -- checks the token value
  useEffect(() => {
    const checkToken = async () => {
      const refreshToken = await getToken('refresh');
      console.log(refreshToken)
      // check if refresh token has expired
      if (refreshToken !== null && refreshToken !== undefined) {
        setLoginStatus(true)
        const decoded = jwt_decode<JwtPayload>(String(refreshToken))
        // this is the user id
        console.log(Object.values(decoded)[4])
        setUser(Object.values(decoded)[4])
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
