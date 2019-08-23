import React, { Component } from 'react';
import StringsMain from 'res/strings/main.js';
import ColorMain from 'res/color/main.js';
import NavigationService from "navigation/NavigationService.js";
import { alertBox } from 'actions/axiosCalls.js'
import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, ScrollView, TouchableOpacity} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
class CDirpip extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      products: [],
      advance: {},
      fundko: {}
    }
  }

  onPressAdvance = () => {
    if(this.state.advance.enabled){
      NavigationService.navigate('CoinculatorScreen', 
      { 
        product: this.props.product,
        fsp_id: "USERADMIN012",
        product_id: "PRODUCT15371586600439",
        service_id: "SVC0001",
        type: "Loan",
        url: "https://advance.ph/partner",
        provider_image: require("res/images/advance_img.png")
      });
    } else {
      alertBox('Sorry, Advance is currently unavailable. Please check back for further notice.');
    }
  }

  onPressFundko = () => {
    if(this.state.fundko.enabled){
      NavigationService.navigate('CoinculatorScreen', 
      { 
        product: this.props.product,
        fsp_id: "USERADMIN003",
        product_id: "PRODUCT15371586600432",
        service_id: "SVC0001",
        type: "Loan",
        url: "http://fundko-test.zennerslab.com/coindrop-offer-page",
        provider_image: require("res/images/fundko_img.png")
      });
    } else {
      alertBox('Sorry, Fundko is currently unavailable. Please check back for further notice.');
    }
  }

  componentDidUpdate(){
    if(this.state.products !== this.props.products){
      this.setState({ 
        products: this.props.products,
        advance: this.props.advance,
        fundko: this.props.fundko
      });
    }
  }

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
            <Text allowFontScaling={false} style={[styles.scrollViewText, { marginTop: 15 }]}>{this.props.description}</Text>
            <Text allowFontScaling={false} style={[styles.scrollViewText, { fontSize: 14, marginTop: 20 }]}>{this.props.description2}</Text>
          </ScrollView>
          </View>

          <View style={[styles.bottom, {width: width * 0.9}]}>
            <View style={ styles.providerView }>
              <View style={{marginTop: 10}}>
                <Image style={styles.buttonImage}
                  source={require('res/images/ic_advance.png')} />

                <Text allowFontScaling={false} style={ [styles.providerCaption, { marginBottom: 20 }] }>Short term 30-days loan.</Text>

                  <TouchableOpacity style={[styles.button, styles.buttonActive,{width: width * 0.3}]} 
                    onPress={() => this.onPressAdvance()}
                    >
                    
                    <Text allowFontScaling={false} style={[styles.buttonText]}>APPLY</Text>

                  </TouchableOpacity>
              </View>
                
            </View>
            <View style={ styles.providerView }>
              
              <View style={{marginTop: 10}}>
                <Image style={styles.buttonImage}
                  source={require('res/images/ic_fundko.png')} />
                <View style={{ justifyContent: 'center' }}>
                  <Text allowFontScaling={false} style={ [styles.providerCaption, { marginBottom: 0 }] }>Mid-term loans in 3, 6 or 9</Text>
                  <Text allowFontScaling={false} style={ styles.providerCaption }>months term period.</Text>
                </View>

                <TouchableOpacity style={[styles.button, styles.buttonActive,{width: width * 0.3}]} 
                    onPress={() => this.onPressFundko()}
                    >
                    
                    <Text allowFontScaling={false} style={[styles.buttonText]}>APPLY</Text>

                </TouchableOpacity>
              </View>
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
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  borderRadius: 6 ,
  height: 24,
  marginBottom: 10
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
   flex: 1,
   flexDirection: 'row',
   alignItems: 'center' ,
   alignSelf: 'center' ,
   justifyContent: 'space-around',
   bottom: 60,
   position: 'absolute',
   

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
  },
  providerCaption: {
    fontSize: 10, 
    alignSelf: 'center', 
    color: '#7d7d7d', 
    marginBottom: 8
  },
  providerView: {
    borderColor: '#e5e5e5', 
    borderWidth: 1,  
    width: 140, 
    height: 110, 
    alignItems: 'center', 
    borderRadius: 4,
  }

});




export default CDirpip;
