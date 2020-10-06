import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import AddButtonComponent from './AddButtonComponent';
import DocumentCell from './DocumentCell';


const UploadDocumentsScreen = ({navigation}) => {
    const documentsData = [
        {name: 'Document_01', percent: '70%'}, 
        {name: 'Document_02', percent: '60%'}, 
        {name: 'Document_03', percent: '90%'},
        {name: 'Document_03', percent: '90%'},
        {name: 'Document_03', percent: '90%'},
        {name: 'Document_03', percent: '90%'},
        {name: 'Document_03', percent: '90%'}
    ];

    return (
        <View style = {{margin: 24, marginTop: 40, flex: 1}}>
            <View style = {styles.uploadDocumentStyle}>
                <AddButtonComponent />
                <Text style = {styles.mainTitleStyle}>Upload Document</Text>
                <Text style = {styles.subtitleStyle}>You can upload a document by pressing
the add button.</Text>
            </View>
            <FlatList 
                    style = {styles.flatlistStyle}
                    showsVerticalScrollIndicator = {false}
                    data = {documentsData}
                    keyExtractor = {(document) => document.name}
                    renderItem = {({item}) =>{
                        return (
                            <DocumentCell document = {item} />
                        );
                    }}
            />
            
        </View>
    );
};

const styles = StyleSheet.create({
    uploadDocumentStyle:{
        borderRadius: 9,
        backgroundColor: '#0061F3',
        height: 195.0,
        alignItems: 'center',
        padding: 27
    },
    mainTitleStyle: {
        color: '#FFFFFF',
        fontSize: 20.0,
        top: 17.0,
        fontFamily: "Gilroy_Bold"
    },
    subtitleStyle: {
        color: '#FFFFFF',
        fontSize: 14.0,
        top: 9.0,
        height: 35.0,
        marginLeft: 33.0,
        marginRight: 33.0,
        marginTop: 15.0,
        textAlign: 'center',
        fontFamily: "Gilroy_Medium"
    },
    flatlistStyle: {
        marginTop: 20.0
    },
    flatlistContainer:{
        // backgroundColor: '#DDDDDD'
        
    }
});

export default UploadDocumentsScreen;