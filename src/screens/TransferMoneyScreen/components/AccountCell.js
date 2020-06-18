import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const AccountCell = ({data: {label, accountName, bank, accountNumber, isFromAccount}}) => {
    return(
        <View style = {styles.containerStyle}>
            <View style={styles.labelContainerStyle}>
                <View style = {styles.spacer}></View>
                <Text style = {styles.labelStyle}>{label}</Text>
            </View>
            <View style = {styles.accountContainerStyle}>
                <View style = {styles.spacer}></View>
                <Text style = {styles.accountNameStyle}>{accountName}</Text>
                <Text style = {styles.bankAndAccountNumberStyle}>{bank}</Text>
                <Text style = {styles.bankAndAccountNumberStyle}>{accountNumber}</Text>
            </View>
            <View style = {styles.editContainerStyle}>
                {isFromAccount 
                    ? <TouchableOpacity><Text style = {styles.editStyle}>EDIT</Text></TouchableOpacity>
                    : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    spacer: {
        margin: 10.0
    },
    editStyle: {
        color: '#F9A010'
    },
    containerStyle: {
        flexDirection: 'row',
        height: 107.0,
        padding: 20.0,
        borderBottomColor: '#eff3f9',
        borderBottomWidth: 1.0
    },
    labelContainerStyle: {
        flex: 3
    },
    accountContainerStyle: {
        flex: 4,
    },
    editContainerStyle: {
        flex: 0.75
    },
    labelStyle: {
        fontSize: 12.0,
        color: '#444444'
    },
    accountNameStyle: {
        fontSize: 16.0,
        color: '#003D6F',
        marginBottom: 5.0
    },
    bankAndAccountNumberStyle: {
        fontSize: 14.0,
        color: '#444444',
        marginBottom: 5.0
    }
});

export default AccountCell;