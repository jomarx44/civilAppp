import React from 'react';
import { Text, StyleSheet, View, TouchableNativeFeedback, Dimensions } from 'react-native';
import StringsMain from "res/strings/main.js";

export default function CDCoinculatorLabel ({ data, focus }) {
	
	let {height, width} = Dimensions.get('window');
	return(

		<View>
			<View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
	          <Text allowFontScaling={false} style={[styles.MessageText, { width: width - 122 }]}>{StringsMain.coinculator.desc}</Text>
	        </View>
	        
	        <View style={{flexDirection: 'row', marginTop: 10 }}>
	            <View style={{ width: (width * 0.55)}}>
	              <Text allowFontScaling={false} style={styles.LabelText}>Gross pay per cycle</Text>
	              <Text allowFontScaling={false} style={styles.LabelText}>Gov't deductions</Text>
	              <Text allowFontScaling={false} style={styles.LabelText}>Corp deductions</Text>
	              <Text allowFontScaling={false} style={styles.LabelText}>CoinDrop deductions</Text>
	            </View>
	            <View style={{ marginTop: 8 }}>

	              <TouchableNativeFeedback onPress={() => focus(0)} key={0}>
	                <Text allowFontScaling={false} style={[styles.DataStyle, { width: width * 0.3, borderWidth: 1, color: '#7d7d7d', borderColor: '#FA8043', }]}>
	                  Php {data[0].value ? data[0].value : 0}
	                </Text>
	              </TouchableNativeFeedback>

	              <TouchableNativeFeedback onPress={() => focus(1)} key={1}>
	                <Text allowFontScaling={false} style={[styles.DataStyle, { width: width * 0.3, backgroundColor : "#FB7D23" }]}>
	                  Php {data[1].value ? data[1].value : 0}
	                </Text>
	              </TouchableNativeFeedback>

	              <TouchableNativeFeedback onPress={() => focus(2)} key={2}>
	                <Text allowFontScaling={false} style={[styles.DataStyle, { width: width * 0.3, backgroundColor : "#fa5420" }]}>
	                  Php {data[2].value ? data[2].value : 0}
	                </Text>
	              </TouchableNativeFeedback>

	              <TouchableNativeFeedback onPress={() => focus(3)} key={3}>
	                <Text allowFontScaling={false} style={[styles.DataStyle, { width: width * 0.3, backgroundColor : "#bd3602" }]}>
	                  Php {data[3].value ? data[3].value : 0}
	                </Text>
	              </TouchableNativeFeedback>

	            </View>
	        </View>


	        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 10}}>
	            <View style={[styles.HorizontalLine, { width: width - 90 }]} />
	        </View>
		</View>

			
	)
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
	   alignSelf: 'center',
	   paddingRight: 15,
	   paddingTop: 2.5,
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
		fontSize: 12,
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