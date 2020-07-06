import React from "react";
import AppJson from "../../../app.json";

import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  PixelRatio
} from "react-native";
import {
  Container,
} from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton";
import PNTextBox from "library/components/PNTextBox";
import PNTransparentButton from "library/components/PNTransparentButton";
import PNButtonID from "library/components/PNButtonID.js";

class CameraOfIDScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <View style={[styles.containerBlue, { backgroundColor: "#FFFFFF" }]}>
          <View style={[{ top: 80, width: width }]}>
            <Text
              style={{
                textAlign: "left",
                marginLeft: 32,
                color: "#F5AC14",
                fontSize: 30 / PixelRatio.getFontScale()
              }}
            >
              Take a photo of an ID document
            </Text>

            <Text
              style={{
                textAlign: "left",
                marginLeft: 32,
                marginTop: 4,
                color: "#5D646C",
                fontSize: 18 / PixelRatio.getFontScale()
              }}
            >
              Choose Documents
            </Text>
          </View>

          <View style={[buttonStyles.button, { bottom: 100, width: width }]}>
            <PNButtonID
              title="Philippine Passport"
              iconname="home"
              isTop="true"
            />
            <PNButtonID
              title="Unified Multipurpose ID"
              iconname="home"
              isTop="false"
            />
            <PNButtonID
              title="Philippine Driver's License"
              iconname="home"
              isTop="false"
            />
          </View>
        </View>
      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute"
  }
});

export default CameraOfIDScreen;
