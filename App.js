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
