import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class MainScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <TouchableOpacity>
                        <Image
                            source={require('../../assets/logo/yt_logo.png')}
                            style={{ width: 98, height: 22 }}
                        />
                    </TouchableOpacity>
                    <View style={styles.rightNav}>
                        <TouchableOpacity>
                            <Icon style={styles.navItem} name="search" size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Icon style={styles.navItem} name="account-circle" size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    navBar: {
      height: 55,
      backgroundColor: 'white',
      elevation: 3,
      paddingHorizontal: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    }, 
    rightNav: { 
      flexDirection: 'row'
    },
    navItem: {
      marginLeft: 25
    },
  });

