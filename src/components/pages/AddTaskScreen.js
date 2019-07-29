import React, {Component} from 'react';
import {
    View, 
    Text, 
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity, 
    TextInput,
} from 'react-native';

class AddTaskScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server_ip: '',
            task_name: '',
            task_description: '',
        }
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "add task"
    };

    checkInputs = () => {
        const { task_name } = this.state;
        const { task_description } = this.state;

        // alert(task_name + task_description + this.state.server_ip);
        const url = 'http://' + this.state.server_ip + '/dlgtd/controller/addTaskController.php';

        fetch(url, {
            method: 'post',
            header: {
                'Accept': 'application/json',
                'Content-type': 'applicantion/json'
            },
            body: JSON.stringify({
                user_id: 4,
                task_name: task_name,
                task_description: task_description
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.error === false) {
                    this.props.navigation.navigate('Main');
                } else {
                    alert(responseJson.msg);
                }
            })
            .catch((error) => {
                alert(error + url);
            })
    }

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem('server_ip');
        this.setState({ server_ip: server_ip });
    };

    render() {
        return(
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                    <Text style={styles.textLabel}>Title</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Title"
                        onChangeText={(task_name) => this.setState({ task_name })} 
                    />
                    
                    <Text style={styles.textLabel}>Description</Text>
                    <TextInput
                        style={styles.textInputChildren}
                        placeholder="Description"
                        onChangeText={(task_description) => this.setState({ task_description })} 
                    />
                    </View>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={this.checkInputs}
                        >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default AddTaskScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
    },
    formContainer: {
        // backgroundColor: '#2f63db',
        // borderRadius: 20,
        // padding: 20,
    },
    textLabel: {
        fontSize: 15,
    },
    textInput: {
        borderColor: '#3d4659',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    textInputChildren: {
        borderColor: '#3d4659',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    saveButton: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#007bff',
        borderRadius: 50,
        padding: 15,
        marginTop: 15,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    }
});