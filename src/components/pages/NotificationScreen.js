import React, { Component } from "react";
import {
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "../styles/style";
import { Button } from "react-native-elements";
class NotificationScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationContainer: [],
      isLoading: true,
      ip_server: "",
      user_id: "",
      user_code: "",
    };
  }

  static navigationOptions = {
    title: "Notifications"
  };

  componentWillMount() {
    this._getAsyncData();
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const url =
        "http://" +
        this.state.ip_server +
        "/dlgtd/controller/getUserNotificationController.php";
      fetch(url, {
        method: "post",
        header: {
          Accept: "application/json",
          "Content-type": "applicantion/json"
        },
        body: JSON.stringify({
          user_code: this.state.user_code
        })
      })
        .then(response => response.json())
        .then(responseJson => {

          JSON.stringify(this.state.notificationContainer) == JSON.stringify(responseJson.items) ?
            null :
            this.setState({
              notificationContainer: responseJson.items,
              isLoading: false
            });
          responseJson = null;
        })
        .catch(error => {
          // alert(error + url);
        });
    }, 1000);
  }

  _getAsyncData = async () => {
    const user_code = await AsyncStorage.getItem("user_code");
    const server_ip = await AsyncStorage.getItem("server_ip");
    const user_id = await AsyncStorage.getItem("user_id");
    this.setState({
      ip_server: server_ip,
      user_code: user_code,
      user_id: user_id,
    });
  };

  renderSeparator = () => {
    return (
      <View
        style={{ height: 1, width: '100%',}}
      />
    );
  };

  acceptTask(task_id, subtask_id, notif_id, user_id) {
    // alert("task_id: " + task_id + "subtask_id: " + subtask_id + "notif_id: " + notif_id);
    const url =
      "http://" +
      this.state.ip_server +
      "/dlgtd/controller/acceptTaskController.php";
    fetch(url, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "applicantion/json"
      },
      body: JSON.stringify({
        task_id: task_id,
        subtask_id: subtask_id,
        user_id: this.state.user_id,
        user_code: this.state.user_code,
        notif_id: notif_id,
        notif_to: user_id
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
      });
  }

  declineTask(task_id, subtask_id, notif_id, user_id) {
    // alert(task_id+' '+subtask_id+' '+this.state.user_id+' '+this.state.user_code+' '+notif_id+' '+user_id);

    const url =
      "http://" +
      this.state.ip_server +
      "/dlgtd/controller/declineTaskController.php";
    fetch(url, {
      method: "post",
      header: {
        Accept: "application/json",
        "Content-type": "applicantion/json"
      },
      body: JSON.stringify({
        task_id: task_id,
        subtask_id: subtask_id,
        user_id: this.state.user_id,
        user_code: this.state.user_code,
        notif_id: notif_id,
        notif_to: user_id
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
      });
  }

  renderItem = ({ item }) => {
    const task_id = item.task_id;
    return (
      <TouchableOpacity
        style={styles.notifContainer}
      >
        {/* <Text style={styles.notifText}>{item.content.replace('<br/>', '\n')}</Text> */}
        <Text style={styles.notifText}>{item.content.replace(/<br>/gi, '\n')}</Text>
        {/* <Text style={styles.notifText}>{item.status}</Text> */}
        {/* <Text style={styles.notifText}>Task id: {item.task_id}</Text>
        <Text style={styles.notifText}>Subtask id: {item.subtask_id}</Text>
        <Text style={styles.notifText}>FROM: {item.user_id}</Text> */}
        { item.status == 'pending'? 
            <View style={styles.notifTabs}>
            <TouchableOpacity style={[styles.notifBtnDecline, { flex: 0.5, alignItems: 'center' }]}
              onPress={this.declineTask.bind(this, task_id, item.subtask_id, item.notif_id, item.user_id)}>
                <Text style={{color: '#fff'}}>Decline</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.notifBtnAccept, { flex: 0.5, alignItems: 'center' }]}
              onPress={this.acceptTask.bind(this, task_id, item.subtask_id, item.notif_id, item.user_id)}>
                <Text style={{color: '#fff'}}>Accept</Text>
            </TouchableOpacity>
            </View>
            : <View style={{paddingBottom: 10}}/>
        }
      </TouchableOpacity>
    );
  };
  // renderItem = ({ item }) => {
  //   const task_id = item.task_id;
  //   return (
  //     <TouchableOpacity
  //       style={styles2.notificationBox}
  //     >
  //       <Image style={styles.icon}
  //         source={{ uri: 'https://png.icons8.com/notification/ultraviolet/50/3498db' }} />
  //       <Text style={styles2.description}>{item.content}</Text>
  //       <Text style={styles2.description}>{item.status}</Text>
  //       <Text style={styles2.description}>Task id: {item.task_id}</Text>
  //       <Text style={styles2.description}>Subtask id: {item.subtask_id}</Text>
  //       <Text style={styles2.description}>FROM: {item.user_id}</Text>
  //       {item.status == 'pending' ?
  //         <View style={styles.notifTabs}>
  //           <TouchableOpacity style={[styles.notifBtnDecline, { flex: 0.5, alignItems: 'center' }]}
  //             onPress={this.declineTask.bind(this, task_id, item.subtask_id, item.notif_id, item.user_id)}>
  //             <Text style={{ color: '#fff' }}>Decline</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity style={[styles.notifBtnAccept, { flex: 0.5, alignItems: 'center' }]}
  //             onPress={this.acceptTask.bind(this, task_id, item.subtask_id, item.notif_id, item.user_id)}>
  //             <Text style={{ color: '#fff' }}>Accept</Text>
  //           </TouchableOpacity>
  //         </View>
  //         : <View style={{ paddingBottom: 10 }} />
  //       }
  //     </TouchableOpacity>
  //   );
  // };

  render() {

    return this.state.isLoading ? (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#000000" animating />
      </View>
    ) : (
        <View style={styles.notifBackground}>
          <FlatList
            data={this.state.notificationContainer}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      );
  }
}

export default NotificationScreen;

const styles2 = StyleSheet.create({
  container: {
    backgroundColor: '#DCDCDC'
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  notificationBox: {
    padding: 20,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 10,
  },
  icon: {
    width: 45,
    height: 45,
  },
  description: {
    fontSize: 18,
    color: "#3498db",
    marginLeft: 10,
  },
});
