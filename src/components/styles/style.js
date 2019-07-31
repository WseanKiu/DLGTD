import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    // HEADER
    navLeftItem: {
        marginLeft: 15
    },
    rightNav: {
        flexDirection: 'row'
    },
    navItem: {
        marginRight: 15
    },

    //BODY
    container: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
    },    
    scrollContainer: {
        flex: 1,
    },

    // TASK
    taskContainer: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
    },
    taskHeader: {
        paddingLeft: 20,
        fontSize: 20,
        fontWeight: 'bold',
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63',
    },
    taskBody: {
        fontSize: 13,
    },
    // ADDBUTTON
    addButton: {
        position: 'absolute',
        zIndex: 11,
        right: 20,
        bottom: 20,
        backgroundColor: '#e91e63',
        width: 70,
        height: 70,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: '200',
    },
});