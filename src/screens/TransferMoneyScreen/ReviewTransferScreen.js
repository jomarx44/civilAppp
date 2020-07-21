import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AccountCell from './components/AccountCell';
import TransferDataCell from './components/TransferDataCell';

const ReviewTransferScreen = () => {
    //label, accountName, bank, accountNumber
    const fromAccount = {label: 'From Account', 
                            accountName: 'Anne Dominguez', 
                            bank: 'Sun Savings Bank',
                            accountNumber: '**** **** 9473',
                            isFromAccount: true
                        };
    const toAccount = {label: 'From Account', 
                        accountName: 'Anne Dominguez', 
                        bank: 'Sun Savings Bank',
                        accountNumber: '**** **** 9473',
                        isFromAccount: false
                    };
    return (
        <View style= {{backgroundColor: '#eff3f9'}}>
            <View style = {styles.containerStyle}>
            <AccountCell data = {fromAccount}/>
            <AccountCell data = {toAccount}/>
            <TransferDataCell label = 'Amount' data='PHP 2000.00'/>
            <TransferDataCell label = 'Date' data='3 June 2020'/>
            <TransferDataCell label = 'Message' data='Payment for Rent'/>
            </View>
            <TouchableOpacity style = {styles.buttonStyle}>
                <Text style = {styles.transferTextStyle}>TRANSFER</Text>
            </TouchableOpacity>
        </View>
    );
        
        
};

const styles = StyleSheet.create({
    containerStyle:{
        borderRadius: 10.0,
        marginLeft: 24.0,
        marginRight: 24.0,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,  
        elevation: 5,
    },
    buttonStyle: {
        backgroundColor: '#f5ac14',
        margin: 24.0,
        alignItems: 'center',
        height: 50.0,
        borderRadius: 4.0,
        justifyContent: 'center'
    },
    transferTextStyle: {
        fontSize: 18.0,
        color: 'white'
    }
});

export default ReviewTransferScreen;