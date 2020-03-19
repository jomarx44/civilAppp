import PropTypes from "prop-types";
import React, { Component } from "react";

import { CommonActions } from '@react-navigation/native';

import {
  Alert,
  AppState
} from "react-native";
import {
  Container,
} from "native-base";

import { connect } from "react-redux";
import AppJson from "../../app.json";

import { isPinAuthenticated, isLoggedIn, getLoggedState } from "store/auth";
import {
  setLoggedState,
  deleteToken,
  setBGEpochInactive,
  deleteBGEpochInactive,
  isInactiveFor15Minutes
} from "store/auth";
import CDHeaderSideMenu from "library/components/CDHeaderSideMenu";
import CDSideMenuItem from "library/components/CDSideMenuItem";
import Config from "res/strings/main";

import styleDrawer from "styles/styleDrawer";
import styles from "styles/commonStyle";

// menu list
import MenuMain from "./MenuMain";
import MenuLogin from "./MenuLogin";

class SideMenu extends Component {
  constructor() {
    super();
    this.state = {
      loggedState: "None",
      active_menu: "",
      route: "Login",
      version: AppJson.expo.version,
      appState: AppState.currentState
    };
  }

  alertBox = error => {
    Alert.alert("CoinDrop", error);
  };

  checkState = async () => {
    await getLoggedState()
      .then(res => {
        this.setState({ loggedState: res });
      })
      .catch(err => console.log("An error occured."));
  };

  checkStateOnMount = async () => {
    try {
      let value = await getLoggedState();
      if (["Pin", "Login", "None"].includes(value)) {
        value = "Pin";
        setLoggedState("Pin");
      }
      this.setState({ loggedState: value });
    } catch (error) {
      throw error;
    }
  };

  componentDidMount() {
    this.checkStateOnMount();
    AppState.addEventListener("change", this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener("change", this._handleAppStateChange);
  }

  _handleAppStateChange = nextAppState => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    } else if (
      this.state.appState.match(/active|foreground/) &&
      nextAppState === "background"
    ) {
      console.log("App has come to the background!");
    } else {
    }
    this.setState({ appState: nextAppState });
  };

  static getDerivedStateFromProps(props, current_state) {
    if(props.loggedState && props.loggedState !== current_state.loggedState) {
      return {
        loggedState: props.loggedState
      }
    }

    if(props.active_menu && props.active_menu !== current_state.active_menu) {
      return {
        route: props.activeItemKey
      }
    }

    if(props.activeItemKey && props.activeItemKey !== current_state.route) {
      return {
        route: props.activeItemKey
      }
    }

    return null;
  }

  navigateToScreen = route => () => {
    const navigateAction = CommonActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { loggedState, version, route } = this.state;
    // main drawer
    return (
      <Container style={styleDrawer.container}>
        <CDHeaderSideMenu />
        <MenuLogin currentRoute={route} />
      </Container>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

const mapStateToProps = state => {
  if (state.auth) {
    const response = state.auth ? state.auth : {};
    return {
      loggedState: response.loggedState,
      active_menu: response.active_menu
    };
  }
  return {};
};

export default connect(mapStateToProps)(SideMenu);
