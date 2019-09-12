import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { Badge } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";

export default class Lvl2Task extends Component {
    longPressListener = () => {
        alert('long pressed!');
        // this.props.editSubTask;
    }
    render() {
        return (
            <TouchableOpacity key={this.props.keyval} style={styles.noteContainer}
                onLongPress={this.props.editSubTask} activeOpacity={0.6}>

                <TouchableOpacity style={styles.cont_box1} onPress={this.props.checkSubtask}>
                    <Icon name={this.props.val.status == 'on-going' ?
                        "md-square-outline" : "md-checkbox-outline"} size={25} />
                    {/* <Icon name="md-square-outline" size={25} /> */}
                </TouchableOpacity>

                <View style={styles.cont_textbox}>
                    <Text>{this.props.val.sst_name}</Text>
                    {/* <Text style={[styles.noteHeader, this.props.val.status == 'unfinished' ? null : { textDecorationLine: "line-through" }]}>{this.props.val.subtask_name}</Text>
                    {
                        this.props.val.subtask_desc != "" ?
                            <Text style={[styles.noteText, this.props.val.status == 'unfinished' ? null : { textDecorationLine: "line-through" }]}>{this.props.val.subtask_desc}</Text>
                            : null
                    }

                    {
                        this.props.val.due_date && this.props.val.status == 'unfinished' ?
                            <View style={styles.dueDateBadge}>
                                <Text style={styles.dueDateStyle}>{this.props.val.due_date}</Text>
                            </View>
                            : null
                    } */}
                </View>

                <View style={styles.cont_box2}>
                    <TouchableOpacity onPress={this.props.deleteSubTask}>
                        <Icon style={{ marginRight: 10 }} name="md-close" size={25} />
                    </TouchableOpacity>
                </View>

                {/* <TouchableOpacity style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity> */}
            </TouchableOpacity>
        );
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
        marginTop:3,
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
    // noteHeader: {
    //     fontSize: 20,
    //     paddingLeft: 20,
    //     borderLeftWidth: 10,
    //     borderLeftColor: '#e91e63',
    // },
    // noteText: {
    //     fontSize: 14,
    //     paddingLeft: 20,
    //     borderLeftWidth: 10,
    //     borderLeftColor: '#e91e63',
    // },
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


// {this.props.val.due_date ?
//     <View style={styles.dueDateBadge}>
//         {/* <Text>{this.props.val.due_date}</Text> */}
//         <Badge value={this.props.val.due_date} status='primary' />
//     </View>
//     : null}