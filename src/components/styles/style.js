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
        // alignItems: 'center',
        // alignContent: 'center',
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
        width: 50,
        height: 50,
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

    //MODAL
    modalContainer: {
        alignContent: "center",
        backgroundColor: "#fff",
        padding: 10,
        paddingBottom: 20,
        paddingTop: 20,
        borderRadius: 10,
    },
    modalHeader: {
        alignItems: "center",
    },
    modalBody: {
        paddingTop: 20,
    },
    modalTitle: {
        color: "#000",
        fontSize: 20,
        alignItems: 'center'
    },
    modalTabs: {
        paddingTop: 20,
        flexDirection: 'row',
    },
    modalTextInput: {
        borderColor: "#000",
        color: "#000",
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 23,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
    },

    // task list
    dueDateBadge: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 10,
        right: 10,
    },

    // delete
    deleteTaskButton: {
        position: 'absolute',
        top: 10,
        right: 10,
    },

    // prioritize button: 
    prioritizeButton: {
        position: 'absolute',
        top: 10,
        left: 20,   
    }
});