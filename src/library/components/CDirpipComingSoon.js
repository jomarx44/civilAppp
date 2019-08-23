import React, { Component } from 'react';
import StringsMain from 'res/strings/main.js';
import ColorMain from 'res/color/main.js';
import NavigationService from "navigation/NavigationService.js";
import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, ScrollView} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
class CDirpipComingSoon extends Component {

  render() {
    // props must be passed
    let {height, width} = Dimensions.get('window');
    height = height - (height * 0.1);

    return (
        <View style={{ height: height}}>
          <Image 
            source={this.props.headerImage} style={{ width: width, height: height * 0.3}} />

          <View style={[styles.TitleView, {height: height * 0.1}]}>
            <View>
              <Image 
                source={this.props.titleImage} />
            </View>
            <View>
              <Text allowFontScaling={false} style={styles.TitleText}>{this.props.title}</Text>
            </View>
          </View>

          <View>
          <ScrollView style={[styles.scrollView, { width: width - 76 }]}>
            <Text allowFontScaling={false} style={styles.scrollViewText}>{this.props.description}</Text>
          </ScrollView>
          </View>

          <View style={[styles.commingSoon, { width: width - 76, bottom: 120, position: 'absolute'}]}>
            <Text allowFontScaling={false} style={{ color: '#FA8043', fontSize: 25, fontWeight: 'bold' }}>COMING SOON</Text>
          </View>
        </View>
    );
  }
}

let styles = StyleSheet.create({
 buttonImage: {
   alignSelf: 'center',
   marginBottom: 10,
 },
 button: {
  alignItems: 'center',
 },
 buttonText: {
   alignSelf: 'center',
   textAlign: 'center'
 },
 bottom : {
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center' ,
   alignSelf: 'center' ,
   justifyContent: 'space-between',
   bottom: 36 ,
   position: 'absolute'

 },
 TitleText : {
   color: '#FA8043',
   fontSize: 18,
   fontWeight: 'bold',
   marginTop: 20,
   marginLeft: 10,
 },
 scrollView : {
   marginLeft: 38,
   marginTop: 0,
 },
 commingSoon : {
    marginLeft: 38,
    marginTop: 0,
    fontSize: 25, 
    justifyContent: 'center', 
    alignItems: 'center',
 },

 scrollViewText : {
   fontSize: 14,
   color: '#7D7D7D'
 },
 TitleView : {
   marginLeft: 48,
   marginTop: 10,
   flexDirection: 'row',
   justifyContent: 'flex-start',
 },
   iconMenuStyle: {
    flex: 1,
    alignItems: 'center' ,
    justifyContent: 'center',
  }

});




export default CDirpipComingSoon;
