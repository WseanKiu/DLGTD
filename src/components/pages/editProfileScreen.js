import React, { Component } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    Modal,
    TextInput,
    WebView,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import formsStyle from '../styles/formsStyle';
import DatePicker from "react-native-datepicker";

class SubscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ip_server: "",
            user_id: "",
            user_code: "",
            isLoading: false,
            f_name: "",
            l_name: "",
            user_code: "",
            email: "",
            contact: "",
            birthdate: "",
            present_date: "",
        };
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "Edit info"
    };

    componentWillMount() {
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

    componentDidMount() {
        // const url =
        //     "http://" + this.state.ip_server + "/dlgtd/controller/getUserInfoController.php";
        // fetch(url, {
        //     method: "post",
        //     header: {
        //         Accept: "application/json",
        //         "Content-type": "applicantion/json"
        //     },
        //     body: JSON.stringify({
        //         user_id: this.state.user_id
        //     })
        // })
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         this.setState({
        //             email: responseJson.items[0].user_email,
        //             f_name: responseJson.items[0].user_fname,
        //             l_name: responseJson.items[0].user_lname,
        //             contact: responseJson.items[0].user_contacts,
        //             isLoading: false
        //         });
        //     })
        //     .catch(error => {
        //         alert(error + url);
        //     });
    }


    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const server_ip = await AsyncStorage.getItem("server_ip");
        const user_code = await AsyncStorage.getItem("user_code");
        this.setState({
            ip_server: server_ip,
            user_id: user_id,
            user_code: user_code
        });
        const url =
            "http://" + this.state.ip_server + "/dlgtd/controller/getUserInfoController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                user_id: this.state.user_id
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    email: responseJson.items[0].user_email,
                    f_name: responseJson.items[0].user_fname,
                    l_name: responseJson.items[0].user_lname,
                    contact: responseJson.items[0].user_contacts,
                    birthdate: responseJson.items[0].user_bdate,
                    isLoading: false
                });
            })
            .catch(error => {
                alert(error + url);
            });
    };

    checkInputs = () => {
        if(this.state.f_name.trim().length>0 &&
        this.state.l_name.trim().length>0 &&
        this.state.email.trim().length>0 &&
        this.state.contact.trim().length>0 &&
        this.state.birthdate.trim().length>0) {
            this.updateUser();
        } else {
            Alert.alert(
                'Oops!',
                'Please check your inputs, and try again.',
                [
                    { text: 'Okay' },
                ],
                { cancelable: false },
            );
        }
    }

    updateUser = () => {
        const { f_name } = this.state;
        const { l_name } = this.state;
        const { email } = this.state;
        const { contact } = this.state;
        const { birthdate } = this.state;

        fetch('http://' + this.state.ip_server + '/dlgtd/controller/updateUserInfoController.php', {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'applicantion/json'
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                fname: f_name,
                lname: l_name,
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
                    this.props.navigation.navigate("Profile");
                }
            })
            .catch((error) => {
                alert(error + server_ip);
                // console.error(error);
            });
    }


    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.inputContainer}>
                        {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                        <Text>Firstname: </Text>
                        <TextInput style={styles.inputs}
                            placeholder="Firstname"
                            value={this.state.f_name}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(f_name) => this.setState({ f_name })} />
                    </View>
                    <View style={styles.inputContainer}>
                        {/* <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/user/ultraviolet/50/3498db' }} /> */}
                        <Text>Lastname: </Text>
                        <TextInput style={styles.inputs}
                            placeholder="Lastname"
                            value={this.state.l_name}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(l_name) => this.setState({ l_name })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text>Email: </Text>
                        <TextInput style={styles.inputs}
                            placeholder="Email"
                            value={this.state.email}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(email) => this.setState({ email })} />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text>Contact#: </Text>
                        <TextInput style={styles.inputs}
                            placeholder="Contact number"
                            value={this.state.contact}
                            keyboardType="email-address"
                            underlineColorAndroid='transparent'
                            onChangeText={(contact) => this.setState({ contact })} />
                    </View>

                    <View style={[styles.inputContainer,]}>
                        <Text>Birthdate: </Text>
                        <DatePicker
                            style={{ width: 100, }}
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

                    <TouchableOpacity style={[styles.buttonContainer, styles.sendButton]} onPress={this.checkInputs}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default SubscriptionScreen;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#fff',
        marginTop: 100,
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
        marginLeft: 0,
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