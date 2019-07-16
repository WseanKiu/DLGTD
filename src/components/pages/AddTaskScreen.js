import React, {Component} from 'react';
import {
    View, Text, StyleSheet, TouchableOpacity
} from 'react-native';

class AddTaskScreen extends Component {
    static navigationOptions = {
        title: "add task"
    };

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.text}>Add task!</Text>
            </View>
        );
    }
}

export default AddTaskScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c0392b',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 40,
        fontWeight: 'bold',
    }
});