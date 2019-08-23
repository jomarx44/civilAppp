import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Text } from 'native-base';
import { withNavigation } from 'react-navigation';
import NavigationService from "navigation/NavigationService.js";

class CDSideMenuItem extends Component {  
  render() {
    const { currentRoute, route } = this.props;
    return (
        <View style={styleDrawer.container}>
          <Text allowFontScaling={false} style={ currentRoute == route ?  styleDrawer.textstyleActive : styleDrawer.textstyle} onPress={()=> (NavigationService.navigate(this.props.route)) } >
             {this.props.title} 
          </Text>
        </View>
    );
  }
}


const styleDrawer = StyleSheet.create({
  container: {
    height: 30,
  },
  textstyle: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 22,
    fontFamily: "Poppins"
  },
  textstyleActive: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 22,
    fontFamily: "Poppins_medium"
  },
  currenttextstyle: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "normal", 
    marginLeft: 22,
    fontFamily: "Poppins_medium"
  },
 
  itemstyle: {
  },
  hairline: {
    backgroundColor: '#FFFFFF',
    height: 1,
    marginLeft: 18,
    width: 145
  }
});





export default CDSideMenuItem;
