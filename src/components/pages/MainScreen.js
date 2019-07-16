import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    AsyncStorage,
    Text,
    Button,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DlgtdLogo from '../../assets/logo/DlgtdLogo';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null
        }
        this._getAsyncData();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer() }>
                    <Icon style={styles.navLeftItem} name="menu" size={25} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <TouchableOpacity
                    onPress={() => navigation.navigate('AuthScreen')} 
                    style={{ flexDirection: 'row', alignItems: 'center' }} >
                    <DlgtdLogo />
                    <Text>DLGTD</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={styles.rightNav}>
                    <TouchableOpacity onPress={() => navigation.navigate('AddTask')}>
                        <Icon style={styles.navItem} name="search" size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon style={styles.navItem} name="account-circle" size={25} />
                    </TouchableOpacity>
                </View>
            ),
        };
    };

    _getAsyncData = async () => {
        const userToken = await AsyncStorage.getItem('username');
        alert("qwewq" + userToken);

        this.setState({ username: userToken })
    };

    displaythings = () => {
        this._getAsyncData();
        // alert(this.state.username);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* <View style={styles.navBar}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/logo/yt_logo.png')}
                            style={{ width: 98, height: 22 }}
                        />
                    </TouchableOpacity>
                    <View style={styles.rightNav}>
                        <TouchableOpacity onPress={this.displaythings}>
                            <Icon style={styles.navItem} name="search" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.navItem} name="account-circle" size={25} />
                        </TouchableOpacity>
                    </View>
                </View> */}
                <Text style={styles.text}>Hello, World!</Text>
            </View>
        )
    }
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c0392b',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    },
    navLeftItem: {
        marginLeft: 15
    },
    navBar: {
        height: 55,
        backgroundColor: 'white',
        elevation: 3,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    rightNav: {
        flexDirection: 'row'
    },
    navItem: {
        marginRight: 15
    },
});

