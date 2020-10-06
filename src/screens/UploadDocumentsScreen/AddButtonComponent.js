import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const AddButtonComponent = () => {
    return (
        <View style = {styles.outerView}>
            <View style = {styles.innerView}>
                <Entypo name = "plus" style = {styles.plusStyle}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    outerView:{
        borderStyle: 'dashed',
        borderRadius: 70.0/2.0,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        width: 70.0,
        height: 70.0,
        backgroundColor: '#0061F3',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerView:{
        backgroundColor: '#FFFFFF',
        width: 52.0,
        height: 52.0,
        borderRadius: 52.0/2.0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    plusStyle:{
        flex: 1,
        color: '#0061F3', 
        fontSize: 50.0
    }
});

export default AddButtonComponent;