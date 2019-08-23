import React from "react";
import { StyleSheet, View, TouchableOpacity  } from "react-native" 
import { Text } from "native-base"

export default class CDTableData extends React.Component {
  
  constructor(props) {
    super(props);
    this.state={
    	bgColor: '#ffffff' ,  
    }
  }

  itemPressed(item){
  	this.props.setModalVisibleTrue(item)
  	this.setState({bgColor: '#ffedd9'})	
  }

  initializedBackgroundColor(){
  	this.setState({bgColor: '#ffffff'})	
  }

  render() {
  	let item = this.props.item

  	return (
  		<TouchableOpacity style ={[styles.viewDirection, {backgroundColor: this.state.bgColor}]} onPress={()=> this.itemPressed(item.value)}>
        <View style ={[styles.tableColumn1]}>
          <Text allowFontScaling={false} style={[styles.tableColumn1Data,styles.colorOrange]}>{item.value.full_name.toUpperCase()} </Text>
          <Text allowFontScaling={false} style={[styles.tableColumn1Data]}>{item.value.notification_title.split(":")[0]}</Text>
        </View>
        <View style={[styles.tableColumn2]}>
        	<Text allowFontScaling={false} style={[styles.tableColumn2Data]}>{item.value.createdAt} </Text>
      	</View>
      </TouchableOpacity> 
  	)
  }
}

const styles = StyleSheet.create({
	 colorOrange:{
    color: '#f7901f'
  },
	tableColumn1:{
	  flex:2,
	  flexDirection:'row',
	  paddingLeft: 40,
	},
	tableColumn1Data: {
	  fontSize: 12,
	  color: '#7d7d7d',
    fontFamily: "Poppins_medium"
	},
	tableColumn2:{
	  flex:2,
	  paddingRight: 5,
	},
	tableColumn2Data:{
	  fontSize: 12,
	  textAlign: 'center',
	  color: '#7d7d7d',
    fontFamily: "Poppins"
	},
	viewDirection:{
    flex:1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    height:49
  },

})