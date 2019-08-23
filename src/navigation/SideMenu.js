import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {NavigationActions , SafeAreaView } from 'react-navigation';
import { Alert, ScrollView, View, LayoutAnimation, TouchableOpacity, Text, StyleSheet, Image, AppState } from 'react-native';
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';

import { connect } from 'react-redux'; 
import AppJson from '../../app.json';
import NavigationService from "navigation/NavigationService.js";

import { isPinAuthenticated, isLoggedIn, getLoggedState } from "store/auth";
import { setLoggedState, deleteToken, setBGEpochInactive, deleteBGEpochInactive, isInactiveFor15Minutes } from "store/auth";
import CDHeaderSideMenu from "library/components/CDHeaderSideMenu";
import CDSideMenuItem from "library/components/CDSideMenuItem";
import Config from 'res/strings/main';

// menu list
import MenuMain from "./MenuMain";
import MenuLogin from "./MenuLogin";

class SideMenu extends Component {

   constructor() {
    super();
    this.state = {
      loggedState: 'None',
      active_menu: '',
      route: 'Login',
      version:  AppJson.expo.version,
      appState: AppState.currentState
    };
  } 
   alertBox = (error) => {
    Alert.alert(
      'CoinDrop',
       error,
    );
  }
  checkState = () => {
    getLoggedState()
      .then(res => {
         this.setState({ loggedState: res });
         
      })
      .catch(err => console.log("An error occured."));
  }

  checkStateOnMount = () => {
    console.log("checkStateOnMount");
    getLoggedState()
      .then(res => {
         if ( res === 'Pin' || res === 'Login' || res === 'None') {
           res = 'Pin';
           console.log("Reroute");
           setLoggedState('Pin');
           NavigationService.navigate('Login');
         }
         console.log(res);
         this.setState({ loggedState: res });

      })
      .catch(err => console.log("An error occured."));
  }

  componentDidMount() {
    this.checkStateOnMount ();
    AppState.addEventListener('change', this._handleAppStateChange);
  }

   componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
    } else if ( this.state.appState.match(/active|foreground/) && nextAppState === 'background'  ) {
      console.log('App has come to the background!')
    } else {

    }
    this.setState({appState: nextAppState});
  }


  componentDidUpdate(prevProps) {
    if (this.props.loggedState && this.props.loggedState !== this.state.loggedState) {
      this.setState({ loggedState: this.props.loggedState });
      console.log('loggedState: ' + this.props.loggedState);
    }

    if (this.props.active_menu && this.props.active_menu !== this.state.active_menu) {
      this.setState({ active_menu: this.props.active_menu });
      console.log('active_menu in side: ' + this.props.active_menu);
    }

    if (this.props.activeItemKey && this.props.activeItemKey !== this.state.route) {
      this.setState({ route: this.props.activeItemKey });
      console.log('Route changed: ' + this.props.activeItemKey);
    }
  }





  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }


  render () {
    const { loggedState, version, route  } = this.state;
      // main drawer
    if (loggedState === 'Pin' ) {
      // login
      return (
        <Container style={styleDrawer.container}>
          <CDHeaderSideMenu />
          <MenuLogin currentRoute={route}/>
        </Container>
      );

    } else if ( loggedState === 'Login' ) {
      // main drawer
      return (
        <Container style={styleDrawer.container}>
          <CDHeaderSideMenu />
          <MenuMain currentRoute={route} />
          <Text allowFontScaling={false} style={styles.versionStyle} > Version : {version} </Text>

        </Container>
      );
    } else {
      // pin drawer
      return (
        <Container style={styleDrawer.container}>
          <CDHeaderSideMenu />
          <MenuLogin currentRoute={route}/>
        </Container>
      );

    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  versionStyle: {
    bottom: 10, 
    fontSize: 10, 
    marginLeft: 20,
    color: '#FFFFFF'
  },
});



const styleDrawer = StyleSheet.create({
  container: {
    backgroundColor: "#FA8043"
  },
  textstyle: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "normal"
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




SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => {
  console.log(state);
  if (state.auth ) {
    const response = state.auth ? state.auth : {}
    return {
      loggedState : response.loggedState,
      active_menu: response.active_menu
    };
  }
  return {};
}


export default connect(mapStateToProps)(SideMenu);
