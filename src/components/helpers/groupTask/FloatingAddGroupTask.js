import React from 'react';
import { 
    Text,
    TouchableOpacity
} from 'react-native';
import styles from '../../styles/style';

class FLoatingAddGroupTask extends React.Component {
    render() {
        return (
            <TouchableOpacity 
            onPress={() => this.props.navigation.navigate('AddGroupTask')}
            style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
        );
    }
}

export default FLoatingAddGroupTask;