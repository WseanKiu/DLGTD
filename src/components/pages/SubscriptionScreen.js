import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  ScrollView,
  AsyncStorage,
  TouchableOpacity,
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";

class SubscriptionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      server_ip: "",
      user_id: "",
      isLoading: false,
      present_date: ""
    };
    this._getAsyncData();
  }

  static navigationOptions = {
    title: "add task"
  };

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
  }

  _getAsyncData = async () => {
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({ server_ip: server_ip, user_id: user_id });
  };

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000000" animating />
      </View>
    ) : (
        <ScrollView>
          <View style={styles.container}>
            
          </View>
        </ScrollView>
      );
  }
}

export default SubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 30
  },
  formContainer: {
    // backgroundColor: '#2f63db',
    // borderRadius: 20,
    // padding: 20,
  },
  textLabel: {
    fontSize: 15
  },
  textInput: {
    borderColor: "#3d4659",
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    marginBottom: 10
  },
  textInputChildren: {
    borderColor: "#3d4659",
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
  rowContainer: {
    flexDirection: "row",
    alignContent: "center",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10
  },
  Date_Button: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#3d4659",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginTop: 10
  }
});