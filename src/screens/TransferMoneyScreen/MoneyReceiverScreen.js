import React from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import ReceiverCell from './components/ReceiverCell';

const MoneyReceiverScreen = () => {
    const accountsData = [
        {name: 'Anne Dominguez', accountNumber: '8976 9876 34', bank: 'Sun Saving Bank'}, 
        {name: 'Michael Scofield', accountNumber: '0976 7645 12', bank: 'BPI Family Savings Bank'}, 
        {name: 'Walter White', accountNumber: '2473 9187 10', bank: 'Sun Saving Bank'},
        {name: 'Luke Collins', accountNumber: '9812 6243 24', bank: 'Sun Saving Bank'}
    ];

    return (
        <View style={{flex: 1, backgroundColor: '#FAFCFF'}}>
            <AntDesign name="pluscircle" size={55.0} color='#faa00f' style = {styles.addStyle}/>
            
            <View style={styles.flatListContainerStyle}>
                <FlatList 
                        style = {styles.flatlistStyle}
                        showsVerticalScrollIndicator = {false}
                        data = {accountsData}
                        keyExtractor = {(account) => account.accountNumber}
                        renderItem = {({item}) =>{
                            return (
                                <ReceiverCell account = {item} />
                            );
                        }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    flatListContainerStyle: {
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,  
        elevation: 5,
        borderRadius: 10.0,
        marginLeft: 24.0,
        marginRight: 24.0
    },
    flatlistStyle:{
        borderRadius: 10.0,
        backgroundColor: "white",
        flexGrow: 0
    },
    addStyle:{ 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 8,  
        elevation: 5,
        position: 'absolute',
        alignSelf: "flex-end",
        bottom: 26.0,
        right: 28.0,

    },
    viewStyle:{

    }
});

export default MoneyReceiverScreen;

