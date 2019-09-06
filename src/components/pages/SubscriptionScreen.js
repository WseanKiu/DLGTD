// import React, { Component } from "react";
// import {
//   ActivityIndicator,
//   View,
//   Text,
//   Modal,
//   WebView,
//   StyleSheet,
//   ScrollView,
//   AsyncStorage,
//   TouchableOpacity
// } from "react-native";
// import DatePicker from "react-native-datepicker";

// class SubscriptionScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       server_ip: "",
//       user_id: "",
//       isLoading: false,
//       present_date: "",
//       showModal: false,
//       status: "Pending"
//     };
//     this._getAsyncData();
//   }

//   static navigationOptions = {
//     title: "Subscription"
//   };

//   componentDidMount() {
//     var day = new Date();
//     var temp =
//       day.getFullYear() +
//       "-" +
//       (day.getMonth() + 1) +
//       "-" +
//       day.getDate() +
//       " " +
//       day.getHours() +
//       ":" +
//       day.getMinutes();
//     this.setState({ present_date: temp });
//   }

//   _getAsyncData = async () => {
//     const server_ip = await AsyncStorage.getItem("server_ip");
//     const user_id = await AsyncStorage.getItem("user_id");
//     this.setState({ server_ip: server_ip, user_id: user_id });
//   };

//   handleResponse = data => {
//     if (data.title === "success") {
//         this.setState({ showModal: false, status: "Complete" });
//     } else if (data.title === "cancel") {
//         this.setState({ showModal: false, status: "Cancelled" });
//     } else {
//         return;
//     }
// };

//   render() {
//     return this.state.isLoading ? (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator size="large" color="#000000" animating />
//       </View>
//     ) : (
//         <ScrollView>
//           <View style={styles.container}>
//             <View style={{ marginTop: 100 }}>
//               <Modal
//                 visible={this.state.showModal}
//                 onRequestClose={() => this.setState({ showModal: false })}
//               >
//                 <WebView
//                   source={{ uri: "http://"+this.state.server_ip+":3000" }}
//                   onNavigationStateChange={data =>
//                     this.handleResponse(data)
//                   }
//                   injectedJavaScript={`document.f1.submit()`}
//                 />
//               </Modal>
//               <TouchableOpacity
//                 style={{ width: 300, height: 100 }}
//                 onPress={() => this.setState({ showModal: true })}
//               >
//                 <Text>Pay with Paypal</Text>
//               </TouchableOpacity>
//               <Text>Payment Status: {this.state.status}</Text>
//             </View>
//           </View>
//         </ScrollView>
//       );
//   }
// }

// export default SubscriptionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     // padding: 30
//   }
// });