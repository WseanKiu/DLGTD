import React, { Component } from 'react';
import {
    StyleSheet,
    AsyncStorage,
    ActivityIndicator,
    Text,
    View,
    Modal,
    WebView,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import styles2 from "../styles/style";
import formsStyle from '../styles/formsStyle';
import { Avatar } from "react-native-elements";

export default class ProfileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ip_server: "",
            user_id: "",
            user_code: "",
            user_fname: "",
            user_lname: "",
            user_email: "",
            user_contacts: "",
            user_address: "",
            user_bdate: "",
            user_premium: false,
            exp_date: "",
            showModal: false,
            status: "Pending",
            showFeedback: false,
            content: "",
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={styles2.navLeftItem} name="menu" size={25} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <TouchableOpacity
                    onPress={() => navigation.navigate("AuthScreen")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <DlgtdLogo />
                    <Text>DLGTD</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={styles2.rightNav}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                        <Icon style={styles2.navItem} name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
            )
        };
    };

    componentWillMount() {
        this._getAsyncData();
    }

    componentDidMount() {
        // this.timer = setInterval(() => {
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
            //             user_fname: responseJson.items[0].user_fname,
            //             user_lname: responseJson.items[0].user_lname,
            //             user_email: responseJson.items[0].user_email,
            //             user_contacts: responseJson.items[0].user_contacts,
            //             user_bdate: responseJson.items[0].user_bdate,
            //             user_premium: responseJson.items[0].premium,

            //             // user_email: responseJson.items[0].user_email,
            //             // user_address: responseJson.items[0].user_address,
            //             // user_bdate: responseJson.items[0].user_bdate,
            //             // user_fname: responseJson.items[0].user_fname,
            //             // user_lname: responseJson.items[0].user_lname,
            //             // user_contacts: responseJson.items[0].user_contacts,
            //             // user_premium: responseJson.items[0].premium,
            //             // exp_date: responseJson.items[0].exp_date ? responseJson.items[0].exp_date : "",
            //             // taskContainer: responseJson.items,
            //             isLoading: false
            //         });
            //     })
            //     .catch(error => {
            //         alert(error + url);
            //     });
        // }, 1000);
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
        
        // this.timer = setInterval(() => {
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
                        user_fname: responseJson.items[0].user_fname,
                        user_lname: responseJson.items[0].user_lname,
                        user_email: responseJson.items[0].user_email,
                        user_contacts: responseJson.items[0].user_contacts,
                        user_bdate: responseJson.items[0].user_bdate,
                        user_premium: responseJson.items[0].premium,

                        // user_email: responseJson.items[0].user_email,
                        // user_address: responseJson.items[0].user_address,
                        // user_bdate: responseJson.items[0].user_bdate,
                        // user_fname: responseJson.items[0].user_fname,
                        // user_lname: responseJson.items[0].user_lname,
                        // user_contacts: responseJson.items[0].user_contacts,
                        // user_premium: responseJson.items[0].premium,
                        // exp_date: responseJson.items[0].exp_date ? responseJson.items[0].exp_date : "",
                        // taskContainer: responseJson.items,
                        isLoading: false
                    });
                })
                .catch(error => {
                    alert(error + url);
                });
        // }, 1000);
    };

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.subscribeUser();
            this.props.navigation.navigate('ThankYou');
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    sendFeedBack() {

        // alert('sfsd?f');
        const url =
            "http://" + this.state.ip_server + "/dlgtd/controller/sendFeedbackController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                content: this.state.content
            })
        })
            .then(response => response.json())
            .then(responseJson => {
            })
            .catch(error => {
                alert(error + url);
            });

            this.setState({
                showFeedback: false
            });

            // this.props.navigation.navigate('EditProfile');
    }

    subscribeUser() {
        // const url =
        //     "http://" + this.state.ip_server + "/dlgtd/controller/subscribeUserController.php";
        const url = "http://" + this.state.ip_server + "/dlgtd/controller/getUserInfoController.php";
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
            })
            .catch(error => {
                alert(error + url);
            });
    }

    render() {
        return (this.state.isLoading ?
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000000" animating />
            </View>
            :
            <ScrollView>
                <Modal
                    visible={this.state.showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                >
                    <WebView
                        source={{ uri: "http://" + this.state.ip_server + ":3000" }}
                        onNavigationStateChange={data =>
                            this.handleResponse(data)
                        }
                        injectedJavaScript={`document.getElementById('price').value="123";document.f1.submit()`}
                    />
                </Modal>
                <Modal
                    visible={this.state.showFeedback}
                    onRequestClose={() => this.setState({ showFeedback: false })}
                >
                    <View style={styles2.modalContainer}>
                        <View style={styles2.modalHeader}>
                            <Text style={styles2.modalTitle}>Create feedback</Text>
                        </View>
                        <View style={styles2.modalBody}>
                            <TextInput
                                onChangeText={(content) => this.setState({ content })}
                                value={this.state.content}
                                style={formsStyle.md_textInput_header}
                                placeholder="Message..." />
                        </View>
                        <View style={styles2.modalTabs}>
                            <TouchableOpacity
                                onPress={() => this.setState({ showFeedback: false })}
                                style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.sendFeedBack.bind(this)}
                                style={{ flex: 0.5, alignItems: 'center' }}>
                                <Text>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerContent}>
                            {/* <Image style={styles.avatar}
                                source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} /> */}
                            <Avatar
                                rounded
                                size={130}
                                title={this.state.user_fname.charAt(0)}
                                // source={{
                                //     uri:
                                //         'https://bootdey.com/img/Content/avatar/avatar1.png',
                                // }}

                                onPress={() => console.log("Works!")}
                                containerStyle={{
                                    width: 130,
                                    height: 130,
                                    borderRadius: 63,
                                    borderWidth: 4,
                                    borderColor: "white",
                                    marginBottom: 10,
                                }}
                                showEditButton
                            />
                            <Text style={styles.name}>
                                {this.state.user_fname} {this.state.user_lname}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.info}>Usercode: {this.state.user_code}</Text>
                            <Text style={styles.description}>Email: {this.state.user_email}</Text>
                            <Text style={styles.description}>Contact number: {this.state.user_contacts}</Text>
                            <Text style={styles.description}>Birthdate: {this.state.user_bdate}</Text>
                            {/* <Text style={styles.description}>Address: {this.state.user_address}</Text> */}
                            
                            {/* {this.state.user_premium ?
                                <Text style={styles.description}>Subscription expire: {this.state.exp_date}</Text>
                                : null} */}

                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => this.props.navigation.navigate('EditProfile')}>
                                <Text>Edit profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => this.props.navigation.navigate('ChangePassword')}>
                                <Text>Chance password</Text>
                            </TouchableOpacity>
                            {
                                !this.state.user_premium ?
                                    <TouchableOpacity style={styles.buttonContainer}
                                        onPress={() => this.props.navigation.navigate('Subscription')}>
                                        <Text>Subscribe to premium!</Text>
                                    </TouchableOpacity>
                                    : null
                            }

                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => this.setState({ showFeedback: true }) }>
                                <Text>Create feedback</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00BFFF",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    body: {
        marginTop: 20,
    },
    bodyContent: {
        flex: 1,
        // alignItems: 'center',
        padding: 30,
    },
    name: {
        fontSize: 28,
        color: "#696969",
        fontWeight: "600"
    },
    info: {
        fontSize: 16,
        color: "#00BFFF",
        marginTop: 10
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        // textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        // width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});

// import React, { Component } from 'react';
// import {
//     StyleSheet,
//     Text,
//     View,
//     Image,
//     TouchableOpacity
// } from 'react-native';
// import Icon from "react-native-vector-icons/MaterialIcons";
// import DlgtdLogo from "../../assets/logo/DlgtdLogo";
// import styles2 from "../styles/style";

// export default class ProfileScreen extends Component {

//     static navigationOptions = ({ navigation }) => {
//         return {
//             headerLeft: (
//                 <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
//                     <Icon style={styles2.navLeftItem} name="menu" size={25} />
//                 </TouchableOpacity>
//             ),
//             headerTitle: (
//                 <TouchableOpacity
//                     onPress={() => navigation.navigate("AuthScreen")}
//                     style={{ flexDirection: "row", alignItems: "center" }}
//                 >
//                     <DlgtdLogo />
//                     <Text>DLGTD</Text>
//                 </TouchableOpacity>
//             ),
//             headerRight: (
//                 <View style={styles2.rightNav}>
//                     <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
//                         <Icon style={styles2.navItem} name="notifications" size={25} />
//                     </TouchableOpacity>
//                     {/* <TouchableOpacity>
//                 <Icon style={styles.navItem} name="account-circle" size={25} />
//               </TouchableOpacity> */}
//                 </View>
//             )
//         };
//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <View style={styles.header}></View>
//                 <Image style={styles.avatar} source={{ uri: 'http://192.168.254.108//dlgtd/Asset/images/paypal_button_png.png' }} />
//                 <View style={styles.body}>
//                     <View style={styles.bodyContent}>
//                         <Text style={styles.name}>John Doe</Text>
//                         <Text style={styles.info}>UX Designer / Mobile developer</Text>
//                         <Text style={styles.description}>Lorem ipsum dolor sit amet, saepe sapientem eu nam. Qui ne assum electram expetendis, omittam deseruisse consequuntur ius an,</Text>

//                         <TouchableOpacity style={styles.buttonContainer}>
//                             <Text>Opcion 1</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity style={styles.buttonContainer}>
//                             <Text>Opcion 2</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         );
//     }
// }

// const styles = StyleSheet.create({
//     header: {
//         backgroundColor: "#00BFFF",
//         height: 200,
//     },
//     avatar: {
//         width: 130,
//         height: 130,
//         borderRadius: 63,
//         borderWidth: 4,
//         borderColor: "white",
//         marginBottom: 10,
//         alignSelf: 'center',
//         position: 'absolute',
//         marginTop: 130
//     },
//     name: {
//         fontSize: 22,
//         color: "#FFFFFF",
//         fontWeight: '600',
//     },
//     body: {
//         marginTop: 40,
//     },
//     bodyContent: {
//         flex: 1,
//         alignItems: 'center',
//         padding: 30,
//     },
//     name: {
//         fontSize: 28,
//         color: "#696969",
//         fontWeight: "600"
//     },
//     info: {
//         fontSize: 16,
//         color: "#00BFFF",
//         marginTop: 10
//     },
//     description: {
//         fontSize: 16,
//         color: "#696969",
//         marginTop: 10,
//         textAlign: 'center'
//     },
//     buttonContainer: {
//         marginTop: 10,
//         height: 45,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//         width: 250,
//         borderRadius: 30,
//         backgroundColor: "#00BFFF",
//     },
// });