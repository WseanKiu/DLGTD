import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';
import { Badge, Slider } from 'react-native-elements';
import Bar from "react-native-progress/Bar";

export default class GroupSubTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            value: ""
        }
    }

    longPressListener = () => {
        alert('long pressed!');
        // this.props.editSubTask;
    }

    render() {
        return (
            <TouchableOpacity key={this.props.keyval} style={styles.note}
                onLongPress={this.props.editSubTask} activeOpacity={0.6}>
                <Text style={styles.noteHeader}>{this.props.val.subtask_name}</Text>
                <Text style={styles.noteText}>{this.props.val.subtask_desc}</Text>

                {this.props.val.due_date ? 
                <View style={styles.dueDateBadge}>
                    <Badge value={this.props.val.due_date} status='primary'/>
                </View>
                : null }

                {this.props.val.user_id == this.props.user_id ?
                <Slider
                    value={this.state.progress}
                    onValueChange={(value) => this.setState({ progress: value})} 
                /> : 
                <Bar style={{marginTop: 10}}progress={0.3} width={null} />
                }
                <Text>progress: {this.state.progress}</Text>
                



                {/* <TouchableOpacity style={styles.noteDelete}>
                    <Text style={styles.noteDeleteText}>D</Text>
                </TouchableOpacity> */}
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
    dueDateBadge: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        right: 10,
    }
});
