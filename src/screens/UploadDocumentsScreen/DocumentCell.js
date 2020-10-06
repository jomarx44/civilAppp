import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import { Feather } from '@expo/vector-icons';

const DocumentsCell = ({document}) => {
    return(
        <View style = {styles.containerStyle}>
            <View style = {styles.arrowContainer}>
                <Feather name = "arrow-up" style = {styles.arrowStyle}/>
            </View>
            <View style = {styles.detailContainerStyle}>
                <Text style = {styles.documentNameStyle}>{document.name}</Text>
                <Text style = {styles.uploadPercentStyle}>{document.percent}</Text>
                <View style = {styles.loadingBarStyle}></View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    containerStyle: {
        flexDirection: "row",
        marginBottom: 10.0,
        height: 87.0,
        alignItems: 'center',
        marginLeft: 20.0,
        marginRight: 20.0
    },
    arrowStyle: {
        color: '#1556D0',
        fontSize: 20.0
    },
    arrowContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#DFE7F5',
        borderRadius: 12.0,
        width: 59.0,
        height: 57.0
    },
    detailContainerStyle: {
        flex: 1,
        marginRight: 20.0
    },
    documentNameStyle:{
        marginTop: 5.0,
        marginLeft: 19.0,
        color: '#003D6F',
        fontFamily: "Gilroy_Bold"
    },
    uploadPercentStyle:{
        marginTop: 5.0,
        marginLeft: 19.0,
        color: '#0061F3',
        fontFamily: "Gilroy_Bold"
    },
    loadingBarStyle: {
        backgroundColor: '#0061F3',
        height: 10.0,
        marginTop: 5.0,
        marginLeft: 19.0
    }
});

export default DocumentsCell;