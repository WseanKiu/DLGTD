import React, { Component } from 'react';
import {
    TouchableOpacity,
    Alert,
    AsyncStorage,
    View,
    Text,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    TextInput,
} from 'react-native';
import Modal from 'react-native-modal';
import Lvl2Task from './Lvl2Task';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/Ionicons';
import formsStyle from '../../styles/formsStyle';
import modalStyle from '../../styles/style';

class ViewLvl2Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false,
            editLvl2task: false,
            creator: false,
            assigned: false,
            server_ip: "",
            user_id: "",
            taskContainer: [],
            subtask_name: "Task_name",
            subtask_desc: "no description",
            date_update: "",
            status: "",
            due_date: "",
            progress: "",
            total_progress: "",
            assigned_to: "",
            full_name: "",
            task_name: "",
        }
    }

    componentWillMount() {
        this._getAsyncData();
    }

    _getAsyncData = async () => {
        const ip_server = await AsyncStorage.getItem("server_ip");
        const user_id = await AsyncStorage.getItem("user_id");
        this.setState({
            server_ip: ip_server,
            user_id: user_id,
        });
    };

    componentDidMount() {
        this.setState({
            creator: this.props.navigation.getParam('creator'),
            assigned: this.props.navigation.getParam('assigned'),
        });
        this.timer = setInterval(() => {

            const url = "http://" +
                this.state.server_ip +
                "/dlgtd/controller/getSubtaskInfoController.php";
            fetch(url, {
                method: "post",
                header: {
                    Accept: "application/json",
                    "Content-type": "applicantion/json"
                },
                body: JSON.stringify({
                    user_id: this.state.user_id,
                    subtask_id: this.props.navigation.getParam("subtask_id", "0")
                })
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        isLoading: false,
                        subtask_name: responseJson.items[0].subtask_name,
                        subtask_desc: responseJson.items[0].subtask_desc,
                        date_updated: responseJson.items[0].date_updated,
                        status: responseJson.items[0].status,
                        due_date: responseJson.items[0].due_date,
                        progress: responseJson.items[0].progress,
                        total_progress: responseJson.items[0].total_progress,
                        assigned_to: responseJson.items[0].assigned_to,
                        full_name: responseJson.items[0].full_name
                    });
                    responseJson = null;
                })
                .catch(error => {
                    alert(error + url + this.state.server_ip);
                });

            const url2 = "http://" +
                this.state.server_ip +
                "/dlgtd/controller/getSubSubtaskController.php";
            fetch(url2, {
                method: "post",
                header: {
                    Accept: "application/json",
                    "Content-type": "applicantion/json"
                },
                body: JSON.stringify({
                    subtask_id: this.props.navigation.getParam("subtask_id", "0")
                })
            })
                .then(response => response.json())
                .then(responseJson => {
                    this.setState({
                        taskContainer: responseJson.items,
                    });
                    responseJson = null;
                })
                .catch(error => {
                    alert(error + url2);
                });
        }, 1000);

        // alert(this.state.status + this.props.navigation.getParam("subtask_id", "0"));
    }

    addTask() {
        this.setState({ isModalVisible: false });

        if (this.state.task_name.trim() != '') {
            const url =
                "http://" +
                this.state.server_ip +
                "/dlgtd/controller/addLvl2TaskController.php";
            fetch(url, {
                method: "post",
                header: {
                    Accept: "application/json",
                    "Content-type": "applicantion/json"
                },
                body: JSON.stringify({
                    subtask_id: this.props.navigation.getParam("subtask_id", "0"),
                    task_name: this.state.task_name,
                })
            })
                .then(response => response.json())
                .then(responseJson => {
                    if (responseJson.error) {
                        alert(responseJson.response);
                    }
                })
                .catch(error => {
                    alert(error + url);
                    // alert(error + "Please check your internet connection!");
                });
        }
        else {
            Alert.alert(
                'Oops!',
                'Task name must be filled!',
                [
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ],
                { cancelable: false },
            );
        }

        this.setState({ task_name: "" });
    }


    checkSubTask = (id) => {
        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/checkLvl2TaskController.php";
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
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                alert(error + url);
                // alert(error + "Please check your internet connection!");
            });
    }

    deleteLvl2Task = (id) => {
        // alert(id);
        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/deleteLvl2TaskController.php";
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
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                alert(error + url);
                // alert(error + "Please check your internet connection!");
            });
    }

    prioritizeTask = () => {
        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/prioritizeTaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                subtask_id: this.props.navigation.getParam("subtask_id", "0"),
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                // alert(error + url);
                // alert(error + "Please check your internet connection!");
            });

    }

    pokeUser = () => {
        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/pokeUserController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
                subtask_id: this.props.navigation.getParam("subtask_id", "0"),
                user_id: this.state.user_id
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                // alert(error + url);
                // alert(error + "Please check your internet connection!");
            });

        this.props.navigation.goBack();
    }

    confirmDeleteLvl1Task = () => {

        Alert.alert(
            'Confirm!',
            'Are you sure you want to delete this task?',
            [
                { text: 'Yes', onPress: () => this.deleteLvl1Task() },
                { text: 'No' },
            ],
            { cancelable: false },
        );
        // alert('taskid: ' + this.props.navigation.getParam("task_id", "0") + 'subtask_id:' +this.props.navigation.getParam("subtask_id", "0"));
    }

    deleteLvl1Task = () => {
        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/deleteSubtaskController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                task_id: this.props.navigation.getParam("task_id", "0"),
                subtask_id: this.props.navigation.getParam("subtask_id", "0")
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson.error) {
                    alert(responseJson.response);
                }
            })
            .catch(error => {
                // alert(error + url);
                // alert(error + "Please check your internet connection!");
            });

        this.props.navigation.goBack();
    }

    render() {
        let Lvl2Tasks = this.state.taskContainer.map((val, key) => {
            return <Lvl2Task key={key} keyval={key} val={val}
                creator={this.state.creator}
                assigned={this.state.assigned}
                checkSubtask={() => this.checkSubTask(val.id)}
                deleteLvl2Task={() => this.deleteLvl2Task(val.id)}
                editSubTask={() => this.setState({
                    //   editSubTask: true,
                    //   subTaskID: val.subtask_id,
                    //   subTaskName: val.subtask_name,
                    //   subTaskDesc: val.subtask_desc,
                    //   subTaskDue: val.due_date,
                })} />
        });
        return this.state.isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="tomato" animating />
            </View>
        ) : (
                <ScrollView style={{ backgroundColor: "#ebf0f7" }}>
                    <Modal isVisible={this.state.isModalVisible}>
                        <View style={modalStyle.modalContainer}>
                            <View style={modalStyle.modalHeader}>
                                <Text style={modalStyle.modalTitle}>Add task</Text>
                            </View>
                            <View style={modalStyle.modalBody}>
                                <TextInput
                                    onChangeText={(task_name) => this.setState({ task_name })}
                                    value={this.state.task_name}
                                    style={formsStyle.md_textInput_header}
                                    placeholder="Task name" />
                            </View>
                            <View style={modalStyle.modalTabs}>
                                <TouchableOpacity
                                    onPress={() => this.setState({ isModalVisible: false })}
                                    style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={this.addTask.bind(this)}
                                    style={{ flex: 0.5, alignItems: 'center' }}>
                                    <Text>Add</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                    <View style={styles.formContainer}>
                        <Text style={styles.textHeader}>{this.state.subtask_name}</Text>
                        <Text style={styles.textSub}>{this.state.subtask_desc != '' ? this.state.subtask_desc : 'Add note'}</Text>
                        {
                            this.state.assigned_to != null ?
                                <View style={[formsStyle.row2style, { paddingTop: 10, alignItems: 'center' }]}>
                                    <Icon3 name="md-person" size={25} color="fff" />
                                    <Text style={styles.textSub}>{this.state.full_name} ({this.state.assigned_to})</Text>
                                </View> : null
                        }
                        {/* <Text style={styles.textSub}>subtask_id: {this.props.navigation.getParam('subtask_id', '0')}</Text> */}

                        {/* ACTION BUTTONS */}
                        {this.state.creator ?
                            <TouchableOpacity style={styles.deleteTaskButton}>
                                <Icon name="close" size={30} onPress={() => this.confirmDeleteLvl1Task()} />
                            </TouchableOpacity>
                            : null}
                        {/* {this.state.creator ?
                            <TouchableOpacity style={styles.prioritizeTaskButton} onPress={() => this.prioritizeTask()}>
                                <Icon name={this.state.status == 'prioritize' ? "star" : "star-border"} size={30} />
                            </TouchableOpacity>
                            : null} */}
                        {this.state.creator && this.state.assigned_to != null ?
                            <TouchableOpacity style={styles.pokeButton} onPress={() => this.pokeUser()}>
                                <Icon2 name="hand-point-right" size={30} />
                            </TouchableOpacity>
                            : null}
                        {
                            this.state.creator ?
                                <TouchableOpacity
                                    onPress={() => this.setState({ isModalVisible: true })}
                                    style={styles.addButton}>
                                    <Icon3 name="ios-add" size={30} color="#fff" />
                                </TouchableOpacity>
                                : null
                        }
                    </View>
                    {Lvl2Tasks}
                </ScrollView>
            )
    }
}

