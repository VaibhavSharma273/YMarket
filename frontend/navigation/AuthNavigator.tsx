import { createNativeStackNavigator } from '@react-navigation/native-stack'; //error here
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import LinkingConfiguration from './LinkingConfiguration';


import { RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';

import StartScreen from '../screens/auth/StartScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ConfirmationScreen from '../screens/auth/ConfirmationScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const LightTheme = {
    dark: false,
    colors: {
      ...DefaultTheme.colors,
    }
  }

export default function AuthNavigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
    return (
      <NavigationContainer
        linking={LinkingConfiguration}
        // theme={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}
        theme={LightTheme}
        >
        <AuthNavigator />
      </NavigationContainer>
    );
  }

const Stack = createNativeStackNavigator<RootStackParamList>();

function AuthNavigator() {
    return(
      <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name="StartScreen" component={StartScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
        <Stack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    );
}
