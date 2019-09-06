import React, { Component } from "react";
import {
    ActivityIndicator,
    View,
    Text,
    Modal,
    WebView,
    StyleSheet,
    ScrollView,
    AsyncStorage,
    TouchableOpacity
} from "react-native";
import formsStyle from '../styles/formsStyle';

class SubscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            server_ip: "",
            user_id: "",
            user_code: "",
            isLoading: false,
        };
        this._getAsyncData();
    }

    static navigationOptions = {
        title: "Profile edit"
    };

    componentWillMount() {
        this._getAsyncData();
    }

    componentDidMount() {

    }


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


    render() {
        return (
            <ScrollView>
                <View>
                    <Text>Yow mantsanitas!</Text>
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