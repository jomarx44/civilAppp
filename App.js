import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { AppLoading, SplashScreen, Asset } from 'expo';
import * as Font from 'expo-font';
import { Notifications } from 'expo';
import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import platform from './native-base-theme/variables/platform';


import NavigationService from "./src/navigation/NavigationService";
import MainDrawer from "./src/navigation";

import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      test: false,
      text: "ReactNative WebView Sample",
      text2:  ""
    };
  }

  async componentWillMount() {
    try {
      await Font.loadAsync({
        "Roboto": require("./src/res/fonts/Poppins-Regular.ttf"),
        "Roboto_medium": require("./src/res/fonts/Poppins-Medium.ttf"),
        "Poppins": require("./src/res/fonts/Poppins-Regular.ttf"),
        "Poppins_medium": require("./src/res/fonts/Poppins-Medium.ttf")
      });
      this.setState({ isReady: true });
    } catch (error) {
      console.log('error loading fonts', error);
    }
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Provider store={store}>
      <StyleProvider style={getTheme(platform)}>
        <MainDrawer
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}
        />
       </StyleProvider>
       </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  welcome: {
    flex: 1,
    paddingTop: 20,
    fontSize: 20,
    textAlign: "center",
    backgroundColor: "skyblue"
  },
  webViewContainer: {
    flex: 1
  }
});
