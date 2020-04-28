import React from "react";
import {
  Image,
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import { Container, Text } from "native-base";
import ViewPager from "@react-native-community/viewpager";
import styles from "styles/commonStyle";

import PNFormButton from "library/components/PNFormButton";

let { height, width } = Dimensions.get("window");

export const OnBoardingScreen = ({onProceed}) => {
  return (
    <Container
      style={[
        styles.container,
        { justifyContent: "space-between", paddingVertical: height * 0.07 }
      ]}
    >
      <ViewPager style={{ flex: 1 }} showPageIndicator={true} initialPage={0}>
        <View style={style.slideContainer} key="1">
          <Image
            source={require("../../res/images/ic_onboarding.png")}
            resizeMode="cover"
            style={{
              width: width * 0.8,
              height: height * 0.4
            }}
          />
          <View style={style.slideContent}>
            <Text style={style.slideTitle}>MOBILE BANKING ENROLLMENT</Text>
            <Text style={style.slideSubtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </Text>
          </View>
        </View>
        <View style={style.slideContainer} key="2">
          <Image
            source={require("../../res/images/ic_onboarding.png")}
            resizeMode="cover"
            style={{
              width: width * 0.8,
              height: height * 0.4
            }}
          />
          <View style={style.slideContent}>
            <Text style={style.slideTitle}>MOBILE BANKING ENROLLMENT</Text>
            <Text style={style.slideSubtitle}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </Text>
          </View>
        </View>
      </ViewPager>
      <View style={{ width: width * 0.8, alignSelf: "center" }}>
        <PNFormButton
          label="Start"
          onPress={() => onProceed()}
          color="#309fe7"
        />
      </View>
    </Container>
  );
};

let style = StyleSheet.create({
  slideContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.06
  },
  slideContent: {},
  slideTitle: {
    textAlign: "center",
    fontSize: 19,
    color: "#444444",
    paddingHorizontal: width * 0.16,
    fontFamily: "Avenir_Heavy",
    marginBottom: 15
  },
  slideSubtitle: {
    textAlign: "center",
    fontSize: 16,
    color: "#787878",
    fontFamily: `Avenir_Roman`
  },
  pagerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    height: 50
  }
});

export default OnBoardingScreen;
