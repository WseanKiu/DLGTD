import React from "react";
import {
  Alert,
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import Icon from "react-native-vector-icons/MaterialIcons";
import Modal from "react-native-modal";
import DateCreatedLabel from "../helpers/viewTask/DateCreatedLabel";
import DueDateLabel from "../helpers/viewTask/DueDateLabel";
import TaskTitleLabel from "../helpers/viewTask/TaskTitleLabel";
import DescLabel from "../helpers/viewTask/DescLabel";
import AddSubTaskButton from "../helpers/viewTask/AddSubTaskButton";
import SubTask from "../helpers/viewTask/SubTask";
import formsStyle from "../styles/formsStyle";
import styles from "../styles/style";

class ViewTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isModalVisible: false,
      ip_server: "",
      user_id: "",
      taskContainer: [],
      task_name: "",
      var_taskName: "",
      editTitle: false,
      task_desc: "",
      var_taskDesc: "",
      editDesc: false,
      task_dueDate: "",
      var_dueDate: "",
      editDue: false,
      present_date: "",
      date_created: "",
      subTaskArray: [],
      subTaskName: "",
      subTaskDesc: "",
    };
  }

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

  componentDidMount() {
    setTimeout(() => {
      const url =
        "http://" +
        this.props.navigation.getParam("server_ip", "") +
        "/dlgtd/controller/viewTaskController.php";
      fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          task_id: this.props.navigation.getParam("task_id", "0")
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          //   alert(responseJson.items[0].title);
          this.setState({
            taskContainer: responseJson.items[0],
            isLoading: false,
            task_name: responseJson.items[0].title,
            task_desc: responseJson.items[0].desc,
            task_dueDate: responseJson.items[0].due_date,
            date_created: responseJson.items[0].date_created,
            var_taskName: responseJson.items[0].title,
            var_taskDesc: responseJson.items[0].desc,
            var_dueDate: responseJson.items[0].due_date,
          });
        })
        .catch(error => {
          alert(error + url);
          // alert("Please check your internet connection!");
        });
    }, 10);
  }

  componentWillUnmount() {
    var values = this.state.task_name === this.state.var_taskName ?
      '' : "task_name = '" + this.state.task_name + "'";
    values += this.state.task_desc === this.state.var_taskDesc ?
      '' : (values !== '' ? ', ' : "") + "task_description = '" + this.state.task_desc + "'";
    values += this.state.task_dueDate === this.state.var_dueDate ?
      '' : (values !== '' ? ', ' : "") + "due_date = '" + this.state.task_dueDate + "' ";
    // alert(values);  

    if (values != '') {
      const url =
        "http://" +
        this.props.navigation.getParam("server_ip", "") +
        "/dlgtd/controller/updateTaskController.php";
      fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          user_id: this.state.user_id,
          task_id: this.props.navigation.getParam("task_id", "0"),
          values: values,
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.error === true) {
            alert("Something went wrong, please try again later.");
          }
        })
        .catch(error => {
          // alert(error + url);
          alert("Please check your internet connection!");
        });
    }
  }

  putSubTask = (subtask_name) => {
    alert(subtask_name);
    // var values = this.state.task_name === this.state.var_taskName ?
    //   '' : "task_name = '" + this.state.task_name + "' ";
    // value += this.state.task_desc === this.state.var_taskDesc ?
    //   '' : "task_description = '" + this.state.task_desc + "' ";
    // value += this.state.task_dueDate === this.state.var_dueDate ?
    //   '' : "due_date = '" + this.state.task_dueDate + "'";

    // const url =
    //   "http://" +
    //   this.state.ip_server +
    //   "/dlgtd/controller/updateTaskController.php";
    // fetch(url, {
    //   method: "post",
    //   header: {
    //     Accept: "application/json",
    //     "Content-type": "applicantion/json"
    //   },
    //   body: JSON.stringify({
    //     user_id: 4,
    //     task_id: this.props.navigation.getParam("task_id", "0"),
    //     values: values,
    //   })
    // })
    //   .then(response => response.json())
    //   .then(responseJson => {})
    //   .catch(error => {
    //     // alert(error + url);
    //     alert("Please check your internet connection!");
    //   });
  }

  static navigationOptions = ({ navigation }) => {
    return {
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
          <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
            <Icon style={styles.navItem} name="search" size={25} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon style={styles.navItem} name="account-circle" size={25} />
          </TouchableOpacity>
        </View>
      )
    };
  };

  _getAsyncData = async () => {
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({
      ip_server: server_ip,
      user_id: user_id,
    });
  };

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  addSubTask() {
    // alert(subtask);
    if (this.state.subTaskName !== '') {
      this.putSubTask(this.state.subTaskName);
      var d = new Date();
      this.state.subTaskArray.push({
        'subTaskName': this.state.subTaskName,
        'subTaskDesc': this.state.subTaskDesc
      });
      this.setState({ subTaskArray: this.state.subTaskArray })
      this.setState({ subTaskName: '', subTaskDesc: '' });
    } else {
      Alert.alert(
        'Oops!',
        'Subtask name must be filled!',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
    this.setState({ isModalVisible: false });
  }

  render() {
    const { navigation } = this.props;

    let SubTasks = this.state.subTaskArray.map((val, key) => {
      return <SubTask key={key} keyval={key} val={val} />
    });

    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="tomato" animating />
      </View>
    ) : (
        <ScrollView>
          <Modal
            isVisible={this.state.isModalVisible}>
            <View style={styles.modalContainer}>

              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Subtask</Text>
              </View>
              <View style={styles.modalBody}>
                <TextInput
                  autoFocus
                  onChangeText={(subTaskName) => this.setState({ subTaskName })}
                  value={this.state.subTaskName}
                  style={styles.modalTextInput}
                  placeholder="Subtask name" />
                  <TextInput
                    autoFocus
                    onChangeText={(subTaskDesc) => this.setState({ subTaskDesc })}
                    value={this.state.subTaskDesc}
                    style={styles.modalTextInput}
                    placeholder="Description" />
              </View>

              <View style={styles.modalTabs}>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.toggleModal}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.addSubTask.bind(this)}>
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={formsStyle.formContainer}>
            <TaskTitleLabel
              editTitle={this.state.editTitle}
              task_name={this.state.task_name}
              onChangeTaskName={(task_name) => {
                this.setState({ task_name });
              }}
              onBack={() => {
                this.setState({ editTitle: false });
              }}
              onClick={() => {
                this.setState({ editTitle: true });
              }}
            />
            <DescLabel
              editDesc={this.state.editDesc}
              description={this.state.task_desc}
              onChangeDesc={(task_desc) => {
                this.setState({ task_desc });
              }}
              onBackDesc={() => {
                this.setState({ editDesc: false });
              }}
              onClickDesc={() => {
                this.setState({ editDesc: true });
              }}
            />
            <DateCreatedLabel created_at={this.state.date_created} />
            <DueDateLabel editDue={this.state.editDue} task_dueDate={this.state.task_dueDate}
              present_date={this.state.present_date} editDue={this.state.editDue}
              updateEditDue={() => {
                this.setState({ editDue: false });
              }}
              setDueDate={task_dueDate => {
                this.setState({ task_dueDate: task_dueDate, editDue: false });
              }}
              editDueDate={() => this.setState({ editDue: true })} />
            <AddSubTaskButton addSubTask={this.toggleModal} />
          </View>
          {SubTasks}
        </ScrollView>
      );
  }
}

