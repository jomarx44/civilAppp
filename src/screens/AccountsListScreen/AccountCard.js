import {LinearGradient} from 'expo-linear-gradient';
import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const AccountCard = ({account, color1, color2}) => {
    console.log(account.balance)
    return(
        <LinearGradient
            start = {{x: 0.05, y: 0.8}}
            end={{x: 0.1, y: 1.0}}
            locations={[0,0.3]}
            colors={[color1, color2]}
            style={styles.linearGradient}
            useAngle={true}
            angleCenter = {{x:0.5, y: 0.5}} 
            angle = {90.0}
        >
            <Text style={styles.balanceLabelStyle}>Available Balance</Text>
            <Text style={styles.balanceValue}>{account.balance}</Text>
            <View style = {styles.numberContainerStyle}>
                <Text style={styles.cardNumberStyle}>0287</Text>
                <Text style={styles.cardNumberStyle}>0869</Text>
                <Text style={styles.cardNumberStyle}>1233</Text>
                <Text style={styles.cardNumberStyle}>1289</Text>
            </View>
            <Text style = {styles.cardHolderLabelStyle}>CARD HOLDER</Text>
            <Text style = {styles.cardHolderStyle}>{account.cardHolder}</Text>


        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    linearGradient:{
        flex: 1,
        paddingRight: 30.0,
        borderRadius: 10.0,
        marginBottom: 10.0,
        height: 202.0
    },
    balanceLabelStyle:{
        color: '#D3DDE5',
        fontSize: 11.0,
        marginLeft: 30.0,
        marginTop: 29.0
    },
    balanceValue: {
        color: 'white',
        fontSize: 30.0,
        marginTop: 5.0,
        marginLeft: 30.0
    },
    cardNumberStyle:{
        color: 'white',
        fontSize: 20.0,
        flex: 1,
        marginTop: 25.0
    },
    numberContainerStyle:{
        flexDirection: 'row',
        marginLeft: 30.0,
    },
    cardHolderLabelStyle:{
        fontSize: 11.0,
        color: 'white',
        marginTop: 10.0,
        marginLeft: 30.0
    },
    cardHolderStyle:{
        fontSize: 16.0,
        color: 'white',
        marginTop: 4.0,
        marginLeft: 30.0
    }
});

export default AccountCard;