import React, { Component } from 'react';
import {
    ActivityIndicator,
    View,
    Text,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import DatePicker from 'react-native-datepicker';

class AddTaskScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            server_ip: '',
            task_name: '',
            task_description: '',
            isLoading: false,
            due_date: '',
            dateText: 'Pick a date',
            present_date: '',
        }
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "add task"
    }

    componentDidMount() {
        var day = new Date();
        var temp = day.getFullYear() +
            '-' + (day.getMonth() + 1) +
            '-' + day.getDate() +
            ' ' + day.getHours() +
            ':' + day.getMinutes();
        this.setState({ present_date: temp });
        alert(temp);
    }

    checkInputs = () => {
        this.setState({ isLoading: true });
        if(this.state.task_name == '') {
            alert('Title must be filled!');
            this.setState({ isLoading: false });
        } else {
            this.addUserTask();
        }
    }

    addUserTask = () => {

        const { task_name } = this.state;
        const { task_description } = this.state;
        const { due_date } = this.state;

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
                task_description: task_description,
                task_dueDate: due_date
            })
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.error === false) {
                    this.props.navigation.navigate('Main');
                } else {
                    alert(responseJson.msg);
                }
            })
            .catch((error) => {
                alert(error);
            })
    }

    _getAsyncData = async () => {
        const server_ip = await AsyncStorage.getItem('server_ip');
        this.setState({ server_ip: server_ip });
    };

    render() {
        return (
            this.state.isLoading ?
                (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#000000" animating />
                </View>)
                :
                (<ScrollView>
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
                            <Text style={styles.textLabel}>Due date</Text>

                            <DatePicker
                                style={{ width: 200 }}
                                date={this.state.due_date}
                                mode="datetime"
                                placeholder={this.state.dateText}
                                format="YYYY-MM-DD HH:mm"
                                minDate={this.state.present_date}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 36
                                    }
                                }}
                                minuteInterval={10}
                                onDateChange={(due_date) => { this.setState({ due_date: due_date }); }}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.saveButton}
                            onPress={this.checkInputs}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>)
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
    },
    rowContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    Date_Button: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#3d4659',
        paddingLeft: 10,
        paddingRight: 10,
        marginLeft: 10,
        marginTop: 10,
    },
});

// {
//                                 Platform.OS === 'android' ?
//                                     (
//                                         <TouchableOpacity
//                                             style={styles.rowContainer}
//                                             onPress={() => this.showDatePicker({ date: this.state.date })} >
//                                             <Ionicons name="md-calendar" size={35} />
//                                             <Text style={styles.Date_Button}>{this.state.dateText}</Text>
//                                         </TouchableOpacity>
//                                     )
//                                     :
//                                     <DatePickerIOS
//                                         date={this.state.date}
//                                         onDateChange={this.setDate} />
//                             }