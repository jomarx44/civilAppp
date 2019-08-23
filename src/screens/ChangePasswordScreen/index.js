import React from "react";
import CDHeaderBackButton from "library/components/CDHeaderBackButton.js"
import { AsyncStorage, Image, Dimensions, StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Container, Header, Button,Text } from "native-base";
import NavigationService from "navigation/NavigationService.js"

import { deleteToken, setLoggedState } from 'store/auth';
import { connect } from 'react-redux';
import * as Profile from 'store/profile';

class ChangePasswordScreen extends React.Component {

	input_old_pw;
	input_new_pw;
	input_confirm_new;

	static navigationOptions = {
		header: null,
	};

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	update_profile: false,
	  	token: '',
	  	bu_code: '',
		emp_no: '',
		user_id: '',
	  	password: {
	  		old_pw: '',
		  	new_pw: '',
		  	confirm_new: '',
		  	current_pw: ''
	  	}
	  };
	}

	checkProfile = async () => {
		let profile = await AsyncStorage.getItem('PROFILE_DATA');
		return profile;
	}

	checkUser = async () => {
		let token = await AsyncStorage.getItem('USER_TOKEN');
		let profile = await AsyncStorage.getItem('PROFILE_DATA');
		profile = JSON.parse(profile);
	    let current_pw = await AsyncStorage.getItem('PASSWORD');
	    const { password } = this.state;
	    password['current_pw'] = current_pw
	    this.setState({
	    	update_profile: true,
	    	token: token,
	    	bu_code: profile.bu_code,
	    	emp_no: profile.emp_no,
	    	user_id: profile.user_id,
	    	password: password
	    });
	    

	};

	changePassword(){
		console.log("state: " + JSON.stringify(this.state));
		if(this.state.password.old_pw == '' || this.state.password.new_pw == '' || this.state.password.confirm_new == '' ){
			alertBox("Please fill out all fields!");
		} else {
			this.validateOldPassword(this.state.password.old_pw, this.state.password.current_pw);
		}
	}

	validateNewPassword(new_pw, confirm_new){
		if(new_pw == confirm_new){
			// alertBox("Your password will successfully change.");
			let params = {
				token: this.state.token,
		    	password: new_pw,
		    	bu_code: this.state.bu_code,
		    	emp_no: this.state.emp_no
		    }
		    console.log("params: " + JSON.stringify(params));
			this.updatePassword(params);
		} else {
			alertBox("New password does not match!");
		}
	}

	validateOldPassword(old_pw, current_pw){
		if(old_pw == current_pw){
			this.validateNewPassword(this.state.password.new_pw, this.state.password.confirm_new);
		} else {
			alertBox("Old password is incorrect!");
		}
	}

	signOut(){
		deleteToken();
		setLoggedState('Pin');
		NavigationService.navigate('Product', {from: 'Product'});
	}

	updatePassword(params){
		let { password } = this.state;
		this.input_old_pw.clear();
		this.input_new_pw.clear();
		this.input_confirm_new.clear();
		password['current_pw'] = params.password;
		password['old_pw'] = '';
		password['new_pw'] = '';
		password['confirm_new'] = '';
		this.setState({ password: password })
		this.props.updatePassword(params);
		this.props.firstTimeLogInFalse(this.state.token, this.state.user_id);
		this.signOut();

	}

	componentDidMount(){
		this.checkUser();
	}

	componentDidUpdate(prevProps){
		console.log("current_pw: " + this.state.password.current_pw);
	}

	onChangeText = (value, field) => {
		const { password } = this.state;
		password[field] = value;
		this.setState({password : password});
	}

	render(){
		const { height, width } = Dimensions.get('window');
		return (
			<Container>
		        <CDHeaderBackButton />
	            <View>
	              <Text allowFontScaling={false} style={styles.TitleText}>CHANGE PASSWORD</Text>
	            </View>
	            <View style={{ flexDirection: 'column', justifyContent: 'center' }}>
	            	<TextInput allowFontScaling={false}
	            		placeholder="Old Password"
	                	underlineColorAndroid='transparent'
	                	secureTextEntry={ true }
	                	onChangeText={(text) => this.onChangeText(text,"old_pw")}
	                	ref={input => { this.input_old_pw = input }}
	                	style={ [styles.TextInputStyleClass, { width: width * 0.75 }] }
	            	/>
	            	<View style={ [ styles.hairline, { width: width * 0.75 } ] } />
	            	<TextInput allowFontScaling={false}
	            		placeholder="New Password"
	                	underlineColorAndroid='transparent'
	                	secureTextEntry={ true }
	                	onChangeText={(text) => this.onChangeText(text,"new_pw")}
	                	ref={input => { this.input_new_pw = input }}
	                	style={ [styles.TextInputStyleClass, { width: width * 0.75 }] }
	            	/>
	            	<TextInput allowFontScaling={false}
	            		placeholder="Confirm New Password"
	                	underlineColorAndroid='transparent'
	                	secureTextEntry={ true }
	                	onChangeText={(text) => this.onChangeText(text,"confirm_new")}
	                	ref={input => { this.input_confirm_new = input }}
	                	style={ [styles.TextInputStyleClass, { width: width * 0.75 }] }
	            	/>
	            	<TouchableOpacity style={ [styles.button, { width: 180 }] }
	            		onPress={ () => this.changePassword() }>
	            		<Text allowFontScaling={false} style={ styles.buttonText }>CHANGE PASSWORD</Text>
	            	</TouchableOpacity>
	            </View>
		    </Container>
		)
	}
}

let styles = StyleSheet.create({
	TitleText : {
		color: '#FA8043',
		fontSize: 14,
		fontWeight: 'bold',
		marginTop: 20,
		marginLeft: 40,
	},
	TextInputStyleClass: {
		marginTop: 23,
		alignSelf: 'center',
		paddingLeft: 10,
		paddingRight: 10,
		height: 30,
		borderWidth: 1,
		borderColor: '#FA8043',
		color: '#FA8043',
		borderRadius: 7 ,
		backgroundColor : "#FFFFFF"
	},
	hairline: {
	    marginTop: 23,
	    alignSelf: 'center',
	    backgroundColor: '#d5d5d5',
	    height: 1,
	},
	button: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#FA8043',
		backgroundColor:'#FA8043',
		marginTop: 35,
		height: 24,
		alignSelf: 'center',
		borderWidth: 1,
		paddingTop: 13,
		paddingBottom: 13,
		borderRadius: 6
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 17
	}
});

const mapStateToProps = state => {
	console.log("return na sa screen ==> " + JSON.stringify(state))
  return {
    response: state.common
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updatePassword: (params) => {
      dispatch(API.updatePassword(params));
    },
    firstTimeLogInFalse: (token, user_id) => {
    	dispatch(API.firstTimeLogInFalse(token, user_id));
    },
    get_updated_profile: (emp_no, password) => {
      dispatch(API.get_updated_profile(emp_no, password));
    } 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordScreen);
