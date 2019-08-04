import React from 'react';
import { 
    Text,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles/style';

class AddSubTaskButton extends React.Component {
    render() {
        return (
            <TouchableOpacity 
            onPress={this.props.addSubTask}
            style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        );
    }
}

export default AddSubTaskButton;