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
import { useContext } from "react";

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

import AccessPostScreen from '../screens/create_post/AccessPostScreen';
import CreatePostScreen from '../screens/create_post/CreatePostScreen';
import EditPostScreen from '../screens/create_post/EditPostScreen';
import SearchScreen from '../screens/SearchScreen';
import SearchCategoryScreen from '../screens/SearchCategoryScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import StartScreen from '../screens/auth/StartScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ConfirmationScreen from '../screens/auth/ConfirmationScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import SplashScreen from '../screens/auth/SplashScreen';
import FeedScreen from '../screens/feed/FeedScreen';
import ViewPostScreen from '../screens/feed/ViewPostScreen';
import { AuthTabParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';

import AppContext from "../screens/AppContext";

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

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const myContext = useContext(AppContext)

  // based on the loginStatus, return the right screen stack

  // there are two screen stacks -- auth (has StartScreen, RegisterScreen, etc)
  // and root (has the feed, profile, etc). If a user is logged in, return the root.
  if (myContext.loading) {
    return <SplashScreen />
  }
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }} >
      {myContext.loginStatus ? (
        <Stack.Screen name="Root" component={BottomTabNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}

    </Stack.Navigator>
  );
}


// auth screen stack
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

// posts (feed + detailed view) screen stack
const PostStack = createNativeStackNavigator();

function PostNavigator() {
  return (
    <PostStack.Navigator 
    initialRouteName="Post"
    >
      <PostStack.Screen 
      name="Feed" component={FeedScreen} options ={{headerShown: false,}}/>
      <PostStack.Screen 
      name="ViewPost" 
      component={ViewPostScreen} 
      options ={{
        title: '',
        headerTintColor: '#0f4d92',
        }}/>
    </PostStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator();

function SearchNavigator() {
  return (
    <SearchStack.Navigator 
    initialRouteName="Search"
    >
      <SearchStack.Screen 
      name="Search" component={SearchScreen} options ={{headerShown: false,}}/>
      <SearchStack.Screen 
      name="ViewPost" 
      component={ViewPostScreen} 
      options ={{
        title: '',
        headerTintColor: '#0f4d92',
        }}/>
      <SearchStack.Screen
        name="SearchCategory"
        component={SearchCategoryScreen}
        options ={{headerTitle: "",
                   headerTransparent: true}}
      />
    </SearchStack.Navigator>
  );
}


/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="PostStack"
      screenOptions={{
        tabBarActiveTintColor: "#0f4d92",
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="PostStack"
        component={PostNavigator}
        options={({ navigation }: RootTabScreenProps<'PostStack'>) => ({
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="CreateStack"
        component={CreateNavigator}
        options={({ navigation }: RootTabScreenProps<'CreateStack'>) => ({
          title: 'Post',
          tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="SearchStack"
        component={SearchNavigator}
        options={({ navigation }: RootTabScreenProps<'SearchStack'>) => ({
          title: 'Search',
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="UserProfile"
        component={UserProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <TabBarIcon name="user-circle" color={color} />,
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

const CreateStack = createNativeStackNavigator();

function CreateNavigator() {
  return (
    <CreateStack.Navigator initialRouteName='AccessPostScreen' screenOptions={{headerShown: false,}}>
      <CreateStack.Screen name="AccessPostScreen" component={AccessPostScreen} />
      <CreateStack.Screen name="CreatePostScreen" component={CreatePostScreen} />
      <CreateStack.Screen name="EditPostScreen" component={EditPostScreen} />
    </CreateStack.Navigator>
  );
}

