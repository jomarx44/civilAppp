import React from "react";

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, 
         Center, Icon, Right, Button, Body, 
         Content,Text, Card, CardItem } from "native-base";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton"
import PNTransparentButton from "library/components/PNTransparentButton"

class ConnectCreateAccountScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <View style={styles.containerBlue}>
          <View 
            style={[buttonStyles.button, { bottom: height * 0.4, width: width}]} >
            <PNOrangeButton title="OPEN BANK ACCOUNT" />
          </View>
          <View 
            style={[buttonStyles.button, { bottom: (height * 0.4 - 60), width: width}]} >
            <PNTransparentButton title="LINK MY ACCOUNT" />
          </View>

          <View 
            style={[buttonStyles.button, { bottom: 40, width: width}]} >
            <Text style={{color: '#FFFFFF' ,fontSize: 15/PixelRatio.getFontScale()}} >
              Terms and Conditions
            </Text>
          </View>
 
        </View>
      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute'
  }
});



export default ConnectCreateAccountScreen;



