import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const TransferDataCell = ({label, data}) => {
    return (
        <View style= {styles.containerStyle}>
            <Text style = {styles.labelStyle}>{label}</Text>
            <Text style = {styles.valueStyle}>{data}</Text>
            <View style = {styles.editContainerStyle}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        height: 55.0,
        padding: 10.0,
        flexDirection: 'row',
        padding: 18.0,
        borderBottomColor: '#eff3f9',
        borderBottomWidth: 1.0
    },
    labelStyle:{
        flex: 3,
        fontSize: 12.0,
        color: '#444444',
        fontFamily: "Gilroy_Medium"
    },
    valueStyle:{
        flex: 4,
        fontSize: 16.0,
        color: '#003D6F',
        fontFamily: "Gilroy_Medium"
    },
    editContainerStyle: {
        flex: 0.75
    }
});

export default TransferDataCell;