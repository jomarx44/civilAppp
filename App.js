import React, { Component } from "react";
import { Platform, StyleSheet} from "react-native";
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

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isReady: false,
    };
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("./src/res/fonts/Poppins-Regular.ttf"),
      Roboto_medium: require("./src/res/fonts/Poppins-Medium.ttf"),
      Poppins: require("./src/res/fonts/Poppins-Regular.ttf"),
      Poppins_medium: require("./src/res/fonts/Poppins-Medium.ttf"),
      Avenir_Light: require("./src/res/fonts/Avenir-Light.ttf"),
      Menlo_Bold: require("./src/res/fonts/Menlo-Bold.ttf"),
      OpenSans_Bold: require("./src/res/fonts/OpenSans-Bold.ttf"),
      OpenSans_BoldItalic: require("./src/res/fonts/OpenSans-BoldItalic.ttf"),
      OpenSans_ExtraBold: require("./src/res/fonts/OpenSans-ExtraBold.ttf"),
      OpenSans_ExtraBoldItalic: require("./src/res/fonts/OpenSans-ExtraBoldItalic.ttf"),
      OpenSans_Italic: require("./src/res/fonts/OpenSans-Italic.ttf"),
      OpenSans_Light: require("./src/res/fonts/OpenSans-Light.ttf"),
      OpenSans_LightItalic: require("./src/res/fonts/OpenSans-LightItalic.ttf"),
      OpenSans_Regular: require("./src/res/fonts/OpenSans-Regular.ttf"),
      OpenSans_SemiBold: require("./src/res/fonts/OpenSans-SemiBold.ttf"),
      OpenSans_SemiBoldItalic: require("./src/res/fonts/OpenSans-SemiBoldItalic.ttf"),
      Montserrat_Black: require("./src/res/fonts/Montserrat-Black.ttf"),
      Montserrat_Bold: require("./src/res/fonts/Montserrat-Bold.ttf"),
      Montserrat_ExtraBold: require("./src/res/fonts/Montserrat-ExtraBold.ttf"),
      Montserrat_ExtraLight: require("./src/res/fonts/Montserrat-ExtraLight.ttf"),
      Montserrat_Italic: require("./src/res/fonts/Montserrat-Italic.ttf"),
      Montserrat_Light: require("./src/res/fonts/Montserrat-Light.ttf"),
      Montserrat_Medium: require("./src/res/fonts/Montserrat-Medium.ttf"),
      Montserrat_Regular: require("./src/res/fonts/Montserrat-Regular.ttf"),
      Montserrat_SemiBold: require("./src/res/fonts/Montserrat-SemiBold.ttf"),
      Montserrat_Thin: require("./src/res/fonts/Montserrat-Thin.ttf"),
    });

    this.setState({ isReady: true });
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

export default App;
