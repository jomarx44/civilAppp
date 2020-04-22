import React, { Component } from "react";
import CDHeader from "library/components/CDHeader.js";
import CDCoinculatorOnly from "library/components/CDCoinculatorOnly.js";
import PrivacyPolicyScreen from "screens/PrivacyPolicyScreen/";
import StringsMain from "res/strings/main.js";
import KeyboardShift from "library/components/CDKeyboardShift.js"
import { withNavigation } from '@react-navigation/compat';
import NavigationService from "navigation/NavigationService.js"
import { AppRegistry, StyleSheet, View, Dimensions, Image, TextInput, ScrollView, BackHandler, TouchableOpacity, Linking } from "react-native";
import { Container, Card, CardItem, Body, Content, Icon, Title, Button, Text } from "native-base";
import { alertBox } from "actions/axiosCalls.js"

class CDCoinculator extends Component {

  _didFocusSubscription;
  _willBlurSubscription;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.state = { expected_cd_deduct: 0, imageHeight: 0 }
  }

  onChangeText = (expected_cd_deduct) => {
  	this.setState({expected_cd_deduct: expected_cd_deduct})
  }

  onBackButtonPressAndroid = () => {
    NavigationService.navigate(this.props.product)
    return true;
  };

  onApplyPress = () => {
  	if(this.props.product_details.apply_enabled){
  		NavigationService.navigate('PrivacyPolicy', 
	    {
	    	product: this.props.product,
	    	fsp_id: this.props.product_details.fsp_id,
            product_id: this.props.product_details.product_id,
            service_id: this.props.product_details.service_id,
            type: this.props.product_details.type,
            url: this.props.product_details.url,

	    });
  	} else {
  		alertBox('Sorry, ' + this.props.product_details.title + ' is currently unavailable. Please check back for further notice.');
  	}
  }

  calculateExpectedTakeHomePay(){
  	let take_home = this.state.take_home ? this.state.take_home : 0;
  	let inputDeduct = this.state.expected_cd_deduct ? this.state.expected_cd_deduct : 0;
  	return take_home - inputDeduct;
  }

  calculateImgHeight = () => {
  	Image.getSize( this.props.product_details.background_img_url, ( Width, Height ) =>
    {
    	let ratio = (Dimensions.get('window').width * 0.8) / Width;
    	let imgheight = ratio * Height
        this.setState({imageHeight: imgheight});

    },(errorMsg) =>
    {
        
    });
	
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnMount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  render() {
    let {height, width} = Dimensions.get('window');
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    this.state = {...this.state, ...this.props};
    return (
    	<Container>
			<KeyboardShift>
        {() => (
        	<ScrollView contentContainerStyle={{flexGrow: 1}}>
        	<View>
        		<View style={{marginTop: 30, flexDirection: 'column', justifyContent: 'center'}}>

		      		<Image 
			        	style={{width: width * 0.8, height: this.state.imageHeight, alignSelf: 'center'}}
			        	source={{uri: this.props.product_details.background_img_url}}
			        	onLoadStart={(e) => this.calculateImgHeight()}
			        	resizeMode='contain'>
			        </Image>
			        <View style={{width: width * 0.8, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center'}}>
			        	{	
			        		this.props.product_details.product_id === 'PRODUCT15371586600432' ?
			        		<TouchableOpacity
							    style={[styles.button, { width: width * 0.3 }]}
							    onPress={() => Linking.openURL('https://s3-ap-southeast-1.amazonaws.com/coindrop/resources/fundko/faq/Coindrop+-+FundKo+FAQ+Guide.pdf')}>
							    <Text allowFontScaling={false} style={styles.buttonText}>FAQs</Text>
						    </TouchableOpacity>
						    : null
						}
			        	<TouchableOpacity
						    style={[styles.button, { width: width * 0.3 }]}
						    onPress={() => this.onApplyPress()}>
						    <Text allowFontScaling={false} style={styles.buttonText}>APPLY</Text>
					    </TouchableOpacity>
			        </View>
				        
		      	</View>

		      	<CDCoinculatorOnly 
		      		gross_pay={this.state.gross_pay}
		      		gov_deduct={this.state.gov_deduct}
		      		corp_deduct={this.state.corp_deduct}
		      		cd_deduct={this.state.cd_deduct}
		      		take_home={this.state.take_home}
		      	/>
	      	</View>
	      	<View style={{ height: 20 }}></View>
	      	</ScrollView>
	        	)}
        	</KeyboardShift>
        </Container>
    	
    );
  }
}

let styles = StyleSheet.create({
	TempChart:{
		width: 232, 
		height: 232,
	},
	MessageText:{
		color: '#7d7d7d',
		fontSize: 8,
		marginLeft: 63,
		marginTop: 5,
	},
	LabelText: {
		fontSize: 12,
		color: '#7d7d7d',
		marginLeft: 63,
		marginTop: 15
	},
	DataStyle: {
	   textAlign: 'right',
	   height: 22,
	   fontSize: 12,
	   color: 'white',
	   borderRadius: 5 ,
	   alignItems: 'center',
	   paddingRight: 15,
	   paddingTop: 4.5,
	   marginTop: 5
	},
	HorizontalLine: {
		borderBottomColor: '#d5d5d5',
		borderBottomWidth: 1,
	},
	TextInputStyle:{
		textAlign: 'right',
		height: 22,
		fontSize: 12,
		borderRadius: 5 ,
		alignItems: 'center',
		paddingRight: 15,
		marginTop: 5,
		borderWidth: 1,
		color: '#7d7d7d', 
		borderColor: '#FA8043', 
		backgroundColor : "#FFFFFF"
	},
	button: {
	  alignItems: 'center',
	  justifyContent: 'center',
	  borderRadius: 6 ,
	  height: 44,
	  backgroundColor:'#FA8043',
	  borderColor: '#FA8043',
	  bottom: 20, 
	  alignSelf: 'center', 
	  marginTop: 40

	},
	buttonText: {
		alignSelf: 'center', 
		color: '#ffffff',
		fontSize: 17
	}
});

export default withNavigation(CDCoinculator);