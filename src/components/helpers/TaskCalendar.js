import React, { Component } from 'react';
import {
    Text,
    FlatList,
    View,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class TaskCalendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            present_date: "",
            isLoading: true,
            user_id: "",
            ip_server: "",
        };
    }

    static navigationOptions = {
        title: "Calendar"
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

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem("server_ip");
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({
            ip_server: server_ip,
            user_id: user_id,
        });

        const url =
            "http://" +
            this.state.ip_server +
            "/dlgtd/controller/viewTaskDatesController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0")
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    items: responseJson.items,
                    isLoading: false
                });
            })
            .catch(error => {
                alert(error + url);
            });
        // alert(this.props.navigation.getParam("task_id", "0") + "server_ip: " + this.state.ip_server);
    };

    componentDidMount() {
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.eventBox}>
                <View style={styles.eventDate}>
                    <Text style={styles.eventDay}>{item.day}</Text>
                    <Text style={styles.eventMonth}>{item.month}</Text>
                </View>
                <View style={styles.eventContent}>
                    <Text style={styles.eventTime}>{item.time}</Text>
                    <Text style={styles.taskTitle}>{item.task_name}</Text>

                    {
                        item.assigned_to != "" || item.assigned_to != "Pending"?
                        <Text style={styles.userName}>{item.assigned_to}</Text> : null
                    }
                    {/* <Text style={styles.description}>{item.notes}</Text> */}
                </View>
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View
                // style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
                style={styles.eventList}
            />
        );
    };

    render() {
        return this.state.isLoading ?(
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="#000000" animating />
            </View>
        ) :(
            <View style={styles.container}>
                <FlatList
                    data={this.state.items}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#DCDCDC",
        flex: 1
    },
    eventList: {
        marginTop: 0,
    },
    eventBox: {
        padding: 10,
        marginTop: 5,
        marginBottom: 0,
        flexDirection: 'row',
    },
    eventDate: {
        flexDirection: 'column',
    },
    eventDay: {
        fontSize: 50,
        color: "#0099FF",
        fontWeight: "600",
    },
    eventMonth: {
        fontSize: 16,
        color: "#0099FF",
        fontWeight: "600",
    },
    eventContent: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 10
    },
    description: {
        fontSize: 15,
        color: "#646464",
    },
    eventTime: {
        fontSize: 18,
        color: "#151515",
    },
    userName: {
        fontSize: 16,
        color: "#646464",
    },
    taskTitle: {
        fontSize: 23,
        color: "#646464",
    }
});