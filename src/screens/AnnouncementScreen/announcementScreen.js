import React from "react";

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, 
         Center, Icon, Right, Button, Body, 
         Content,Text, Card, CardItem } from "native-base";
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton"
import PNTransparentButton from "library/components/PNTransparentButton"
import PNHeaderSkip from "library/components/PNHeaderSkip"
import NavigationService from 'navigation/NavigationService.js'

class AnnouncementScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <PNHeaderSkip navid="DashboardScreen" />
    )
  };

  _renderDotIndicator(pageCount) {
      return <PagerDotIndicator pageCount={pageCount} />;
  }

  login = () => {
    NavigationService.navigate("DashboardScreen");
  }

  render() {
    let {height, width} = Dimensions.get('window');
    let pageCount = 3;
    return (
      <Container style={styles.containerBlue}>
        <View style={{flex: 1}}>
          <IndicatorViewPager
            style={{flex: 1}}
            indicator={this._renderDotIndicator(pageCount)}>
              <View style={style.pagerView}>
                <View style={style.noteContainer_}>
                  <Text>page one</Text>
                </View>
              </View>
              <View style={style.pagerView}>
                <View style={style.noteContainer_}>
                  <Text>page two</Text>
                </View>
              </View>
              <View style={style.pagerView}>
                <View style={style.noteContainer_}>
                  <View style={style.noteContainer}>
                    <Text>Flex 1</Text>
                  </View>
                  <View style={style.buttonContainer}>
                   <Button full style={style.button}
                     onPress={() => this.login()}>
                    <Text>Goto Dashboard</Text>
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
  pagerView : {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  noteContainer_ : {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
    width: '80%',
    backgroundColor:'#f5ac14'
  },
  noteContainer : {
    flex: 3,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  buttonContainer : {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 25
  },
  button : {
   justifyContent: 'center',
   alignItems: 'center',
   backgroundColor: '#309fe7',
   fontSize: 18,
   marginLeft: 0,
   marginRight: 0,
   height: 50,
  }
});



export default AnnouncementScreen;



