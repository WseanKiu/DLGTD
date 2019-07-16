import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
    createAppContainer } from 'react-navigation';

import AuthScreen from './src/components/auth/AuthScreen';
import MainScreen from './src/components/pages/MainScreen';
import LoginScreen from './src/components/auth/LoginScreen';
import AddTaskScreen from './src/components/pages/AddTaskScreen';
import GroupTaskScreen from './src/components/pages/GroupTaskScreen';

const AppStack = createStackNavigator(
    {
        Main: { screen: MainScreen },
        AddTask: { screen: AddTaskScreen }
    }
);

const GroupStack = createStackNavigator(
    {
        GroupTaskScreen: { screen: GroupTaskScreen },
        AddTask: { screen: AddTaskScreen }
    }
);

const Tabs = createBottomTabNavigator(
    {
        Main: { screen: AppStack },
        GroupTask: { screen: GroupStack }
    },
    {
        order: ['Main', 'GroupTask']
    }
);

const Drawer = createDrawerNavigator(
    {
        Tabs: { screen: Tabs },
        GroupStack: { screen: GroupStack }        
    }
);

const AuthStack = createStackNavigator(
    {
        Login: LoginScreen
    },
    {
        headerMode: 'none',
    }
);

//switchNavigator if for focusing only 1 screen at a time, others will be reset to its state.
export default createAppContainer(createSwitchNavigator(
    {
        AuthScreen: AuthScreen,
        App: Drawer,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'AuthScreen',
    }
));

// const AppStack = createStackNavigator(
//     {
//         Main: MainScreen
//     },
//     {
//         headerMode: 'none',
//     }
// );