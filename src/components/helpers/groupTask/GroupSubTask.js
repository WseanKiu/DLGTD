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
import Icon from "react-native-vector-icons/Ionicons";

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
                onLongPress={this.props.creator?this.props.editSubTask:null} activeOpacity={0.6}>
                <Text style={styles.noteHeader}>{this.props.val.subtask_name}</Text>
                <Text style={styles.noteText}>{this.props.val.subtask_desc}</Text>
                {/* { alert(this.props.val.progress)} */}
                {/* {this.props.val.due_date ?
                    <View style={styles.dueDateBadge}>
                        <Badge value={this.props.val.due_date} status='primary' />
                    </View>
                    : null} */}
                {
                    this.props.val.due_date ?
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon style={{ marginRight: 5 }} name="md-calendar" size={20} />
                            <Text style={{ fontSize: 12 }}>{this.props.val.due_date}</Text>
                        </View>
                        : null
                }

                {
                    this.props.val.assigned_to ?
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Icon style={{marginRight: 5 }} name="md-person" size={16} />
                        <Text style={{ fontSize: 14 }}>{this.props.val.assigned_to}</Text>
                    </View>
                    : null
                }

                {this.props.val.user_id == this.props.user_id ?
                    <View>
                        <Slider
                            onSlidingComplete={this.props.updateProgress}
                            value={parseFloat(this.props.val.progress)}
                            onValueChange={(value) => this.setState({ progress: value })}
                        />
                        <Text>progress: {this.state.progress}</Text>
                    </View> :
                    <Bar style={{ marginTop: 10 }} progress={this.props.val.progress} width={null} />
                }
                {this.props.creator ?
                    <TouchableOpacity style={styles.taskDelete} onPress={this.props.deleteSubTask}>
                        <Icon style={{ marginRight: 10 }} name="md-close" size={25} />
                    </TouchableOpacity>
                    :
                    this.props.val.user_id == this.props.user_id ?
                        <TouchableOpacity style={styles.taskDelete} onPress={this.props.leaveTask}>
                            <Icon style={{ marginRight: 10 }} name="ios-log-out" size={25} />
                        </TouchableOpacity> : <View />
                }

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
    taskDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
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
