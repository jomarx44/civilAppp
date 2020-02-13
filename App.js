import React, { Component } from "react";
import { AsyncStorage, Platform, StyleSheet } from "react-native";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import { StyleProvider } from "native-base";
import getTheme from "./native-base-theme/components";
import platform from "./native-base-theme/variables/platform";

import NavigationService from "./src/navigation/NavigationService";
import MainDrawer from "./src/navigation";

import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./src/reducers";

import OnBoardingScreen from "./src/screens/OnBoardingScreen";

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
      isFirstTime: true
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Avenir_Black: require("./src/res/fonts/AvenirLTStd-Black.otf"),
      Avenir_BlackOblique: require("./src/res/fonts/AvenirLTStd-BlackOblique.otf"),
      Avenir_Book: require("./src/res/fonts/AvenirLTStd-Book.otf"),
      Avenir_BookOblique: require("./src/res/fonts/AvenirLTStd-BookOblique.otf"),
      Avenir_Heavy: require("./src/res/fonts/AvenirLTStd-Heavy.otf"),
      Avenir_HeavyOblique: require("./src/res/fonts/AvenirLTStd-HeavyOblique.otf"),
      Avenir_Light: require("./src/res/fonts/AvenirLTStd-Light.otf"),
      Avenir_LightOblique: require("./src/res/fonts/AvenirLTStd-LightOblique.otf"),
      Avenir_Medium: require("./src/res/fonts/AvenirLTStd-Medium.otf"),
      Avenir_MediumOblique: require("./src/res/fonts/AvenirLTStd-MediumOblique.otf"),
      Avenir_Oblique: require("./src/res/fonts/AvenirLTStd-Oblique.otf"),
      Avenir_Roman: require("./src/res/fonts/AvenirLTStd-Roman.otf"),
      Roboto_medium: require("./src/res/fonts/AvenirLTStd-Medium.otf"),
      Poppins_medium: require("./src/res/fonts/AvenirLTStd-Medium.otf"),
      Poppins: require("./src/res/fonts/AvenirLTStd-Light.otf")
    });

    const isFirstTime = (await AsyncStorage.getItem("isFirstTime")) !== "false";
    this.setState({ isReady: true, isFirstTime });
  }

  onProceed = () => {
    AsyncStorage.setItem("isFirstTime", "false");
    this.setState({isFirstTime: false});
  };

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        {/* <StyleProvider style={getTheme(platform)}> */}
          {this.state.isFirstTime === true ? (
            <OnBoardingScreen onProceed={this.onProceed}/>
          ) : (
            <MainDrawer
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
          )}
        {/* </StyleProvider> */}
      </Provider>
    );
  }
}

export default App;
