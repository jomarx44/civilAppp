import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import BankDetailsForm from './components/BankDetailsForm';

const TransferSunAccountScreen = ({sunSavingsValue}) => {
    return(
        <View style = {styles.viewStyle}>
            <View style = {{flex: 1}}>
                <BankDetailsForm isSunsavings = {sunSavingsValue}/>
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
        flex: 1
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

export default TransferSunAccountScreen;