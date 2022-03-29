import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import AuthNavigation from './navigation/AuthNavigator';

import { getToken, setToken, deleteToken } from './storage/tokenStorage';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [loginStatus, setLoginStatus] = useState(false);

  const checkToken = async () => {
    const accessToken = await getToken('access');
    if (accessToken !== null) {
      setLoginStatus(true)
    }
  }

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        {/* {loginStatus ? <Navigation colorScheme={colorScheme} /> : <AuthNavigation colorScheme={colorScheme} />} */}
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
