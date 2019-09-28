import React from "react";

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, 
         Center, Icon, Right, Button, Body, 
         Content,Text, Card, CardItem } from "native-base";

import styles from "styles/commonStyle";
import PNOrangeButton from "library/components/PNOrangeButton"
import PNTransparentButton from "library/components/PNTransparentButton"
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue"


class ConnectCreateAccountScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: (
      <PNHeaderBackButtonBlue/>
    )
  };

  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
          <ImageBackground source={require('res/images/SSB-Splash.png')}
            style={buttonStyles.backgroundImage} >

          <View style={{ flex: 1}} >
          </View>
 
          <View style={{ flex: 1, width: width}} >
            <PNOrangeButton title="OPEN BANK ACCOUNT" navid="OpenAccountScreen" />
            <PNTransparentButton title="LINK MY ACCOUNT" navid="LinkAccount"/>
            <Button full transparent light
              style={[buttonStyles.buttonTrans, { width: width - 60}]}>
              <Text>Terms and Conditions</Text>
            </Button>
          </View>
 
       </ImageBackground>
      </Container>
    );
  }
}

let buttonStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  buttonTrans: {
   fontSize: 18,
   marginLeft: 30,
   marginRight: 30,
   borderColor: '#FFFFFF',
   justifyContent: 'center',
   alignItems: 'center',
   position: 'absolute',
   bottom: 44
 },
  backgroundImage: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  resizeMode: 'cover',
 },
});



export default ConnectCreateAccountScreen;



