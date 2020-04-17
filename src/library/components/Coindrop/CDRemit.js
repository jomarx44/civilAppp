import React, { Component } from 'react';
import StringsMain from 'res/strings/main.js';
import ColorMain from 'res/color/main.js';
import NavigationService from "navigation/NavigationService.js";
import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, ScrollView, TouchableOpacity} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
class CDRemit extends Component {

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
          <ScrollView style={[styles.scrollView, { width: width - 76, height: height * .40 }]}>
            <Text allowFontScaling={false} style={styles.scrollViewText}>{this.props.description}</Text>
          </ScrollView>
          </View>

          <View style={[styles.bottom, {width: width * 0.7}]}>
            <View>
              <Image style={styles.buttonImage}
                source={require('res/images/ic_sendah.png')} />

                <TouchableOpacity style={[styles.button, styles.buttonActive,{width: width * 0.3}]} 
                  onPress={() => (NavigationService.navigate('CoinculatorScreen', 
                  { 
                    product: this.props.product,
                    fsp_id: "USERADMIN012",
                    product_id: "PRODUCT15371586600439",
                    service_id: "SVC0001",
                    type: "Loan",
                    url: "https://advance.ph/partner",
                    provider_image: require("res/images/Provider.png")
                  }))}
                  >
                  
                  <Text allowFontScaling={false} style={[styles.buttonText]}>APPLY</Text>

                </TouchableOpacity>
            </View>
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
  borderRadius: 6 ,
  height: 24
 },
 buttonActive:{
  backgroundColor:'#FA8043',
  borderColor: '#FA8043',
 },
 buttonText: {
   alignSelf: 'center',
   textAlign: 'center',
   color: '#ffffff',
   fontSize: 17
 },
 bottom : {
   alignItems: 'center' ,
   alignSelf: 'center',
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

 scrollViewText : {
   fontSize: 16,
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




export default CDRemit;
