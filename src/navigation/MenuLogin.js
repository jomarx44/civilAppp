import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import CDSideMenuItem from "library/components/CDSideMenuItem";


class MenuLogin extends Component {
  render () {
   const { currentRoute } = this.props;
   return (
    <ScrollView>
      <CDSideMenuItem title='Login' route='Login' currentRoute={currentRoute} />
      <CDSideMenuItem title='About Us' route='AboutUs' currentRoute={currentRoute} />
    </ScrollView>
   );
  }
}

const styleDrawer = StyleSheet.create({
  hairline: {
    backgroundColor: '#FFFFFF',
    height: 1,
    marginLeft: 18,
    width: 145
  }
});



export default MenuLogin;





