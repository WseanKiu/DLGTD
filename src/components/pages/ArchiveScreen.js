import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon_2 from "react-native-vector-icons/MaterialCommunityIcons";
import Icon_3 from "react-native-vector-icons/Ionicons";
import DlgtdLogo from '../../assets/logo/DlgtdLogo';
import styles from '../styles/style';
import moment from 'moment';
import AddDailyTaskButton from '../helpers/AddDailyTaskButton';

class ArchiveScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskContainer: [],
            isLoading: true,
            ip_server: '',
            user_id: '',
        }
    }

    componentWillMount() {
        this._getAsyncData();
    }

    //getDailyTaskController.php
    componentDidMount() {

    }

    componentWillUnmount() {
        clearInterval(this.timer);
        this.setState({
            taskContainer: [],
            isLoading: true,
            ip_server: '',
            user_id: '',
        });
    }

    _getAsyncData = async () => {
        const user_id = await AsyncStorage.getItem("user_id");
        const server_ip = await AsyncStorage.getItem("server_ip");
        this.setState({
            ip_server: server_ip,
            user_id: user_id
        });

        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/getArchiveTaskController.php";
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
                    taskContainer: responseJson.items,
                    isLoading: false
                });
            })
            .catch(error => {
                // alert(error + url + "wew");
            });

            this.handleResponse();
    };

    handleResponse = () => {
        this.timer = setInterval(() => {

            const url =
                "http://" +
                this.state.ip_server +
                "/dlgtd/controller/getArchiveTaskController.php";
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
                        taskContainer: responseJson.items,
                        isLoading: false
                    });
                })
                .catch(error => {
                    // alert(error + url + " shit");
                });

        }, 1000);
    }

    checkDailyTask = (id) => {

        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/checkDailyTaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                
            })
            .catch(error => {
                // alert(error + url + "WTF?" + id);
            });
    }


    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={styles.navLeftItem} name="menu" size={25} />
                </TouchableOpacity>
            ),
            headerTitle: (
                <TouchableOpacity
                    onPress={() => navigation.navigate("ArchiveScreen")}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <DlgtdLogo />
                    <Text>Archive</Text>
                </TouchableOpacity>
            ),
            headerRight: (
                <View style={styles.rightNav}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                        <Icon style={styles.navItem} name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
            ),
        };
    };

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { 
                    alert('task_id: ' + item.task_id);
                }}
                style={{
                    paddingTop: 10,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingBottom: 10,
                    marginLeft: 20,
                    marginRight: 20,
                    marginVertical: 5,
                    backgroundColor: "white",
                    //   flexDirection: 'row',
                    borderRadius: 10,
                }}>

                <View style={{ flex: 1, alignContent: "center" }}>
                    <Text style={{ color: '#95a5a6', fontSize: 18, fontWeight: '500'}}>{item.task_name}</Text>
                    <Text style={{color: '#bdc3c7', fontSize: 16}}>{item.task_description}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View style={{ height: 1 }} />
        );
    };

    render() {
        return this.state.isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000000" animating />
            </View>
        ) : (
                <View style={styles.container}>
                    <FlatList
                        data={this.state.taskContainer}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
            );
    }
}

export default ArchiveScreen;