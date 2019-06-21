import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    View,
} from 'react-native';
import style from '../styles/style';

export default class AuthLoadingScreen extends React.Component {
    constructor() {
        super();
        this._bootstrapAsync();
    }

    // Fetch the token from storage
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen
        this.props.navigation.navigate(userToken? 'App' : 'Auth');
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={style.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}
