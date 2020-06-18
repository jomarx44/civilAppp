import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Entypo } from '@expo/vector-icons'; 


const TransferMoneyCell = ({title}) => {
    return (
        <View style = {styles.containerStyle}>
                <Text style = {styles.titleStyle}>{title}</Text>
                <Entypo name="chevron-small-right" size={24} color="#dddddd" style = {styles.chevronStyle}/>
            
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'white',
        borderRadius: 10.0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,  
        elevation: 5,
        flexDirection: 'row',
        height: 56.0,
        alignItems: 'center',
        padding: 15.0,
        marginBottom: 15.0
    },
    titleStyle: {
        fontSize: 16.0, 
        flex: 1,
        color: '#003D6F'
    },
    chevronStyle: {
    }
});

export default TransferMoneyCell;
