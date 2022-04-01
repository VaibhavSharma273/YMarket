/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      StartScreen: 'start',
      RegisterScreen: 'register',
      ConfirmationScreen: 'confirm',
      ResetPasswordScreen: 'resetPassword',
      LoginScreen: 'login',
      Root: {
        // add screen here
        screens: {
          Feed: {
            screens: {
              FeedScreen: 'feed',
            },
          },
          CreateStack: {
            screens: {
              AccessPostScreen: 'post',
              CreatePostScreen: 'create'
            },
          },
          TabTwo: {
            screens: {
              TabTwoScreen: 'two',
            },
          },
          UserProfile: {
            screens: {
              UserProfileScreen: 'userProfile',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
