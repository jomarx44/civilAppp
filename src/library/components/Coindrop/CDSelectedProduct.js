import React, { Component } from 'react';
import StringsMain from 'res/strings/main.js';
import ColorMain from 'res/color/main.js';
import NavigationService from "navigation/NavigationService.js";
import { alertBox } from 'actions/axiosCalls.js'
import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, ScrollView, TouchableOpacity} from "react-native";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Text } from 'native-base';
class CDSelectedProduct extends Component {

  constructor(props) {
    super(props);
  
    this.state = {
      products: [],
      test: [
        {
          title: "Fundko Loan",
          description: "Fundko Loan Description",
          details: '{"ops":[{"insert":"Fundko Product"}]}',
          fsp_id: "USERADMIN003",
          logo: "data:image/png;base64,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",
          product_id: "PRODUCT15371586600432",
          service_id: "SVC0001",
          type: "Loan",
          url: "http://fundko-test.zennerslab.com/coindrop-offer-page",
          useradmin_id:"USERADMIN003",
          enabled: false
        }
      ]
    }
  }

  onPressProduct = (product) => {
    if(product.enabled){
      // NavigationService.navigate('CoinculatorScreen', 
      // { 
      //   product: this.props.product,
      //   fsp_id: product.fsp_id,
      //   product_id: product.product_id,
      //   service_id: product.service_id,
      //   type: product.type,
      //   url: product.url,
      //   provider_image: product.background_img_url,
      //   apply_enable: product.apply_enabled
      // });
      if(product.product_id === 'PRODUCT15371586600431'){
        NavigationService.navigate('RemittanceCoinculator', 
        { 
          product: this.props.product,
          product_details: product
        });
      } else {
        NavigationService.navigate('CoinculatorScreen', 
        { 
          product: this.props.product,
          product_details: product
        });
      }
    } else {
      alertBox('Sorry, ' + product.title + ' is currently unavailable. Please check back for further notice.');
    }
  }

  renderProducts(products){
    let {height, width} = Dimensions.get('window');
    return products.map((product,index) => (
      <View key={index} style={ styles.providerView }>
        <View style={{marginTop: 10, height: 110}}>
          <Image style={styles.buttonImage}
            source={{uri: product.icon_url}}
            resizeMode='contain' />

          <Text allowFontScaling={false} style={ [styles.providerCaption, { marginBottom: 35 }] }>{product.description}</Text>

            <TouchableOpacity style={[styles.button, styles.buttonActive,{width: width * 0.3}]} 
              onPress={() => this.onPressProduct(product)}
              >
              
              <Text allowFontScaling={false} style={[styles.buttonText]}>APPLY</Text>

            </TouchableOpacity>
        </View>
      </View>
    ));
  }

  componentDidUpdate(){
    if(this.state.products !== this.props.products){
      this.setState({ 
        products: this.props.products
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
            <Text allowFontScaling={false} style={[styles.scrollViewText, { marginTop: 15 }]}>{this.state.products[0] ? this.state.products[0].service_description : ''}</Text>
          </ScrollView>
          </View>

          <View style={[styles.bottom, {width: width * 0.9}]}>
              { this.renderProducts(this.state.products) }
          </View>
        </View>
    );
  }
}

let styles = StyleSheet.create({
 buttonImage: {
   alignSelf: 'center',
   marginBottom: 10,
   height: 25,
   width: 90
 },
 button: {
  justifyContent: 'center',
  alignSelf: 'center',
  borderRadius: 6 ,
  height: 24,
  bottom: 20,
  position: 'absolute'
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
    marginBottom: 8,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center'
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




export default CDSelectedProduct;