export default ViewLvl2Task;

const styles = StyleSheet.create({
    deleteTaskButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },
    prioritizeTaskButton: {
        position: 'absolute',
        top: 10,
        left: 15,
    },
    pokeButton: {
        position: 'absolute',
        top: 10,
        left: 20,
    },
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#e91e63',
        width: 50,
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    formContainer: {
        flex: 1,
        alignContent: "center",
        paddingTop: 35,
        paddingBottom: 35,
        paddingLeft: 20,
        paddingRight: 20,
        // backgroundColor: "#1B811B",
        backgroundColor: "#00BFFF",
    },

    textHeader: {
        fontSize: 31,
        color: "#ffffff"
    },
    textSub: {
        fontSize: 18,
        color: "#ffffff",
    },
    textLabel: {
        fontSize: 14,
        color: "#ffffff"
    },
    row2style: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    valContainer: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        color: "#ffffff"
    },
    textInput: {
        borderColor: "#ffffff",
        color: "#ffffff",
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    textInputChildren: {
        borderColor: "#ffffff",
        color: "#ffffff",
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
    saveButton: {
        borderWidth: 1,
        borderColor: "white",
        backgroundColor: "#007bff",
        borderRadius: 50,
        padding: 15,
        marginTop: 15
    },
    saveButtonText: {
        color: "#ffffff",
        fontSize: 20,
        textAlign: "center"
    },
    md_textInput_header: {
        borderColor: "#000",
        color: "#000",
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 20,
        padding: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    md_textInput_children: {
        borderColor: "#000",
        color: "#000",
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10
    },
});