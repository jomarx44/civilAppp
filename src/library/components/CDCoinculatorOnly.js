import React, { Component } from "react";
import CDHeader from "library/components/CDHeader.js";
import CDCoinculatorLabel from "library/components/CDCoinculatorLabel.js";
import PrivacyPolicyScreen from "screens/PrivacyPolicyScreen/";
import StringsMain from "res/strings/main.js";
import KeyboardShift from "library/components/CDKeyboardShift.js"
import { withNavigation } from '@react-navigation/compat';
import NavigationService from "navigation/NavigationService.js"
import { AsyncStorage, AppRegistry, StyleSheet, View, Dimensions, Image, TextInput, ScrollView, BackHandler, Picker, TouchableWithoutFeedback, TouchableOpacity, PixelRatio } from "react-native";
import { Container, Card, CardItem, Body, Content, Icon, Title, Button, Text } from "native-base";
import { alertBox } from "actions/axiosCalls.js"
import PieChart from "res/animation/react-native-animation-pieChart/PieChart"
import Pie from 'react-native-fab-pie';

import { connect } from 'react-redux';
import API from 'actions/api';

class CDCoinculatorOnly extends Component {

  constructor(props) {
    super(props);

    this.state = { 
      expected_cd_deduct: 0,
      pieData: [] 
    }
  }

  onChangeText = (expected_cd_deduct) => {
  	this.setState({expected_cd_deduct: expected_cd_deduct})
  	console.log(this.state.expected_cd_deduct)
  }

  calculateExpectedTakeHomePay(){
  	let take_home = this.props.take_home ? this.props.take_home : 0;
  	let inputDeduct = this.state.expected_cd_deduct ? this.state.expected_cd_deduct : 0;
  	return take_home - inputDeduct;
  }

  generatePieData = () => {
    data = [parseFloat(this.props.gross_pay ? this.props.gross_pay : 0), parseFloat(this.props.gov_deduct ? this.props.gov_deduct : 0), parseFloat(this.props.corp_deduct ? this.props.corp_deduct : 0), parseFloat(this.props.cd_deduct ? this.props.cd_deduct : 0)]
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
    console.log('pieData: ' + JSON.stringify(ret_data))
    return ret_data;
  }

  componentDidMount() {
    this.pie.current.animate();
  }

  pie = React.createRef();

  render() {
    let {height, width} = Dimensions.get('window');
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    return (
      <View>
      	<View style={{ justifyContent: 'center' }}>
      		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      			{/* <Image 
  	        	style={[styles.TempChart]}
  	        	source={require('res/images/ic_chart.png')}
  	        /> */}
  	        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
  	        	{ /* <PieChart
    					percentArray={this.generatePercentageArray(this.state)}
    					colorArray={['#FAA71A', '#FB7D23','#fa5420','#bd3602']}
    					configArray={[{stroke:'#FFFFFF',strokeWidth:2}, {stroke:'#FFFFFF',strokeWidth:2}, {stroke:'#FFFFFF',strokeWidth:2}, {stroke:'#FFFFFF',strokeWidth:1.5}]}
    					outerRadius={116}
    				/> */}
    				<Pie
              ref={this.pie}
    				  containerStyle={{ justifyContent: 'center', alignItems: 'center' }}
		          pieStyle={{
		            width: 262,
		            height: 262
		          }}
		          outerRadius={116}
		          innerRadius={10}
		          padAngle={0.015}
		          data={this.generatePieData()}
              animate
		        >
            <CDCoinculatorLabel 
              width={width}
              gross_pay={this.props.gross_pay}
              gov_deduct={this.props.gov_deduct}
              corp_deduct={this.props.corp_deduct}
              cd_deduct={this.props.cd_deduct}
             />


          
    		    </Pie>
  	        </View>
            <View style={{ position: 'absolute', top: 100 }} >
              <TouchableWithoutFeedback onPress={() => this.pie.current.reset().then(this.pie.current.animate)}>
                <Image source={require('res/images/ic_graph_hole.png')} />
              </TouchableWithoutFeedback>
            </View>
      		</View>

      	</View>


  			<View style={{flexDirection: 'row'}}>
            <View style={{ width: (width * 0.55)}}>
              <Text allowFontScaling={false} style={[styles.LabelText, { marginTop: 10 }]}>Take home pay</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text allowFontScaling={false} style={[styles.DataStyle, 
                { 
                  width: width * 0.3,
                  color: '#7d7d7d',
                  backgroundColor : "#FFFFFF",
                  paddingTop: 0,
                }]}>
                Php {this.props.take_home}
              </Text>
            </View>
          </View>


          <View style={{flexDirection: 'row'}}>
            <View style={{ width: (width * 0.55)}}>
              <Text allowFontScaling={false} style={[styles.LabelText, { marginTop: 0 }]}>Expected CoinDrop deductions</Text>
            </View>
            <View>
              <TextInput
                style={[styles.TextInputStyle, { width: width * 0.3, marginTop: 0 }]}
                placeholder="Php 0"
                onChangeText={(txt) => {this.onChangeText(txt)}}
                onSubmitEditing= {() => {this.calculateExpectedTakeHomePay()}} />
            </View>
          </View>


          <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
            <View style={[styles.HorizontalLine, { width: width - 90 }]} />
          </View>


          <View style={{flexDirection: 'row'}}>
            <View style={{ width: (width * 0.55)}}>
              <Text allowFontScaling={false} style={[styles.LabelText, { marginTop: 10, color: '#FA8043' }]}>Expected take home pay</Text>
            </View>
            <View style={{ marginTop: 8 }}>
              <Text allowFontScaling={false} style={[styles.DataStyle, 
                { 
                  width: width * 0.3,
                  color: '#FA8043',
                  backgroundColor : "#FFFFFF",
                  paddingTop: 0,
                }]}>
                Php {this.calculateExpectedTakeHomePay()}
              </Text>
            </View>
          </View>


      </View>
    	
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
		marginTop: 5,
	},
	LabelText: {
		fontSize: 12,
		color: '#7d7d7d',
		marginTop: 12,
    marginLeft: 53
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
	   marginTop: 5,
     marginRight: 53
	},
	HorizontalLine: {
		borderBottomColor: '#d5d5d5',
		borderBottomWidth: 1,
	},
	TextInputStyle:{
		textAlign: 'right',
		height: 22,
		fontSize: 12/PixelRatio.getFontScale(),
		borderRadius: 5 ,
		alignItems: 'center',
		paddingRight: 15,
		marginTop: 5,
		borderWidth: 1,
		color: '#7d7d7d', 
		borderColor: '#FA8043', 
		backgroundColor : "#FFFFFF",
    marginRight: 53
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
		fontSize: 14,
		color: '#4a4a4a'
	},
	smartMoneyInputView: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignSelf: 'center' 
	},
	inputTextForm: {
		paddingLeft: 10,
		fontSize: 14,
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

export default withNavigation(CDCoinculatorOnly);