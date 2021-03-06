import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Button,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight,
    AsyncStorage,
    Image,
    Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from "react-native-datepicker";

export default class RegisterScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            username: '',
            password: '',
            email: '',
            contact: '',
            user_id: '',
            ip_server: '',
            present_date: '',
            birthdate: '',
        };
    }

    componentDidMount() {
        this._getAsyncData();

        var day = new Date();
        var temp =
            day.getFullYear() +
            "-" +
            (day.getMonth() + 1) +
            "-" +
            day.getDate() +
            " " +
            day.getHours() +
            ":" +
            day.getMinutes();
        this.setState({ present_date: temp });
    }

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem("server_ip");
        this.setState({
            ip_server: server_ip
        });
    };

    checkInputs = () => {
        if(this.state.fname.trim().length>0 &&
        this.state.lname.trim().length>0 &&
        this.state.username.trim().length>0 &&
        this.state.password.trim().length>0 &&
        this.state.email.trim().length>0 &&
        this.state.contact.trim().length>0 &&
        this.state.birthdate.trim().length>0) {
            this.Register();
        } else {
            Alert.alert(
                'Oops!',
                'Please check your inputs, all fields are required.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );
        }
    }

    Register = () => {
        const { fname } = this.state;
        const { lname } = this.state;
        const { username } = this.state;
        const { password } = this.state;
        const { email } = this.state;
        const { contact } = this.state;
        const { birthdate } = this.state;

        // alert(this.state.ip_server);

        fetch('http://' + this.state.ip_server + '/dlgtd/controller/registerController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'applicantion/json'
            },
            body: JSON.stringify({
                fname: fname,
                lname: lname,
                username: username,
                password: password,
                email: email,
                contact: contact,
                birthdate: birthdate
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error) {
                    alert(responseJson.msg);
                } else {
                    this.props.navigation.navigate("Login");
                }
            })
            .catch((error) => {
                alert(error + server_ip);
                // console.error(error);
            });
    }

    _setDataAsync = async () => {
        await AsyncStorage.setItem('user_code', this.state.user_code);
        await AsyncStorage.setItem('user_id', this.state.user_id);
        await AsyncStorage.setItem('userToken', 'App');
        this.props.navigation.navigate("AuthScreen");
    };

    onClickListener = (viewId) => {
        Alert.alert("Alert", "button pressed" + viewId);
    }

    render() {
        return (
            <ScrollView>
            <View style={[styles.container, { marginTop: 50}]}>

                <Image style={styles.logo} source={require('../../assets/logo/dlgtd_logo1.png')} />

                <View style={styles.inputContainer}>
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="Firstname"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(fname) => this.setState({ fname })} />
                    <TextInput style={styles.inputs}
                        placeholder="Lastname"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(lname) => this.setState({ lname })} />
                </View>

                <View style={styles.inputContainer}>
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(username) => this.setState({ username })} />
                </View>
                <View style={styles.inputContainer}>
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        secureTextEntry={true}
                        underlineColorAndroid='transparent'
                        onChangeText={(password) => this.setState({ password })} />
                </View>

                <View style={styles.inputContainer}>
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="Email"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(email) => this.setState({ email })} />
                </View>

                <View style={styles.inputContainer}>
                    {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                    <TextInput style={styles.inputs}
                        placeholder="Contact number"
                        keyboardType="email-address"
                        underlineColorAndroid='transparent'
                        onChangeText={(contact) => this.setState({ contact })} />
                </View>

                <View style={[styles.inputContainer,]}>
                    <DatePicker
                        style={{ width: 230, }}
                        date={this.state.birthdate}
                        mode="date"
                        placeholder="Birthdate"
                        format="YYYY-MM-DD"
                        androidMode="spinner"
                        showIcon={false}
                        maxDate={this.state.present_date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                          dateInput: {
                            marginLeft: 18,
                            borderColor: '#fff'
                          }
                        }}
                        onDateChange={(date) => { this.setState({ birthdate: date }) }}
                    />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.sendButton]} onPress={this.checkInputs}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>


                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ fontSize: 12, alignItems: 'center', flexDirection: 'row' }}>
                    <Icon name="ios-arrow-back" size={18} color="#e74c3c" />
                    <Text style={{ padding: 8 }}>Back</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    logo: {
        width: 150,
        height: 150,
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputContainer: {
        borderBottomColor: '#657b83',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
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
        marginBottom: 20,
        width: 220,
        borderRadius: 30,
    },
    sendButton: {
        backgroundColor: "#FF4500",
    },
    buttonText: {
        color: 'white',
    }
});