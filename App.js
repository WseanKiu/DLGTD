import React from 'react';
import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator,
    createAppContainer
} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import AuthScreen from './src/components/auth/AuthScreen';
import MainScreen from './src/components/pages/MainScreen';
import LoginScreen from './src/components/auth/LoginScreen';
import LogoutScreen from './src/components/auth/LogoutScreen';
import AddTaskScreen from './src/components/pages/AddTaskScreen';
import GroupTaskScreen from './src/components/pages/GroupTaskScreen';
import ViewTaskScreen from './src/components/pages/ViewTaskScreen';
import AddGrouptaskScreen from './src/components/pages/AddGroupTaskScreen';
import ViewGroupTaskScreen from './src/components/pages/ViewGroupTaskScreen';

const AppStack = createStackNavigator(
    {
        Main: { screen: MainScreen },
        ViewTask: { screen: ViewTaskScreen },
        AddTask: { screen: AddTaskScreen }
    }
);

const GroupStack = createStackNavigator(
    {
        GroupTaskScreen: { screen: GroupTaskScreen },
        ViewGroupTaskScreen: { screen: ViewGroupTaskScreen },
        AddGroupTask: { screen: AddGrouptaskScreen }
    }
);

const Tabs = createBottomTabNavigator(
    {
        Main: {
            screen: AppStack,
            navigationOptions: {
                tabBarLabel: 'Solo task',
            }
        },
        GroupTask: {
            screen: GroupStack,
            navigationOptions: {
                tabBarLabel: 'Group',
            }
        }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Icon;
                let iconName;

                if (routeName === 'Main') {
                    iconName = `tasks`;
                } else if (routeName === 'GroupTask') {
                    iconName = `group`;
                }

                return <IconComponent name={iconName} size={20} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
        },
    }
);

const Drawer = createDrawerNavigator(
    {
        Tabs: { screen: Tabs },
        GroupStack: { screen: GroupStack },
        Logout: { screen: LogoutScreen },
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