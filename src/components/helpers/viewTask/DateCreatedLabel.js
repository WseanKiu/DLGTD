import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import moment from "moment";
import formsStyle from '../../styles/formsStyle';

class DateCreatedLabel extends React.Component {
    render() {
        const created_at = moment(this.props.created_at).format("MMMM D, YYYY");
        return (
            <View>
                <Text style={formsStyle.textLabel}>Date Created: {created_at}</Text>
            </View>
        );
    }
}

export default DateCreatedLabel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    }
})