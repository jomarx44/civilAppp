import React from "react";

import {
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  View,
  BackHandler,
  PixelRatio
} from "react-native";
import {
  Container,
  Header,
  Title,
  Left,
  Center,
  Icon,
  Right,
  Button,
  Body,
  Content,
  Text,
  Card,
  CardItem
} from "native-base";
import { IndicatorViewPager, PagerDotIndicator } from "rn-viewpager";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton";
import PNTransparentButton from "library/components/PNTransparentButton";
import PNHeaderSkip from "library/components/PNHeaderSkip";
import NavigationService from "navigation/NavigationService.js";

class AnnouncementScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: <PNHeaderSkip navid="DashboardScreen" />
  };

  _renderDotIndicator(pageCount) {
    return <PagerDotIndicator pageCount={pageCount} />;
  }

  login = () => {
    NavigationService.navigate("DashboardScreen");
  };

  render() {
    let { height, width } = Dimensions.get("window");
    let pageCount = 3;
    return (
      <Container style={styles.containerBlue}>
        <View style={{ flex: 1 }}>
          <IndicatorViewPager
            style={{ flex: 1 }}
            indicator={this._renderDotIndicator(pageCount)}
          >
            <View style={style.pagerView}>
              <View style={style.noteContainer__}>
                <ImageBackground
                  source={require("res/images/bg.png")}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      padding: 20,
                      fontFamily: "Avenir_Light",
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged.
                  </Text>
                </ImageBackground>
              </View>
            </View>
            <View style={style.pagerView}>
              <View style={style.noteContainer__}>
                <Image
                  resizeMode="contain"
                  style={{ height: "70%", width: "100%" }}
                  source={require("res/images/bg.png")}
                />
                <Text
                  style={[
                    {
                      fontWeight: "900",
                      paddingBottom: 10,
                      paddingTop: 20,
                      fontFamily: "Menlo_Bold"
                    }
                  ]}
                >
                  LOREM IPSUM
                </Text>
                <Text
                  style={{
                    fontFamily: "Avenir_Light",
                    paddingBottom: 20
                  }}
                >
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </Text>
              </View>
            </View>
            <View style={style.pagerView}>
              <View style={style.noteContainer_}>
                <View style={style.shapeContainer}>
                  <Text
                    style={{
                      fontFamily: "Menlo_Bold",
                      fontSize: 45,
                      color: "#fff",
                      textAlign: "center"
                    }}
                  >
                    LOREM IPSUM
                  </Text>
                  <Text style={{ paddingTop: 25 }}>
                    When an unknown printer took a galley of type and scrambled
                    it to make a type specimen book.
                  </Text>
                </View>
                <View style={style.noteContainer__}>
                  <Image
                    resizeMode="contain"
                    style={{ width: "100%", height: "150%", marginTop: 80 }}
                    source={require("res/images/teamwork.png")}
                  />
                </View>
                <View style={style.noteContainer}>
                  <Text
                    style={{ textAlign: "center", fontFamily: "Avenir_Light" }}
                  >
                    "Neque quisquam est qui ipsum quia, adipisci velit..."
                  </Text>
                </View>
                <View style={style.buttonContainer}>
                  <Button
                    full
                    style={style.button}
                    onPress={() => this.login()}
                  >
                    <Text>Go to Dashboard</Text>
                  </Button>
                </View>
              </View>
            </View>
          </IndicatorViewPager>
        </View>
      </Container>
    );
  }
}

let style = StyleSheet.create({
  pagerView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  noteContainer__: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 50,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20
  },
  noteContainer_: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 50,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 20
  },
  noteContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 25
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5ac14",
    fontSize: 18,
    marginLeft: 0,
    marginRight: 0,
    height: 50
  },
  shapeContainer: {
    flex: 3,
    backgroundColor: "steelblue",
    height: 40,
    width: "80%",
    borderTopStartRadius: 80,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 80,
    padding: 20
  }
});

export default AnnouncementScreen;
