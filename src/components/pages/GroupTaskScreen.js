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
import { Badge } from 'react-native-elements';
import DlgtdLogo from '../../assets/logo/DlgtdLogo';
import styles from '../styles/style';
import Bar from 'react-native-progress/Bar';
import FLoatingAddGroupTask from '../helpers/groupTask/FloatingAddGroupTask';

class GroupTaskScreen extends Component {
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

    componentDidMount() {
        this.timer = setInterval(() => {
            const url =
                "http://" +
                this.state.ip_server +
                "/dlgtd/controller/getUserGroupTaskController.php";
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
                    // alert(error + url);
                });
        }, 1000);
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
    };

    renderItem = ({ item }) => {
        const task_id = item.task_id;
        return (
            <TouchableOpacity
                onPress={() => { 
                    this.props.navigation.navigate("ViewGroupTaskScreen", { task_id: task_id, server_ip: this.state.ip_server, task_creator: this.state.user_id == item.user_id? true : false });
                }}
                style={{
                    // flex: 1,
                    // paddingTop: 10,
                    // marginHorizontal: 30,
                    // // paddingRight: 30,
                    // paddingBottom: 10

        //   flex: 1,
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
                    <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                        {item.task_status == 'prioritize' ? <Icon name="star" size={25} color="#f1c40f" /> : null}
                        <Text style={{ fontSize: 20, color: "#008a00", fontWeight: '600' }}>{item.title}</Text>
                    </View>
                    <Text style={{color: "#8e8e93", paddingVertical: 5}}>Members {item.total_members}</Text>
                    {/* {item.desc != "" ? (
                        <Text style={{color: "#8e8e93"}}>{item.desc}</Text>
                    ) : (
                            <Text style={{color: "#8e8e93"}}>no description</Text>
                        )} */}
                </View>

                {
                    item.due_date ?
                    <View style={{ flexDirection: 'row' }}>
                        <Icon_2 name="calendar-clock" size={18} color="#e74c3c" />
                        <Text style={{ fontSize: 10, paddingLeft: 5, alignSelf: 'center', paddingBottom: 10, color: "#696969"}}>{item.due_date}</Text>
                        {/* <Badge value={item.due_date} status='primary' /> */}
                    </View>
                    : null
                }

                {
                    item.total_progress > 0 ?
                        <Bar progress={item.progress / item.total_progress} width={null} />
                        : null
                }
                {/* <View style={styles.cont_box1}>
                    {item.task_status == 'prioritize' ? <Icon name="star" size={25} color="#f1c40f" /> : null}
                </View>

                <View style={{ flex: 1, alignItems: "center", alignContent: "center" }}>
                    <Text style={{ fontSize: 18, color: "green" }}>{item.title}</Text>
                    {item.desc != "" ? (
                        <Text>{item.desc}</Text>
                    ) : (
                            <Text>no description</Text>
                        )}
                </View>

                {item.due_date ?
                    <View style={styles.dueDateBadge}>
                        <Badge value={item.due_date} status='primary' />
                    </View>
                    : null}


                {
                    item.total_progress > 0 ?
                        <Bar progress={item.progress / item.total_progress} width={null} />
                        : null
                } */}
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            // <View
            //     // style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
            //     style={{ height: 1, width: "100%" }}
            // />
            <View style={{ height: 1}}/>
        );
    };

    static navigationOptions = ({ navigation }) => {
        return {
            headerLeft: (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                    <Icon style={styles.navLeftItem} name="menu" size={25} />
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
                <View style={styles.rightNav}>
                    <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
                    <Icon style={styles.navItem} name="notifications" size={25} />
                    </TouchableOpacity>
                </View>
            ),
        };
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
                    <FLoatingAddGroupTask navigation={this.props.navigation} />
                </View>
            );
    }
}

export default GroupTaskScreen;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     text: {
//         color: 'white',
//         fontSize: 40,
//         fontWeight: 'bold',
//     },
//     navLeftItem: {
//         marginLeft: 15
//     },
//     navBar: {
//         height: 55,
//         backgroundColor: 'white',
//         elevation: 3,
//         paddingHorizontal: 15,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between'
//     },
//     rightNav: {
//         flexDirection: 'row'
//     },
//     navItem: {
//         marginRight: 15
//     },
// });