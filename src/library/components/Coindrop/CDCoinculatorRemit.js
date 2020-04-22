import React, { Component } from "react";
import CDHeader from "library/components/CDHeader.js";
import CDCoinculatorOnly from "library/components/CDCoinculatorOnly.js";
import PrivacyPolicyScreen from "screens/PrivacyPolicyScreen/";
import StringsMain from "res/strings/main.js";
import KeyboardShift from "library/components/CDKeyboardShift.js"
import { withNavigation } from '@react-navigation/compat';
import NavigationService from "navigation/NavigationService.js"
import { AsyncStorage, AppRegistry, StyleSheet, View, Dimensions, Image, TextInput, ScrollView, BackHandler, Picker, PixelRatio  } from "react-native";
import { Container, Card, CardItem, Body, Content, Icon, Title, Button, Text } from "native-base";
import { alertBox } from "actions/axiosCalls.js"
import PieChart from "res/animation/react-native-animation-pieChart/PieChart"
import Pie from 'react-native-fab-pie';

import { connect } from 'react-redux';
import API from 'actions/api';

class CDCoinculatorRemit extends Component {

  _didFocusSubscription;
  _willBlurSubscription;
  input_rec_name;
  input_rec_number;
  input_rec_address;
  input_smart_money_num1;
  input_smart_money_num2;
  input_smart_money_num3;
  input_smart_money_num4;
  input_amount;

  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
    this.state = { 
    	expected_cd_deduct: 0,
    	token: '',
    	pay_sched: 0,
    	smart_money_parts: {
    		smart_money_num1: '',
	    	smart_money_num2: '',
	    	smart_money_num3: '',
	    	smart_money_num4: '',
    	},
    	smart_money_num: '',
    	remitFields: {
	    	amount: 0,
	    	sender_name: '',
	    	sender_number: '',
	    	sender_address:'',
	    	id_num: '',
	    	id_type: '',
	    	rec_name: '',
	    	rec_number: '',
	    	rec_address: ''
    	},
    	payday_sched_profile: [],
    	otherParams: {
    		fsp_id: '',
    		product_id: '',
    		type: '',
    	}
    }
  }

   getUserProfile = async () => {
    let profile = await AsyncStorage.getItem('PROFILE_DATA');
    profile = JSON.parse(profile)
    let { remitFields  } = this.state;
    let { otherParams  } = this.state;
    if (profile) {
      
      remitFields['sender_name'] = profile.first_name + " " + profile.last_name;
      remitFields['sender_address'] = profile.permanent_address;
      remitFields['sender_number'] = profile.mobile_number;
      remitFields['id_num'] = profile.tin;
      remitFields['id_type'] = 'TIN ID';
      otherParams['fsp_id'] = this.props.product_details.fsp_id;
      otherParams['product_id'] = this.props.product_details.product_id;
      otherParams['type'] = this.props.product_details.type;
      this.setState({ 
      	remitFields: remitFields,
      	payday_sched_profile:  profile.payday_schedule.split('/')
      });
    }
  };

  checkUserToken = async () => {
    const token = await AsyncStorage.getItem('USER_TOKEN');
    if (token) {
      
      this.setState({ token: token});
    }
  };

  onChangeText = (expected_cd_deduct) => {
  	this.setState({expected_cd_deduct: expected_cd_deduct})
  	
  }

  onBackButtonPressAndroid = () => {
    NavigationService.navigate(this.props.product)
    return true;
  };

  clearInput = () => {
  	let { remitFields  } = this.state;
    let { otherParams  } = this.state;
    let { smart_money_parts  } = this.state;
	this.input_rec_name.clear();
	this.input_rec_number.clear();
	this.input_rec_address.clear();
	this.input_smart_money_num1.clear();
	this.input_smart_money_num2.clear();
	this.input_smart_money_num3.clear();
	this.input_smart_money_num4.clear();
	this.input_amount.clear();
	remitFields['rec_name'] = ''
	remitFields['rec_number'] = ''
	remitFields['rec_address'] = ''
	smart_money_parts['smart_money_num1'] = ''
	smart_money_parts['smart_money_num2'] = ''
	smart_money_parts['smart_money_num3'] = ''
	smart_money_parts['smart_money_num4'] = ''
	this.setState({
		remitFields: remitFields,
		smart_money_num: '',
		smart_money_parts: smart_money_parts
	});
  }

  onApplyPress = () => {
  	
  	if(this.props.product_details.apply_enabled){
  		if(this.validateInput()){
  			// alertBox('Validated!')
  			let params = {
  				token: this.state.token,
  				fsp_id: this.state.otherParams.fsp_id,
	    		product_id: this.state.otherParams.product_id,
	    		type: this.state.otherParams.type,
	    		pay_cycle_sched: this.state.pay_sched,
	    		rec_address: this.state.remitFields.rec_address,
				rec_mobile: this.state.remitFields.rec_mobile,
				rec_name: this.state.remitFields.rec_name,
				ret_amount: this.state.remitFields.amount,
				send_mobile: this.state.remitFields.sender_number,
				smart_money_accnt: this.state.smart_money_num
  			}
  			
  			this.props.applyRemit(params);
  			this.clearInput();
  			NavigationService.navigate(this.props.product)
  		}
  	} else {
  		alertBox('Sorry, ' + this.props.product_details.title + ' is currently unavailable. Please check back for further notice.');
  	}
  	// NavigationService.navigate('ChartTest');
  }

  validateInput = () => {
  	const { remitFields  } = this.state
  	if(this.state.smart_money_num.length !== 19 || 
  		isNaN(this.state.smart_money_parts.smart_money_num1) || 
  		isNaN(this.state.smart_money_parts.smart_money_num2) ||
  		isNaN(this.state.smart_money_parts.smart_money_num3) ||
  		isNaN(this.state.smart_money_parts.smart_money_num4)){
  		
  		alertBox('Invalid Smart Money account number!')
  		return false;
  	} else if(this.state.pay_sched){
  		alertBox('Invalid pay schedule!')
  		return false;
  	} else if(!remitFields.amount || isNaN(remitFields.amount)){
  		alertBox('Invalid amount!')
  		return false;
  	} else if(remitFields.sender_number.length !== 11 || !remitFields.sender_number.startsWith('09') || isNaN(remitFields.sender_number)){
  		alertBox('Invalid sender mobile number!')
  		return false;
  	} else if(remitFields.rec_number.length !== 11 || !remitFields.rec_number.startsWith('09') || isNaN(remitFields.rec_number)){
  		alertBox('Invalid receiver mobile number!')
  		return false;
  	} else if(!remitFields.sender_number || !remitFields.rec_name || !remitFields.rec_number || !remitFields.rec_address){
  		alertBox('Please fill all required items!')
  		return false;
  	} else {
  		return true;
  	} 
  }

  onSmartMoneyNumberChange(value, field){
  	const { smart_money_parts } = this.state;
    smart_money_parts[field] = value;
    this.setState({
    	smart_money_parts : smart_money_parts,
    	smart_money_num: smart_money_parts['smart_money_num1'] + '-' + smart_money_parts['smart_money_num2'] + '-' + smart_money_parts['smart_money_num3'] + '-' + smart_money_parts['smart_money_num4']
    })
    
  }

  onRemitFieldTextChange(value, field){
  	const { remitFields  } = this.state;
  	remitFields[field] = value;
    this.setState({
    	remitFields : remitFields,
    })
    
  }

  onPickerChange(itemValue){
  	this.setState({pay_sched: itemValue})
  	
  }

  setPickerItems(array){
  	if(this.state.payday_sched_profile){
  		return array.map((item,index) => (
	  		<Picker.Item key={index} label={item} value={parseInt(item)} />
	  	));
  	} else {
  		return (
  			<Picker.Item label="No available pay schedule" value="" />
  		);
  	}
  }

  calculateExpectedTakeHomePay(){
  	let take_home = this.state.take_home ? this.state.take_home : 0;
  	let inputDeduct = this.state.expected_cd_deduct ? this.state.expected_cd_deduct : 0;
  	return take_home - inputDeduct;
  }

  generatePercentageArray = (state) => {
  	
	let total = parseFloat(state.gross_pay) + parseFloat(state.gov_deduct) + parseFloat(state.corp_deduct) + parseFloat(state.cd_deduct);
	let return_array = [parseFloat(state.gross_pay)/total, parseFloat(state.gov_deduct)/total, parseFloat(state.corp_deduct)/total, parseFloat(state.cd_deduct)/total];
	
	
	return return_array.includes(NaN) ? [1] : return_array;
  }

  generatePieData = (state) => {
  	data = [parseFloat(state.gross_pay ? state.gross_pay : 0), parseFloat(state.gov_deduct ? state.gov_deduct : 0), parseFloat(state.corp_deduct ? state.corp_deduct : 0), parseFloat(state.cd_deduct ? state.cd_deduct : 0)]
  	colors = ['FAA71A', 'FB7D23','FA5420','BD3602']
  	let ret_data = data.map((value, index) => {
        const toRet = {
          value,
          title: `title-${index}`,
          color: `#${colors[index]}`,
          key: `pie-${index}`,
        };
        return toRet;
      });
  	
  	return ret_data;
  }

  componentDidMount() {
  	this.getUserProfile();
  	this.checkUserToken();
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
    let pieData=[
    	{value: parseFloat(this.state.gross_pay), color: '#FAA71A'},
    	{value: parseFloat(this.state.gov_deduct), color: '#FB7D23'},
    	{value: parseFloat(this.state.corp_deduct), color: '#fa5420'},
    	{value: parseFloat(this.state.cd_deduct), color: '#bd3602'},
    ]
    return (
    	<Container>
			<KeyboardShift>
        {() => (
        	<ScrollView contentContainerStyle={{flexGrow: 1}}>
        	<View>
        		<View style={{marginTop: 10, flexDirection: 'column', justifyContent: 'center'}}>
        		{
		      		<Image 
			        	style={{width: width * 0.5, aspectRatio: 178/65, alignSelf: 'center'}}
			        	source={{uri: this.props.product_details.background_img_url}}
			        	resizeMode='contain'>
			        </Image>
			        <View>
			        	<View style={{ marginTop: 15 }}>
			        		<Text allowFontScaling={false} style={[styles.labelForm, { marginLeft: width*0.075 }]}>Pay Schedule</Text>
			        		<View style={[styles.inputFormFull, { width: width * 0.85 }]}>
			        			<Picker
								  selectedValue={this.state.pay_sched}
								  style={{height: 48, width: width * 0.85, alignSelf: 'center'}}
								  mode='dropdown'
								  onValueChange={(itemValue, itemIndex) =>
								    this.onPickerChange(itemValue)
								  }>
								  { this.setPickerItems(this.state.payday_sched_profile) }
								</Picker>
			        		</View>
			        	</View>
			        	<View>
			        		<View style={[{ marginLeft: width*0.075, flexDirection: 'row' }]}>
			        			<Text allowFontScaling={false} style={ styles.requiredChar }>* </Text>
			        			<Text allowFontScaling={false} style={ styles.labelForm }>Smart Money Account Number</Text>
			        		</View>
			        		<View style={[styles.smartMoneyInputView ,{ width: width * 0.85 }]}>
			        			<TextInput 
				        			style={[styles.inputFormQuarter, { width: width * 0.2 }]}
				        			placeholder='XXXX'
				        			maxLength={4}
				        			keyboardType='numeric'
				        			onChangeText={(text) => (this.onSmartMoneyNumberChange(text, 'smart_money_num1'))}
				        			ref={input => { this.input_smart_money_num1 = input }}
				        		/>
				        		<TextInput 
				        			style={[styles.inputFormQuarter, { width: width * 0.2 }]}
				        			placeholder='XXXX'
				        			maxLength={4}
				        			keyboardType='numeric'
				        			onChangeText={(text) => (this.onSmartMoneyNumberChange(text, 'smart_money_num2'))}
				        			ref={input => { this.input_smart_money_num2 = input }}
				        		/>
				        		<TextInput 
				        			style={[styles.inputFormQuarter, { width: width * 0.2 }]}
				        			placeholder='XXXX'
				        			maxLength={4}
				        			keyboardType='numeric'
				        			onChangeText={(text) => (this.onSmartMoneyNumberChange(text, 'smart_money_num3'))}
				        			ref={input => { this.input_smart_money_num3 = input }}
				        		/>
				        		<TextInput 
				        			style={[styles.inputFormQuarter, { width: width * 0.2 }]}
				        			placeholder='XXXX'
				        			maxLength={4}
				        			keyboardType='numeric'
				        			onChangeText={(text) => (this.onSmartMoneyNumberChange(text, 'smart_money_num4'))}
				        			ref={input => { this.input_smart_money_num4 = input }}
				        		/>
			        		</View>
			        	</View>
			        	<View>
			        		<View style={[{ marginLeft: width*0.075, flexDirection: 'row' }]}>
			        			<Text allowFontScaling={false} style={ styles.requiredChar }>* </Text>
			        			<Text allowFontScaling={false} style={ styles.labelForm }>Amount</Text>
			        		</View>
			        		<TextInput 
				        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
				        			placeholder='Amount'
				        			keyboardType='numeric'
				        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'amount'))}
				        			ref={input => { this.input_amount = input }}
				        	/>
		        		</View>
		        		<View style={[styles.remitDivider, { width: width * 0.85 }]}/>
		        		<View>
				        	<Text allowFontScaling={false} style={[styles.titleTextForm, { marginLeft: width*0.075 }]}>Sender Information</Text>
				        	<View style={{ marginTop: 10 }}>
				        		<View>
				        			<Text allowFontScaling={false} style={[styles.labelForm, { marginLeft: width*0.075 }]}>
					        			Sender Name
					        		</Text>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			placeholder='Sender Name'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'sender_name'))}
						        			editable={false}
						        			value={this.state.remitFields.sender_name}
						        	/>
							        	
				        		</View>
				        		<View>
					        		<View style={[{ marginLeft: width*0.075, flexDirection: 'row' }]}>
					        			<Text allowFontScaling={false} style={ styles.requiredChar }>* </Text>
					        			<Text allowFontScaling={false} style={ styles.labelForm }>Sender Mobile Number</Text>
					        		</View>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			keyboardType='numeric'
						        			maxLength={11}
						        			placeholder='Sender Mobile Number'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'sender_number'))}
						        			value={this.state.remitFields.sender_number}
						        	/>
				        		</View>
				        		<View>
				        			<Text allowFontScaling={false} style={[styles.labelForm, { marginLeft: width*0.075 }]}>
					        			Sender Address
					        		</Text>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			placeholder='Sender Address'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'sender_address'))}
						        			editable={false}
						        			value={this.state.remitFields.sender_address}
						        			multiline={true}
						        			scrollEnabled={true}
						        	/>
				        		</View>
				        		<View>
				        			<Text allowFontScaling={false} style={[styles.labelForm, { marginLeft: width*0.075 }]}>
					        			ID Number
					        		</Text>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			keyboardType='numeric'
						        			placeholder='ID Number'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'id_num'))}
						        			editable={false}
						        			value={this.state.remitFields.id_num}
						        	/>
				        		</View>
				        		<View>
				        			<Text allowFontScaling={false} style={[styles.labelForm, { marginLeft: width*0.075 }]}>
					        			ID Type
					        		</Text>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85, color: '#2d527c' }]}
						        			placeholder='ID Type'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'id_type'))}
						        			editable={false}
						        			value={this.state.remitFields.id_type}
						        	/>
				        		</View>
				        	</View>
				        </View>
				        <View>
				        	<Text allowFontScaling={false} style={[styles.titleTextForm, { marginLeft: width*0.075 }]}>Receiver Information</Text>
				        	<View style={{ marginTop: 10 }}>
				        		<View>
					        		<View style={[{ marginLeft: width*0.075, flexDirection: 'row' }]}>
					        			<Text allowFontScaling={false} style={ styles.requiredChar }>* </Text>
					        			<Text allowFontScaling={false} style={ styles.labelForm }>Receiver Name</Text>
					        		</View>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			placeholder='Receiver Name'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'rec_name'))}
						        			ref={input => { this.input_rec_name = input }}
						        	/>
				        		</View>
				        		<View>
					        		<View style={[{ marginLeft: width*0.075, flexDirection: 'row' }]}>
					        			<Text allowFontScaling={false} style={ styles.requiredChar }>* </Text>
					        			<Text allowFontScaling={false} style={ styles.labelForm }>Receiver Mobile Number</Text>
					        		</View>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			keyboardType='numeric'
						        			maxLength={11}
						        			placeholder='Receiver Mobile Number'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'rec_number'))}
						        			ref={input => { this.input_rec_number = input }}
						        	/>
				        		</View>
				        		<View>
					        		<View style={[{ marginLeft: width*0.075, flexDirection: 'row' }]}>
					        			<Text allowFontScaling={false} style={ styles.requiredChar }>* </Text>
					        			<Text allowFontScaling={false} style={ styles.labelForm }>Receiver Address</Text>
					        		</View>
					        		<TextInput 
						        			style={[styles.inputFormFull, styles.inputTextForm, { width: width * 0.85 }]}
						        			placeholder='Receiver Address'
						        			onChangeText={(text) => (this.onRemitFieldTextChange(text, 'rec_address'))}
						        			ref={input => { this.input_rec_address = input }}
						        			multiline={true}
						        			scrollEnabled={true}
						        	/>
				        		</View>
				        	</View>
				        </View>
			        </View>
		        	<Button full rounded primary
					    style={[styles.button, { width: width * 0.3 }]}
					    onPress={() => this.onApplyPress()}>
					    <Text allowFontScaling={false}>APPLY</Text>
				    </Button>
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
		marginTop: 12
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
	  borderRadius: 6 ,
	  height: 44,
	  backgroundColor:'#FA8043',
	  borderColor: '#FA8043',
	  bottom: 20, 
	  alignSelf: 'center', 
	  marginTop: 40

	},
	labelForm: {
		fontSize: 14, 
		color: '#9b9b9b',
		marginTop: 10
	},
	inputFormFull: {
		borderWidth: 1, 
		borderColor: '#e5eced', 
		borderRadius: 4, 
		height: 48, 
		alignSelf: 'center', 
		marginTop: 7
	},
	requiredChar: {
		fontSize: 17, 
		color: '#ff001f',
		marginTop: 10
	},
	inputFormQuarter: {
		borderWidth: 1, 
		borderColor: '#e5eced', 
		borderRadius: 4, 
		height: 48,
		marginTop: 7,
		textAlign: 'center',
		fontSize: 14/PixelRatio.getFontScale(),
		color: '#4a4a4a'
	},
	smartMoneyInputView: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignSelf: 'center' 
	},
	inputTextForm: {
		paddingLeft: 10,
		fontSize: 14/PixelRatio.getFontScale(),
		color: '#4a4a4a'
	},
	remitDivider: {
		alignSelf: 'center', 
		borderBottomWidth: 1, 
		borderColor: '#e8e8eb', 
		marginTop: 20
	},
	titleTextForm: {
		fontSize: 23, 
		color: '#fa8043',
		marginTop: 15
	}
});

const mapStateToProps = state => {
  
  
  const response = state.common ? state.common : {}
  return {
    data : response
  };
}

const mapDispatchToProps = dispatch => {
  return {
    applyRemit: (params) => {
      dispatch(API.applyRemit(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CDCoinculatorRemit));