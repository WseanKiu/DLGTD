import React, { Component } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    Modal,
    WebView,
    FlatList,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";

class SubscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server_ip: "",
            user_id: "",
            isLoading: true,
            present_date: "",
            showModal: false,
            status: "Pending",
            payments: [],
            price: "",
            payment_id: "",
        };
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "Subscription type(s)"
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

        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/getPaymentTypeController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
            })
        })
            .then(response => response.json())
            .then(responseJson => {
                this.setState({
                    payments: responseJson.items,
                    isLoading: false
                });
            })
            .catch(error => {
                // alert(error + url + "wew");
            });
    };

    handleResponse = data => {
        if (data.title === "success") {
            this.setState({ showModal: false, status: "Complete" });
            this.addPayment();
        } else if (data.title === "cancel") {
            this.setState({ showModal: false, status: "Cancelled" });
        } else {
            return;
        }
    };

    addPayment = () =>  {
        // alert(this.state.user_id + " " + this.state.payment_id);
        const url =
            "http://" +
            this.state.server_ip +
            "/dlgtd/controller/addPaymentController.php";
        fetch(url, {
            method: "post",
            header: {
                Accept: "application/json",
                "Content-type": "applicantion/json"
            },
            body: JSON.stringify({
                id: this.state.payment_id,
                user_id: this.state.user_id
            })
        })
            .then(response => response.json())
            .then(responseJson => {
            })
            .catch(error => {
                // alert(error + url + "wew");
            });

            this.props.navigation.navigate('ThankYou');

    }


    renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => { 
                    this.setState({
                        price: item.subscription_price,
                        showModal: true,
                        payment_id: item.id
                    })
                }}
                style={{
                    paddingHorizontal: 30,
                    paddingVertical: 10
                }}>

                <View style={{ flex: 1, alignContent: "center" }}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* <TouchableOpacity onPress={() => {this.checkDailyTask(item.id)}}>
                            <Icon_2 name={item.status == 'done' ?
                                "checkbox-marked-outline"
                                : "checkbox-blank-outline"} size={30} style={{ paddingRight: 10 }} />
                        </TouchableOpacity> */}
                        <View>
                            <Text style={{ fontWeight: '500', fontSize: 20, color: "#d35400" }}>{item.subs_type}</Text>
                            <Text style={{ fontSize: 18, color: "#008a00" }}>Months {item.subs_duration}</Text>
                        </View>
                        <Text style={{ fontSize: 25, color: "#586e75", textAlign: 'right', flex: 1 }}>USD {item.subscription_price}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    renderSeparator = () => {
        return (
            <View style={{ height: 1, backgroundColor: '#95a5a6' }} />
        );
    };

    render() {
        return this.state.isLoading ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color="#000000" animating />
            </View>
        ) : (
                <ScrollView>
                    <View style={styles.container}>
                        {/* <View style={{ marginTop: 100 }}> */}
                            <Modal
                                visible={this.state.showModal}
                                onRequestClose={() => this.setState({ showModal: false })}
                            >
                                <WebView
                                    source={{ uri: "http://" + this.state.server_ip + "/dlgtd/controller/paypalForm.html" }}
                                    onNavigationStateChange={data =>
                                        this.handleResponse(data)
                                    }
                                    injectedJavaScript={`document.getElementById('price').value="`+this.state.price+`";document.f1.submit()`}
                                />
                            </Modal>
                            {/* <TouchableOpacity
                                style={{ width: 300, height: 100 }}
                                onPress={() => this.setState({ showModal: true })}
                            >
                                <Text>Pay with Paypal</Text>
                            </TouchableOpacity>
                            <Text>Payment Status: {this.state.status}</Text> */}
                        {/* </View> */}
                        <FlatList
                            data={this.state.payments}
                            renderItem={this.renderItem}
                            keyExtractor={(item, index) => index}
                            ItemSeparatorComponent={this.renderSeparator}
                        />
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
        // padding: 30
    }
});