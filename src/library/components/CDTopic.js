import React, { Component } from "react";
import CDHeader from "library/components/CDHeader.js"
import CDirpip from "library/components/CDirpip.js"
import StringsMain from "res/strings/main.js"
import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, ScrollView} from "react-native";
import { Container, Card, CardItem, Body, Content, Icon, Title, Button, Text } from "native-base";

class CDTopic extends Component {

  static navigationOptions = {
    header: null,
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
          <View>
            <Text allowFontScaling={false} style={styles.TitleText}>{'Browse FAQ Topics'.toUpperCase()}</Text>
            <Text allowFontScaling={false} style={styles.PathText}>{this.props.categoryPath.toUpperCase()}</Text>
            <View>
              <Text allowFontScaling={false} style={styles.TopicTitleText}>{this.props.title}</Text>
            </View>
          </View>
          <ScrollView style={[styles.scrollView, { width: width - 76, height: height * .40 }]}>
            <Text allowFontScaling={false} style={styles.scrollViewText}>{this.props.desc}</Text>
            <Text allowFontScaling={false} style={styles.scrollViewText}>{this.props.desc}</Text>
            <Text allowFontScaling={false} style={styles.scrollViewText}>{this.props.desc}</Text>
          </ScrollView>
      </Container>
    );
  }

}

let styles = StyleSheet.create({
 TitleText : {
   color: '#FA8043',
   fontSize: 14,
   fontWeight: 'bold',
   marginTop: 20,
   marginLeft: 40,
 },
 PathText : {
   color: '#FA8043',
   fontSize: 12,
   fontWeight: 'bold',
   marginTop: 20,
   marginLeft: 40,
 },
 scrollView : {
   marginLeft: 38,
   marginTop: 10,
 },

 scrollViewText : {
   fontSize: 12,
   color: '#7D7D7D'
 },
 TopicTitleText : {
   fontSize: 12,
   color: '#FA8043',
   fontWeight: 'bold',
   marginTop: 20,
   marginLeft: 40,
 },
});

export default CDTopic;