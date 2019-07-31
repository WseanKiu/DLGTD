import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    formContainer: {
        flex: 1,
        alignContent: 'center',
        padding: 10,
    },
    textLabel: {
        fontSize: 15,
    },
    textHeader: {
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    textInput: {
        borderColor: '#3d4659',
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 25,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    textInputChildren: {
        borderColor: '#3d4659',
        height: 40,
        borderWidth: 1,
        borderRadius: 5,
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 10,
    },
    saveButton: {
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: '#007bff',
        borderRadius: 50,
        padding: 15,
        marginTop: 15,
    },
    saveButtonText: {
        color: '#ffffff',
        fontSize: 20,
        textAlign: 'center'
    },
});