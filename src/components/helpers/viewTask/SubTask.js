import React, {Component} from 'react';
import {
    StyleSheet, 
    Text, 
    View,
    TouchableOpacity
} from 'react-native';

export default class SubTask extends Component{
    longPressListener = () => {
        alert('long pressed!');
        this.props.editSubTask;
    }
    render() {
        return (
            <TouchableOpacity key={this.props.keyval} style={styles.note}
                onLongPress={this.longPressListener} activeOpacity={0.6}>
                <Text style={styles.noteHeader}>{this.props.val.subtask_name}</Text>
                <Text style={styles.noteText}>{this.props.val.subtask_desc}</Text>
                <TouchableOpacity onPress={this.props.deleteMethod} style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    note: {
        position: 'relative',
        padding: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    noteHeader: {
        fontSize: 20,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    noteText: {
        fontSize: 14,
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2980b9',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,
    },
    noteDeleteText: {
        color: 'white',
    },
});
