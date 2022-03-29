/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'; //error here
import * as React from 'react';
import { ColorSchemeName, Pressable } from 'react-native';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import StartScreen from '../screens/auth/StartScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ConfirmationScreen from '../screens/auth/ConfirmationScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import { AuthTabParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import { getToken, setToken, deleteToken } from '../storage/tokenStorage';
import API from '../api/ymarket_api';

const LightTheme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  }
}

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      // theme={colorScheme === 'dark' ? DefaultTheme : DefaultTheme}
      theme={LightTheme}
      >
      <RootNavigator />
    </NavigationContainer>
  );
}

// export function onLogoutPressed = async () => {
//   // change login status to false
//   await deleteToken('refresh')
//   API.post('/api/users/logout/')
//      .catch(error =>  console.log(error.response.data));
//   console.log("logout pressed")
//   // navigation.reset({
//   //   index: 0,
//   //   routes: [{ name: 'Auth' }]
//   // })
// }

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const [loginStatus, setLoginStatus] = React.useState(false);

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      const refreshToken = await getToken('refresh');
      if (refreshToken !== null || refreshToken !== undefined) {
        setLoginStatus(true)
      }
      else {
        setLoginStatus(false)
      }
      console.log(refreshToken)
      console.log("root:" + loginStatus)
    }
    bootstrapAsync();
  }, []);



  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }} >
      {!loginStatus ? (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      ) : (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      )}

    </Stack.Navigator>
  );
}

const Auth = createNativeStackNavigator<AuthTabParamList>();

function AuthNavigator() {
  return (
    <Auth.Navigator initialRouteName='StartScreen' screenOptions={{headerShown: false,}}>
      <Auth.Screen name="StartScreen" component={StartScreen} />
      <Auth.Screen name="RegisterScreen" component={RegisterScreen} />
      <Auth.Screen name="ConfirmationScreen" component={ConfirmationScreen} />
      <Auth.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} />
      <Auth.Screen name="LoginScreen" component={LoginScreen} />
    </Auth.Navigator>
  )
}

// const App = createNativeStackNavigator<RootStackParamList>();

// function AppNavigator() {
//   return (
//     <App.Navigator screenOptions={{headerShown: false,}}>
//       {/* <App.Screen name="Auth" component={AuthNavigator} /> */}
//       <App.Screen name="Root" component={BottomTabNavigator} />
//     </App.Navigator>
//   )
// }

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: 'UserProfile',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
