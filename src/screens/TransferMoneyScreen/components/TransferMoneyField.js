import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Input } from 'react-native-elements';

const TransferMoneyField = ({fieldName}) => {
    return (
        <View>
            <Input 
                style = {styles.inputStyle} 
                color = '#F9A010'
                label = {fieldName}
                labelStyle = {styles.titleLabelStyle}
                autoCapitalize = "none"
                autoCorrect = {false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        borderBottomWidth: 1.0,
        borderBottomColor: '#F0F0F0',
        backgroundColor: 'white'
    },
    titleLabelStyle: {
        fontSize: 18.0,
        color: '#5D646C',
        fontFamily: 'Gilroy_Medium'
    },
    inputStyle: {
        fontSize: 18.0,
        fontFamily: 'Gilroy_Medium'
    }
});

export default TransferMoneyField;