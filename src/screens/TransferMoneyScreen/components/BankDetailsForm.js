import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CheckBox } from 'react-native-elements';
import TransferMoneyField from './TransferMoneyField';
import Spacer from './spacer';

const BankDetailsForm = ({isSunsavings}) => {
    return(
        <View style = {styles.formStyle}> 
        
            <View style = {{backgroundColor: 'white'}}>
                {isSunsavings 
                ? <Text style = {styles.headerStyle}>Please enter the Sun Saving Account Number.</Text>
                : <Text style = {styles.headerStyle}>Please enter Other Bank Account Number.</Text>
                }
                <Spacer style = {{backgroundColor: 'white'}}/>
                <TouchableOpacity style = {styles.receiverButtonStyle}>
                    <Text style = {styles.receiverLabelStyle}>Select a Previous Reciever</Text>
                </TouchableOpacity>

                {isSunsavings ? null : <TransferMoneyField fieldName = 'Bank Name'/>}
                <TransferMoneyField fieldName = 'Account Number' />
                {isSunsavings ? null : <TransferMoneyField fieldName = 'Account Name' />}
                <View style ={{flexDirection: 'row'}}>
                    <CheckBox 
                        title = 'Save this recipient for future transfers.' 
                        containerStyle = {styles.checkBoxContainerStyle}
                    />
                    {/* <TouchableOpacity style = {styles.checkBoxContainerStyle}></TouchableOpacity>
                    <Text style = {{marginLeft: 7.0}}>Save this recipient for future transfers.</Text> */}
                </View>
            </View>

            <Spacer />

            <View style = {{backgroundColor: 'white'}}>
                <Text style = {styles.headerStyle}>To notify the recipient, please fill in the following.</Text>
                <Spacer />
                <TransferMoneyField fieldName = 'Email Address' />
                <TransferMoneyField fieldName = 'Mobile Number' />
                <TransferMoneyField fieldName = 'Payment Description' />
            </View>
            <TouchableOpacity>
                <Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    formStyle: {
        marginLeft: 29.0,
        marginRight: 29.0,
        backgroundColor: 'white'
    },

    receiverButtonStyle: {
        padding: 10.0,
        backgroundColor: '#F0F0F0',
        marginRight: 24.0,
        height: 37.0,
        borderRadius: 18.5,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,  
        elevation: 5,
        alignSelf: 'flex-end',
        width: 211.0,
        height: 37.0
    },
    receiverLabelStyle: {
        fontSize: 14.0,
        color: '#444444',
        backgroundColor: '#F0F0F0',
        alignSelf: 'center'
    },
    checkBoxContainerStyle: {
        borderColor: 'transparent',
        backgroundColor: 'white'
    },
    checkBoxLabelStyle: {
        fontFamily: 'Gilroy_Medium',
        fontSize: 14.0,
        color: '#444444'
    },
    headerStyle: {
        fontSize: 16.0,
        color: '#5D646C',
        fontFamily: 'Gilroy_Medium'
    }
});

export default BankDetailsForm;