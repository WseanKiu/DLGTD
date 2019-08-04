import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    TouchableHighlight,
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            ip_server: '',
        };
    }

    componentDidMount() {
        this._getAsyncData();
    }

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem("server_ip");
        this.setState({
            ip_server: server_ip
        });
    };

    authLogin = () => {
        const { username } = this.state;
        const { password } = this.state;

        fetch('http://' + this.state.ip_server + '/dlgtd/controller/loginController.php', {
            // fetch('http://192.168.254.108/dlgtd/controller/loginController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'applicantion/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    this._setDataAsync();
                    this.props.navigation.navigate('App');
                } else {
                    alert(responseJson.msg);
                }
            })
            .catch((error) => {
                alert(error + server_ip);
                // console.error(error);
            });
    }

    _setDataAsync = async () => {
        await AsyncStorage.setItem('username', this.state.username);
        await AsyncStorage.setItem('password', this.state.password);
        await AsyncStorage.setItem('userToken', 'App');
    };

    onClickListener = (viewId) => {
        Alert.alert("Alert", "button pressed" + viewId);
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    {/* <Icon name="person" size={25} /> */}
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/message/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="username"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({ username })} />
                </View>

                <View style={styles.inputContainer}>
                    {/* <Icon name="vpn_key" size={25} /> */}
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.authLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
                    <Text>Forgot your password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('register')}>
                    <Text>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
        // backgroundColor: '#ffffff',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 260,
        height: 45,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 1,
        width: 260,
        borderRadius: 30,
    },
    loginButton: {
        color: '#ffffff',
        backgroundColor: "#00b5ec",
        height: 45,
        width: 260,
        borderRadius: 30,
    },
    loginText: {
        color: '#ffffff',
    }
});