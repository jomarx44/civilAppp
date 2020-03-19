import React from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Container, Header, Title, Button, Text } from "native-base";

export default class OtherInfo extends React.Component {
	render(){
		let {height, width} = Dimensions.get('window');
		const { params } = this.props.navigation.state;
		return(
			<Container>
				<View>
					<View>
		            	<Text allowFontScaling={false} style={styles.TitleText}>OTHER INFORMATION</Text>
		        	</View>
		        	<View>
		            	<View style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: 40, marginTop: 36}}>
			              <View style={{ width: 70 }}>
			                <Text allowFontScaling={false} style={ [styles.Field] }>SSS:</Text>
			              </View>
			              <View style={{ alignSelf: 'center' }}>
			                <Text allowFontScaling={false} style={[ styles.Field]}>{params.sss ? params.sss : "-"}</Text>
			              </View>
			            </View>

			            <View style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: 40, marginTop: 36}}>
			              <View style={{ width: 70 }}>
			                <Text allowFontScaling={false} style={ [styles.Field] }>TIN:</Text>
			              </View>
			              <View style={{ alignSelf: 'center' }}>
			                <Text allowFontScaling={false} style={[ styles.Field]}>{params.tin ? params.tin : "-"}</Text>
			              </View>
			            </View>
		        	</View>
				</View>
			</Container>
		)
	}
}

let styles = StyleSheet.create({
  TitleText: {
    color: '#FA8043',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 40,
  },
  RowView: {

  },
  DetailText: {
    color: '#7d7d7d',
    fontSize: 14,
    marginTop: 10,
  },
  FieldText: {
    color: '#7d7d7d',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 40,
  },
  Name: {
    color: '#7d7d7d',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 40,
  },
  Field: {
    color: '#7d7d7d',
    fontSize: 17
  },
  button: {
   backgroundColor: '#FA8043',
   justifyContent: 'center',
   alignItems: 'center',
   width: 14,
   height: 14,
   fontSize: 14,
   marginLeft: 5,
   marginTop: 22,
   borderRadius: 2
 }
});