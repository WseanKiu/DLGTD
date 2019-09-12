import React from "react";
import {
  Alert,
  View,
  Text,
  AsyncStorage,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import Modal from "react-native-modal";
import DatePicker from "react-native-datepicker";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/Ionicons";
import style2 from "../styles/style";
import formsStyle from "../styles/formsStyle";
import Lvl2Task from '../helpers/groupTask/Lvl2Task';

class ViewSubtaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isModalVisible: false,
      editSubTask: false,
      ip_server: "",
      user_id: "",
      taskContainer: [],
      subtask_name: "",
      subtask_desc: "",
      date_updated: "",
      status: "",
      due_date: "",
      progress: "",
      total_progress: "",
      assigned_to: "",
      full_name: "",
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
    const url =
      "http://" +
      this.props.navigation.getParam("server_ip", "") +
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
        alert(error + url);
      });


    const url2 = "http://" +
      this.props.navigation.getParam("server_ip", "") +
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
        alert(error + url);
      });

    // alert(this.props.navigation.getParam("subtask_id", "0") + " - " +this.state.taskContainer);

    // this.hotResponseHander.bind(this);
  }

  hotResponseHander() {
    this.timer = setInterval(() => {
      const url =
        "http://" +
        this.props.navigation.getParam("server_ip", "") +
        "/dlgtd/controller/getSubTaskController.php";
      fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          task_id: this.props.navigation.getParam("subtask_id", "0")
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          JSON.stringify(this.state.date_updated) == JSON.stringify(responseJson.items[0].date_updated) ?
            null :
            this.setState({
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
          // alert(error + url);
          // alert("Please check your internet connection!");
        });

      const url2 =
        "http://" +
        this.props.navigation.getParam("server_ip", "") +
        "/dlgtd/controller/getSubTaskController.php";
      fetch(url2, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          task_id: this.props.navigation.getParam("subtask_id", "0")
        })
      })
        .then(response => response.json())
        .then(responseJson => {
          JSON.stringify(this.state.subTaskArray) == JSON.stringify(responseJson.items) ?
            null :
            this.setState({
              subTaskArray: responseJson.items,
            });
          responseJson = null;
        })
        .catch(error => {
          // alert(error + url);
          // alert("Please check your internet connection!");
        });
    }, 100);
  }

  _getAsyncData = async () => {
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({
      ip_server: server_ip,
      user_id: user_id,
    });
  };

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
      // headerRight: (
      //   <View style={styles.rightNav}>
      //     <TouchableOpacity onPress={() => navigation.navigate("AddTask")}>
      //       <Icon style={styles.navItem} name="notifications" size={25} />
      //     </TouchableOpacity>
      //   </View>
      // )
    };
  };

  render() {
    let lvl2tasks = this.state.taskContainer.map((val, key) => {
      return <Lvl2Task key={key} keyval={key} val={val} />
    });

    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="tomato" animating />
      </View>
    ) : (
        <ScrollView style={{ backgroundColor: "#ebf0f7" }}>
          <Modal
            isVisible={this.state.isModalVisible}>
            <View style={style2.modalContainer}>

              <View style={style2.modalHeader}>
                <Text style={style2.modalTitle}>Subtask</Text>
              </View>
              <View style={style2.modalBody}>
                <TextInput
                  autoFocus
                  onChangeText={(subTaskName) => this.setState({ subTaskName })}
                  value={this.state.subTaskName}
                  style={formsStyle.md_textInput_header}
                  placeholder="Subtask name" />
                <TextInput
                  onChangeText={(subTaskDesc) => this.setState({ subTaskDesc })}
                  value={this.state.subTaskDesc}
                  style={formsStyle.md_textInput_children}
                  placeholder="Description" />
                <TextInput
                  onChangeText={(subTaskAssign) => this.setState({ subTaskAssign })}
                  value={this.state.subTaskAssign}
                  style={formsStyle.md_textInput_children}
                  placeholder="Email / User code" />
              </View>

              <DatePicker
                style={{ width: 200 }}
                mode="datetime"
                date={this.state.subTaskDue}
                placeholder="Pick a date"
                format="YYYY-MM-DD HH:mm"
                minDate={this.state.present_date}
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: "absolute",
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                }}
                minuteInterval={10}
                onDateChange={subTaskDue => {
                  this.setState({ subTaskDue: subTaskDue });
                }}
              />

              <View style={style2.modalTabs}>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.toggleModal}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }}>
                {/* <TouchableOpacity style={{ flex: 0.5, alignItems: 'center' }} onPress={this.addSubTask.bind(this)}> */}
                  <Text>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <View style={styles.formContainer}>
            <Text style={styles.textHeader}>
              {this.state.subtask_name}
            </Text>
            <Text style={styles.textSub}>
              {this.state.subtask_desc != ""
                ? this.state.subtask_desc
                : "no description"}
            </Text>
            {this.state.assigned_to != "" ?
              <Text style={styles.textSub}>
                {this.state.full_name} ({this.state.assigned_to})
              </Text> :
              null}


            <TouchableOpacity style={styles.deleteTaskButton}>
              <Icon name="close" size={30} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => this.setState({ isModalVisible: true })}>
              <Icon2 name="ios-add" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
          {lvl2tasks}
        </ScrollView>
      );
  }
}

export default ViewSubtaskScreen;

const styles = StyleSheet.create({
  deleteTaskButton: {
    position: 'absolute',
    top: 10,
    right: 10,
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
  }, textSub: {
    fontSize: 18,
    marginBottom: 10,
    color: "#ffffff"
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
