import React from 'react';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import AuthScreen from './src/components/auth/AuthScreen';
import MainScreen from './src/components/pages/MainScreen';
import LoginScreen from './src/components/auth/LoginScreen';

const AppStack = createStackNavigator({
    Main: MainScreen
});

const AuthStack = createStackNavigator({
    Login: LoginScreen
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthScreen: AuthScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthScreen',
    }
));