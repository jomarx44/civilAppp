import React from 'react';
import { View, StyleSheet } from 'react-native';
import TransferMoneyField from './TransferMoneyField';

const AddEditForm = ({isAdd}) => {
    return (
        <View style = {styles.formStyle}>
            <TransferMoneyField fieldName = 'Bank Name' />
            <TransferMoneyField fieldName = 'Account Number' />
            <TransferMoneyField fieldName = 'Account Name' />
            <TransferMoneyField fieldName = 'Email Address' />
            <TransferMoneyField fieldName = 'Mobile Number' />
        </View>
    );
};

const styles = StyleSheet.create({
    formStyle: {
        marginLeft: 29.0,
        marginRight: 29.0,
        backgroundColor: 'white'
    }
});

export default AddEditForm;