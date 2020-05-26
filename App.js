import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { AppLoading } from "expo";
import { Root } from "native-base";
import { AsyncStorage } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { configureStore } from "./src/redux/store";
import { fonts } from "./src/res/fonts";
import OnBoardingScreen from "./src/screens/OnBoardingScreen";
import Navigator from "./src/navigation";
import * as Font from "expo-font";

export const App = () => {
  const [isReady, setReady] = useState(false);
  const [isFirstTime, setFirstTime] = useState(true);

  useEffect(async () => {
    await Font.loadAsync(fonts);
    const status = (await AsyncStorage.getItem("isFirstTime")) !== "false";
    setFirstTime(status);
    setReady(true);
  }, []);

  const handleProceed = () => {
    AsyncStorage.setItem("isFirstTime", "false");
    setFirstTime(false);
  };

  if (isReady) {
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
