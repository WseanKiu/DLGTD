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
    ScrollView,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from '../styles/style';
import DlgtdLogo from '../../assets/logo/DlgtdLogo';
import TaskContainer from '../helpers/TaskContainer';
import FloatingAddButton from '../helpers/FloatingAddButton';

class MainScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null,
            taskContainer: [
                {
                    key: 1,
                    title: "testing 123",
                    desc: "yeee haaaa",
                },
                {
                    key: 2,
                    title: "hello, world!",
                    desc: "dont let nobody steal your dream.",
                },{
                    key: 1,
                    title: "testing 123",
                    desc: "yeee haaaa",
                },
                {
                    key: 2,
                    title: "hello, world!",
                    desc: "dont let nobody steal your dream.",
                },{
                    key: 1,
                    title: "testing 123",
                    desc: "yeee haaaa",
                },
                {
                    key: 2,
                    title: "hello, world!",
                    desc: "dont let nobody steal your dream.",
                },{
                    key: 1,
                    title: "testing 123",
                    desc: "yeee haaaa",
                },
                {
                    key: 2,
                    title: "hello, world!",
                    desc: "dont let nobody steal your dream.",
                },{
                    key: 1,
                    title: "testing 123",
                    desc: "yeee haaaa",
                },
                {
                    key: 2,
                    title: "hello, world!",
                    desc: "dont let nobody steal your dream.",
                },
            ],
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

        let tasks = this.state.taskContainer.map((val, key) => {
            return <TaskContainer key={key} keyval={key} val={val}
            viewMethod={ ()=> this.viewTask(key) }/>
        });


        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollContainer}>
                    {tasks}
                </ScrollView>
                <FloatingAddButton navigation={this.props.navigation}/>
            </View>
        )
    }

    viewTask(key) {
        alert("task key:" + key);
    }
}

export default MainScreen;

