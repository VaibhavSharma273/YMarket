/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import EditPostScreen from '../screens/create_post/EditPostScreen';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            // screens divided into auth and root
            Auth: {
                screens: {
                    StartScreen: 'start',
                    RegisterScreen: 'register',
                    ConfirmationScreen: 'confirm',
                    ResetPasswordScreen: 'resetPassword',
                    LoginScreen: 'login',
                    SplashScreen: 'splash',
                },
            },
            Root: {
                // add screen here
                screens: {
                    PostStack: {
                        screens: {
                            FeedScreen: 'feed',
                            ViewPostScreen: 'viewPost',
                        },
                    },
                    CreateStack: {
                        screens: {
                            AccessPostScreen: 'post',
                            CreatePostScreen: 'create',
                            EditPostScreen: 'edit',
                        },
                    },
                    SearchStack: {
                        screens: {
                            SearchScreen: 'search',
                            ViewPostScreen: 'viewPost',
                            SearchCategoryScreen: 'searchCategory',
                        },
                    },
                    Profile: {
                        screens: {
                            UserProfileScreen: 'userProfile',
                            // EditUserProfileScreen: 'editUserProfile',
                        },
                    },
                },
            },
        },
    },
};

export default linking;
