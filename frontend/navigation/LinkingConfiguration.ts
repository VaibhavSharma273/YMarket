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
<<<<<<< HEAD
      ConfirmationScreen: 'confirm',
      ResetPasswordScreen: 'resetPassword',
      LoginScreen: 'login',
=======
>>>>>>> 07d6e59f3349be41fcab2df185c9a2635a483dfd
      Root: {
        screens: {
          TabOne: {
            screens: {
              TabOneScreen: 'one',
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
