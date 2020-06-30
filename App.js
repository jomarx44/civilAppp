import "react-native-gesture-handler";

import * as Font from "expo-font";

import React, { useEffect, useState } from "react";

import { AppLoading } from "expo";
import { AsyncStorage } from "react-native";
import Navigator from "./src/navigation";
import OnBoardingScreen from "./src/screens/OnBoardingScreen";
import { Provider } from "react-redux";
import { Root } from "native-base";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { configureStore } from "./src/redux/store";
import { fonts } from "./src/res/fonts";

export const App = () => {
  const [isReady, setReady] = useState(false);
  const [isFirstTime, setFirstTime] = useState(true);

  useEffect(() => {
    const getFontAsync = async () => {
      await Font.loadAsync(fonts);
      const status = (await AsyncStorage.getItem("isFirstTime")) !== "false";
      setFirstTime(status);
      setReady(true);
    }

    getFontAsync();
  }, []);

  const handleProceed = () => {
    AsyncStorage.setItem("isFirstTime", "false");
    setFirstTime(false);
  };

  if (!isReady) {
    return <AppLoading />;
  }

  return (
    <Root>
      <Provider store={configureStore()}>
        <SafeAreaProvider>
          {/* <StyleProvider style={getTheme(platform)}> */}
          {isFirstTime === true ? (
            <OnBoardingScreen onProceed={handleProceed} />
          ) : (
            <Navigator />
          )}
          {/* </StyleProvider> */}
        </SafeAreaProvider>
      </Provider>
    </Root>
  );
};

export default App;
