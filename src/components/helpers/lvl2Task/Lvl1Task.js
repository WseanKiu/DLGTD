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

export default class Lvl1Task extends Component {
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
            // <TouchableOpacity key={this.props.keyval} style={styles.card}
            <TouchableOpacity key={this.props.keyval} style={styles.card}
                onPress={() => this.props.navigation.navigate('ViewLvl2Task', { subtask_id: this.props.val.subtask_id, creator: this.props.creator })}
                onLongPress={this.props.creator ? this.props.editSubTask : null} activeOpacity={0.6}>
                {
                    this.props.val.total_progress == 0?
                    <TouchableOpacity
                        onPress={this.props.checkTask}
                        style={{ paddingTop: 5, paddingLeft: 10 }}>
                        <Icon name={this.props.val.status == 'finished'?
                            "md-checkmark-circle-outline"
                            :"md-radio-button-off"} size={25}/>
                    </TouchableOpacity> : null
                }
                <View style={styles.cardContent}>
                    
                    <Text style={styles.description}>{this.props.val.subtask_name}</Text>
                    {this.props.val.subtask_desc != ''? 
                    <Text style={styles.description}>{this.props.val.subtask_desc}</Text>
                    : null    
                    }
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
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Icon style={{ marginRight: 5 }} name="md-person" size={16} />
                                <Text style={{ fontSize: 14 }}>{this.props.val.assigned_to}</Text>
                            </View>
                            : null
                    }

                    {/* {this.props.val.user_id == this.props.user_id ?
                        <View>
                            <Slider
                                onSlidingComplete={this.props.updateProgress}
                                value={parseFloat(this.props.val.progress)}
                                onValueChange={(value) => this.setState({ progress: value })}
                            />
                        </View> :
                        <Bar style={{ marginVertical: 10 }} progress={this.props.val.progress} width={null} />
                    } */}
                    {
                        this.props.val.total_progress > 0?
                        <Bar style={{ marginTop: 10 }} progress={this.props.val.progress/this.props.val.total_progress} width={null} />
                        : null
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
                </View>

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
        top: 5,
        right: -10,
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
    },
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: "#eeeeee"
    },
    tasks: {
        flex: 1,
    },
    cardContent: {
        paddingTop: 5,
        marginRight: 10,
        marginLeft: 15,
        flex: 1
    },
    image: {
        width: 25,
        height: 25,
    },

    card: {
        // shadowColor: '#00000021',
        // shadowOffset: {
        //     width: 0,
        //     height: 6,
        // },
        // shadowOpacity: 0.37,
        // shadowRadius: 7.49,
        // elevation: 12,
        alignItems: 'center',
        marginVertical: 5,
        paddingBottom: 15,
        marginHorizontal: 10,
        backgroundColor: "#fff",
        padding: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderLeftColor: '#e91e63',
        borderLeftWidth: 6,
    },

    description: {
        fontSize: 18,
        flex: 1,
        color: "#008080",
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,
        flex: 1,
        color: "#696969",
        marginTop: 5
    },
});
