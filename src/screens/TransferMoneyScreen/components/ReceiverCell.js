import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const ReceiverCell = ({account}) => {
    return(
        <View style={styles.cellStyle}>
            <View style = {styles.accountNameContainerStyle}>
                <Text style = {styles.nameStyle}>{account.name}</Text>
                <Text style = {styles.bankStyle}>{account.bank}</Text>
            </View>
            <View style = {styles.accountNumberContainerStyle}>
                <Text style = {styles.accountStyle}>{account.accountNumber}</Text>
                <TouchableOpacity>
                    <Text style={styles.buttonStyle}>EDIT</Text>
                </TouchableOpacity>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    cellStyle: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 18.0,
        paddingRight: 18.0,
        height: 72.0,
        borderBottomColor: '#EFF3F9',
        borderBottomWidth: 1.0
    },
    nameStyle: {
        color: '#77869E',
        fontSize: 13.0
    },
    bankStyle: {
        color: '#003D6F',
        fontSize: 16.0
    }, 
    accountStyle:{
        color: '#003D6F',
        fontSize: 16.0,
        alignSelf: 'flex-end'
    },
    buttonStyle:{
        color: '#F9A010',
        alignSelf: "flex-end",
        top: 5
    },
    subContainerStyle: {
        flex: 1,
        flexDirection: 'column'
    },
    accountNameContainerStyle: {
        flex: 2,
        flexDirection: 'column'
    },
    accountNumberContainerStyle: {
        flex: 1,
        flexDirection: 'column'
    }
});

export default ReceiverCell;