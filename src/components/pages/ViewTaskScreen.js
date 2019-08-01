import React from "react";
import {
  View,
  Text,
  AsyncStorage,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import Icon from "react-native-vector-icons/MaterialIcons";
import formsStyle from "../styles/formsStyle";
import styles from "../styles/style";

class ViewTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      ip_server: "",
      taskContainer: [],
      task_name: "",
      editTitle: false,
      task_desc: "",
      editDesc: false,
      task_dueDate: "",
      editDue: false,
      present_date: ""
    };
    this._getAsyncData();
  }

  componentDidMount() {
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

    setTimeout(() => {
      const url =
        "http://" +
        this.state.ip_server +
        "/dlgtd/controller/viewTaskController.php";
      fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          user_id: 4,
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
            task_dueDate: responseJson.items[0].due_date
          });
        })
        .catch(error => {
          alert(error + url);
        });
    }, 1000);
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
    this.setState({
      ip_server: server_ip
    });
  };

  render() {
    const { navigation } = this.props;
    const task_id = navigation.getParam("task_id", "no ID, no entry!");
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="tomato" animating />
      </View>
    ) : (
      <ScrollView>
        <View style={formsStyle.formContainer}>
          {this.state.editTitle ? (
            <TextInput
              style={formsStyle.textInput}
              placeholder="Title"
              autoFocus
              onChangeText={task_name => this.setState({ task_name })}
              value={this.state.task_name}
              onBlur={() => this.setState({ editTitle: false })}
            />
          ) : (
            <Text
              onPress={() => this.setState({ editTitle: true })}
              style={formsStyle.textHeader}
            >
              {this.state.task_name}
            </Text>
          )}
          {this.state.editDesc ? (
            <TextInput
              style={formsStyle.textInputChildren}
              placeholder="Description"
              autoFocus
              onChangeText={task_desc => this.setState({ task_desc })}
              value={this.state.task_desc}
              onBlur={() => this.setState({ editDesc: false })}
            />
          ) : (
            <Text
              onPress={() => this.setState({ editDesc: true })}
              style={formsStyle.textSub}
            >
              {this.state.task_desc != ""
                ? this.state.task_desc
                : "no description"}
            </Text>
          )}
          {this.state.editDue ? (
            <DatePicker
              style={{ width: 200 }}
              date={this.state.task_dueDate}
              mode="datetime"
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
              onCloseModal={() => {
                this.setState({ editDue: false });
              }}
              onDateChange={task_dueDate => {
                this.setState({ task_dueDate: task_dueDate, editDue: false });
              }}
            />
          ) : (
            <Text onPress={() => this.setState({ editDue: true })}>
              {this.state.task_dueDate}
            </Text>
          )}
        </View>
      </ScrollView>
    );
  }
}

export default ViewTaskScreen;
