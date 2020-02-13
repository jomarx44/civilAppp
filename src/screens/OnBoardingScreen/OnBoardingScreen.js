import React from "react";
import {
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import { Container, Text } from "native-base";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";
import NavigationService from "navigation/NavigationService.js";
import styles from "styles/commonStyle";

import PNHeaderSkip from "../../library/components/PNHeaderSkip";
import PNFormButton from "../../library/components/PNFormButton"

let { height, width } = Dimensions.get("window");

export class OnBoardingScreen extends React.Component {
  _renderDotIndicator(pageCount) {
    return <PagerDotIndicator pageCount={pageCount} />;
  }

  render() {
    let pageCount = 2;
    const {
      onProceed
    } = this.props;
    return (
      <Container style={[styles.container, {justifyContent: 'space-between', paddingVertical: height * 0.07}]}>
        <IndicatorViewPager
          style={{ flex: 1 }}
          indicator={this._renderDotIndicator(pageCount)}
        >
          <View style={style.slideContainer}>
            <Image 
              source={require('../../res/images/ic_onboarding.png')}
              resizeMode="cover"
              style={{
                width: width * 0.8,
                height: height * 0.4,
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
          <View style={style.slideContainer}>
            <Image 
              source={require('../../res/images/ic_onboarding.png')}
              resizeMode="cover"
              style={{
                width: width * 0.8,
                height: height * 0.4,
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
        </IndicatorViewPager>
        <View style={{ width: width * 0.8, alignSelf: 'center'}}>
          <PNFormButton 
            label='Start'
            onPress={() => onProceed()}
            color='#309fe7'
          />
        </View>
      </Container>
    );
  }
}

let style = StyleSheet.create({
  slideContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: width * 0.1,
    paddingVertical: height * 0.06
  },
  slideContent: {
    
  },
  slideTitle: {
    textAlign: 'center',
    fontSize: 19,
    color: '#444444',
    paddingHorizontal: width * 0.16,
    fontFamily: 'Avenir_Heavy',
    marginBottom: 15
  },
  slideSubtitle: {
    textAlign: 'center',
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
    height: 50,

  }
});

export default OnBoardingScreen;
