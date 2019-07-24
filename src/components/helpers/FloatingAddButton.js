import React from 'react';
import { 
    Text,
    TouchableOpacity
} from 'react-native';
import styles from '../styles/style';

class FloatingAddButton extends React.Component {
    render() {
        return (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('AddTask')}
            style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        );
    }
}

export default FloatingAddButton;