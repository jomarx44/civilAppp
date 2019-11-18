import React, { Component } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import CDSideMenuItem from "library/components/CDSideMenuItem";
import styleDrawer from "styles/styleDrawer";


class MenuLogin extends Component {
  render () {
   const { currentRoute } = this.props;
   return (
    <ScrollView>
      {/*<CDSideMenuItem title='Connect Account' route='ConnectCreateAccountScreen' currentRoute={currentRoute} />*/}
      <CDSideMenuItem title='Dashboard' route='DashboardScreen' currentRoute={currentRoute} />
      <CDSideMenuItem title='FingerPrint' route='FingerPrint' currentRoute={currentRoute} />
      <CDSideMenuItem title='About Us' route='AboutUs' currentRoute={currentRoute} />
      <CDSideMenuItem title='Logout' route='Login' currentRoute={currentRoute} />
    </ScrollView>
   );
  }
}



export default MenuLogin;





