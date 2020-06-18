import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import TransferMoneyCell from './components/TransferMoneyCell';

const TransferMoneyScreen = () => {
    return (
        <View style = {styles.backgroundStyle}>
            <TransferMoneyCell title = 'Sun Saving Bank Account'/>
            <TransferMoneyCell title = 'Other Banks'/>

            <Text style={styles.manageLabelStyle}>Manage</Text>
            <TransferMoneyCell title = 'Manage Saved Receiver'/>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: '#F7F7F7',
        margin: 24.0, 
        marginTop: 40.0, 
        flex: 1
    },
    manageLabelStyle: {
        color: '#ADBED0',
        marginTop: 50.0,
        marginBottom: 15.0
    }
});

export default TransferMoneyScreen;