import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import CDSideMenuItem from "library/components/CDSideMenuItem";
import styleDrawer from "styles/styleDrawer";


class MenuMain extends Component {
  render () {
    const { currentRoute } = this.props;
   return (
    <ScrollView>
      <CDSideMenuItem title='Borrow' route='Borrow' currentRoute={currentRoute} />
      <CDSideMenuItem title='Play' route='Play' currentRoute={currentRoute} />
      <CDSideMenuItem title='Invest' route='Invest' currentRoute={currentRoute} />
      <CDSideMenuItem title='Remit' route='Remit' currentRoute={currentRoute} />
      <CDSideMenuItem title='Pay Bills' route='Pay' currentRoute={currentRoute} />
     <View style={styleDrawer.hairline} />
      <CDSideMenuItem title='Home' route='Product' currentRoute={currentRoute} />
      <CDSideMenuItem title='Portfolio' route='Portfolio' currentRoute={currentRoute} />
      <CDSideMenuItem title='Applications' route='Applications' currentRoute={currentRoute} />
      <CDSideMenuItem title='Notifications' route='Notifications' currentRoute={currentRoute} />
      <CDSideMenuItem title='Personal Details' route='PersonalDetails' currentRoute={currentRoute} />
     <View style={styleDrawer.hairline} />
      <CDSideMenuItem title='About Us' route='AboutUs' currentRoute={currentRoute} />
      <CDSideMenuItem title='Contact Us' route='Contact' currentRoute={currentRoute} />
      <View style={styleDrawer.hairline} />
      <CDSideMenuItem title='Sign Out' route='Signout' currentRoute={currentRoute} />
    </ScrollView>
   );
  }
}


export default MenuMain;





