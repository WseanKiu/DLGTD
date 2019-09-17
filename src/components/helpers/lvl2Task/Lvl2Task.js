import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Lvl2Task extends Component {
    render() {
        return (
            <TouchableOpacity style={styles.noteContainer}>
                <TouchableOpacity
                    onPress={this.props.checkSubtask}
                    style={styles.cont_box1}>
                    <Icon name={this.props.val.status == 'finished' ?
                        'md-checkbox-outline' : 'md-square-outline'} size={25} />
                </TouchableOpacity>
                <View style={styles.cont_textbox}>
                    <Text style={[styles.noteHeader, this.props.val.status == 'finished' ? { textDecorationLine: "line-through" } : null]}>{this.props.val.sst_name}</Text>
                </View>
                {
                    this.props.creator ?
                        <View style={styles.cont_box2}>
                            <TouchableOpacity onPress={this.props.deleteSubTask}>
                                <Icon style={{ marginRight: 10 }} name="md-close" size={25} />
                            </TouchableOpacity>
                        </View>
                        : null
                }
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    noteContainer: {
        flex: 1,
        // width: '1%',
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#ffffff',
    },
    cont_box1: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        width: 50
    },
    cont_textbox: {
        flex: 5,
        // width: 100,
        alignSelf: 'stretch'
    },
    cont_box2: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        flex: 1
        // width: 50
    },
    noteHeader: {
        fontSize: 20,
        // textDecorationLine: 'line-through'
    },
    noteText: {
        fontSize: 14,
    },
    dueDateBadge: {
        // position: 'absolute',
        // justifyContent: 'center',
        alignSelf: 'flex-start',
    },
    dueDateStyle: {
        backgroundColor: '#e67e22',
        color: '#fff',
        fontSize: 11,
        borderRadius: 40,
        paddingLeft: 4,
        paddingRight: 4,
        marginTop: 3,
        marginBottom: 3,
    },
    note: {
        position: 'relative',
        padding: 10,
        paddingRight: 10,
        paddingLeft: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
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