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
import Icon_2 from "react-native-vector-icons/MaterialCommunityIcons";
import { Badge } from 'react-native-elements';
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
      ip_server: "",
      user_id: "",
      user_code: "",
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
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            {/* <Badge value="2" status='primary' /> */}
            <Icon style={styles.navItem} name="notifications" size={27} />
            {/* <Badge
              status="error"
              value="5"
              containerStyle={{ position: 'absolute', top: -4, right: 9 }}
            /> */}
          </TouchableOpacity>
          {/* <TouchableOpacity>
            <Icon style={styles.navItem} name="account-circle" size={25} />
          </TouchableOpacity> */}
        </View>
      )
    };
  };

  componentWillMount() {
    this._getAsyncData();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
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
          user_id: this.state.user_id
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
          // alert(error + url);
        });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.setState({
      username: null,
      taskContainer: [],
      isLoading: true,
      ip_server: "",
      user_id: "",
    });
  }

  renderItem = ({ item }) => {
    const task_id = item.task_id;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.navigation.navigate("ViewTask", { task_id: task_id, server_ip: this.state.ip_server });
        }}
        style={{
          flex: 1,
          paddingTop: 10,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 10,

          // shadowColor: '#00000021',
          // shadowOffset: {
          //   width: 0,
          //   height: 6,
          // },
          // shadowOpacity: 0.37,
          // shadowRadius: 7.49,
          // elevation: 12,

          marginLeft: 20,
          marginRight: 20,
          // marginTop:-10,
          marginVertical: 5,
          backgroundColor: "white",
          // padding: 0,
          flexDirection: 'row',
          borderRadius: 10,
        }}
      >
        <View style={{ flex: 1, alignContent: "center" }}>
          <View style={{ flexDirection: 'row', alignContent: 'center' }}>
            {item.task_status == 'prioritize' ? <Icon name="star" size={25} color="#f1c40f" /> : null}
            <Text style={{
              fontSize: 18,
              flex: 1,
              alignSelf: 'center',
              color: "green",
              fontWeight: 'bold'
            }}>{item.title}</Text>
          </View>
          {item.desc != "" ? (
            <Text>{item.desc}</Text>
          ) : (
              <Text>no description</Text>
            )}

          {item.due_date ?
            <View style={{ flexDirection: 'row' }}>
              <Icon_2 name="calendar-clock" size={18} color="#e74c3c" />
              <Text style={{ fontSize: 10, paddingLeft: 5, alignSelf: 'center', paddingBottom: 10 }}>{item.due_date}</Text>
              {/* <Badge value={item.due_date} status='primary' /> */}
            </View>
            : null}

          {
            item.total_progress > 0 ?
              <Bar progress={item.progress / item.total_progress} width={null} />
              : null
          }
        </View>
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
    const user_id = await AsyncStorage.getItem("user_id");
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_code = await AsyncStorage.getItem("user_code");
    this.setState({
      ip_server: server_ip,
      user_id: user_id,
      user_code: user_code
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
        <View style={[styles.container, {}]}>
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
