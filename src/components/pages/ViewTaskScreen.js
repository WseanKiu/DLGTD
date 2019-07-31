import React from 'react';
import {
    View,
    Text,
    AsyncStorage,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    TextInput,
} from 'react-native';
import DlgtdLogo from '../../assets/logo/DlgtdLogo';
import Icon from 'react-native-vector-icons/MaterialIcons';
import formsStyle from '../styles/formsStyle';
import styles from '../styles/style';

class ViewTaskScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            ip_server: '',
            taskContainer: [],
            editTitle: false,
            task_name: '',
        }
        this._getAsyncData();
    }

    componentDidMount() {
        setTimeout(() => {
            const url = 'http://' + this.state.ip_server + '/dlgtd/controller/viewTaskController.php';
            fetch(url, {
                method: 'post',
                header: {
                    'Accept': 'application/json',
                    'Content-type': 'applicantion/json'
                },
                body: JSON.stringify({
                    user_id: 4,
                    task_id: this.props.navigation.getParam('task_id', '0'),
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.setState({
                        taskContainer: responseJson.items,
                        isLoading: false
                    })
                })
                .catch((error) => {
                    alert(error + url);
                })
                alert(this.state.taskContainer.items.title);
        }, 1000)
    }

    static navigationOptions = ({ navigation }) => {
        return {
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
        const server_ip = await AsyncStorage.getItem('server_ip');
        this.setState({
            ip_server: server_ip
        });
    };

    render() {
        const { navigation } = this.props;
        const task_id = navigation.getParam('task_id', 'no ID, no entry!')
        return (
            this.state.isLoading
            ?
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="tomato" animating />
            </View>
            :
            <ScrollView>
                <View style={formsStyle.formContainer}>
                    {
                        this.state.editTitle ? (
                            <TextInput
                                style={formsStyle.textInput}
                                placeholder="Title"
                                autoFocus
                                // value={this.state.taskContainer.title}
                                onChangeText={(task_name) => this.setState({ task_name })}
                                onBlur={() => this.setState({editTitle : false})}
                            />
                        ) : (
                            <Text 
                                onPress={() => this.setState({editTitle : true})}
                                style={formsStyle.textHeader}>Yow, Mantsanitas! {JSON.stringify(task_id)}</Text>
                        )
                    }
                </View>
            </ScrollView>
        );
    }
}

export default ViewTaskScreen;