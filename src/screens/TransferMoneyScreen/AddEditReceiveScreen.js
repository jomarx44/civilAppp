import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AddEditForm from './components/AddEditForm';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddEditReceiverScreen = () => {
    return(
        <View style = {styles.viewStyle}>
            <View style = {{flex: 1}}>
                <AddEditForm />
            </View>
            <TouchableOpacity style = {styles.buttonStyle}>
                <Text style = {styles.buttonLabelStyle}>SAVE</Text>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
    viewStyle:{
        backgroundColor: 'white', 
        flex: 1,
        marginBottom: 40.0
    },
    buttonStyle: {
        backgroundColor: '#F5AC14',
        marginLeft: 29.0,
        marginRight: 29.0,
        height: 50.0,
        borderRadius: 4.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonLabelStyle: {
        color: 'white',
        alignSelf: 'center',
        fontSize: 18.0
    }
});

export default AddEditReceiverScreen;