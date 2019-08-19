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
                    this.props.navigation.navigate("ViewGroupTaskScreen", { task_id: task_id, server_ip: this.state.ip_server });
                }}
                style={{
                    flex: 1,
                    height: 80,
                    paddingLeft: 50,
                    paddingRight: 50,
                    paddingTop: 20,
                    paddingBottom: 2
                }}
            >
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
                <Bar progress={0.3} width={null} />
            </TouchableOpacity>
        );
    };

    renderSeparator = () => {
        return (
            <View
                // style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
                style={{ height: 1, width: "100%" }}
            />
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
                    onPress={() => navigation.navigate('AuthScreen')} >
                    <DlgtdLogo />
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
                    <FLoatingAddGroupTask navigation={this.props.navigation}/>
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