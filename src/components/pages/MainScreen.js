import React, { Component } from "react";
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
  FlatList,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/style";
import DlgtdLogo from "../../assets/logo/DlgtdLogo";
import FloatingAddButton from "../helpers/FloatingAddButton";
import Bar from "react-native-progress/Bar";

class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      taskContainer: [],
      isLoading: true,
      ip_server: ""
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon style={styles.navLeftItem} name="menu" size={25} />
        </TouchableOpacity>
      ),
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

  componentWillMount() {
    this._getAsyncData();
  }

  componentDidMount() {
    setTimeout(() => {
      const url =
        "http://" +
        this.state.ip_server +
        "/dlgtd/controller/getUserTaskController.php";
      fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          user_id: 4
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
          alert(error + url);
        });
    }, 1000);
  }

  renderItem = ({ item }) => {
    const task_id = item.task_id;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ViewTask", { task_id: task_id });
        }}
        style={{
          flex: 1,
          height: 70,
          paddingLeft: 50,
          paddingRight: 50,
          paddingTop: 5,
          paddingBottom: 5
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

  _getAsyncData = async () => {
    const userToken = await AsyncStorage.getItem("username");
    const server_ip = await AsyncStorage.getItem("server_ip");
    this.setState({
      ip_server: server_ip
    });
  };

  displaythings = () => {
    this._getAsyncData();
    // alert(this.state.username);
  };

  render() {
    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000000" animating />
      </View>
    ) : (
      <View style={styles.container}>
        <FloatingAddButton navigation={this.props.navigation} />
        <FlatList
          data={this.state.taskContainer}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </View>
    );
  }

  // render() {

  //     let tasks = this.state.taskContainer.map((val, key) => {
  //         return <TaskContainer key={key} keyval={key} val={val}
  //             viewMethod={() => this.viewTask(key)} />
  //     });

  //     return (
  //         <View style={styles.container}>
  //             <ScrollView style={styles.scrollContainer}>
  //                 {tasks}
  //             </ScrollView>
  //             <FloatingAddButton navigation={this.props.navigation} />
  //         </View>
  //     )
  // }
  viewTask(key) {
    alert("task key:" + key);
  }
}

export default MainScreen;
