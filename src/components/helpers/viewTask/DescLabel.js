import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput
} from 'react-native';
import formsStyle from '../../styles/formsStyle';

class DescLabel extends React.Component {
    render() {
        return (
            <View>
                {
                    this.props.editDesc ? (
                        <TextInput
                            style={formsStyle.textInputChildren}
                            placeholder="Description"
                            autoFocus
                            onChangeText={this.props.onChangeDesc}
                            value={this.props.description}
                            onBlur={this.props.onBackDesc}
                        />
                    ) : (
                            <Text
                                onPress={this.props.onClickDesc}
                                style={formsStyle.textSub}>
                                {this.props.description != ""
                                    ? this.props.description
                                    : "no description"}
                            </Text>
                        )
                }
            </View>
        );
    }
}

export default DescLabel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    titleStyle: {
        fontSize: 25,
    }
})