export default ViewTaskScreen;


// TASKNAME
// {this.state.editTitle ? (
//   <TextInput
//     style={formsStyle.textInput}
//     placeholder="Title"
//     autoFocus
//     onChangeText={task_name => this.setState({ task_name })}
//     value={this.state.task_name}
//     onBlur={() => this.setState({ editTitle: false })}
//   />
// ) : (
//     <Text
//       onPress={() => this.setState({ editTitle: true })}
//       style={formsStyle.textHeader}
//     >
//       {this.state.task_name}
//     </Text>
//   )}

// DESCRIPTION
// {this.state.editDesc ? (
//   <TextInput
//     style={formsStyle.textInputChildren}
//     placeholder="Description"
//     autoFocus
//     onChangeText={task_desc => this.setState({ task_desc })}
//     value={this.state.task_desc}
//     onBlur={() => this.setState({ editDesc: false })}
//   />
// ) : (
//     <Text
//       onPress={() => this.setState({ editDesc: true })}
//       style={formsStyle.textSub}
//     >
//       {this.state.task_desc != ""
//         ? this.state.task_desc
//         : "no description"}
//     </Text>
//   )}

// DUE DATE
// {this.state.editDue ? (
//   <DueDateLabel task_dueDate={this.state.task_dueDate}
//     present_date={this.state.present_date} editDue={this.state.editDue}
//     updateEditDue={() => {
//       this.setState({ editDue: false });
//     }}
//     setDueDate={task_dueDate => {
//       this.setState({ task_dueDate: task_dueDate, editDue: false });
//     }} />
// ) : (
//     <Text onPress={() => this.setState({ editDue: true })}>
//       {this.state.task_dueDate}
//     </Text>
//   )}