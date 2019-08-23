import React from "react";
import CDHeaderNoLogo from "library/components/CDHeaderNoLogo.js"
import KeyboardShift from "library/components/CDKeyboardShift.js"

import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio} from "react-native";
import { Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

class TestScreen extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
  input_emp_no;
  input_password;


  constructor(props) {
    super(props);
    this._didFocusSubscription = props.navigation.addListener('didFocus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  state = {
    modelVisible: false,
    user: {
      emp_no: '',
      password: ''
    }
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }
  onBackButtonPressAndroid = () => {
    alert("Please enter username and password.");
    return true;
  };

  componentWillUnMount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
    this.setState({modalVisible: false});
  } 

  enter = () => {
    console.log("enter");
    this.input_emp_no.clear();
    this.input_password.clear();
  }

  onChangeText = (value, field) => {
    const { user } = this.state;
    user[field] = value;
    this.setState({user : user})
  }



  render() {
    let {height, width} = Dimensions.get('window');
    return (
      <Container>
        <CDHeaderNoLogo />
         <ImageBackground source={require('res/images/bg_login.png')} 
            style={styles.backgroundImage} >
           <Image source={require('res/images/loginCDLogo/ic_logo_login.png')} style= {{ alignSelf: 'center', position: 'absolute', top: 20}} />

           <KeyboardShift>
             {() => (
               <View style={styles.viewContent}>
                 <TextInput
                   placeholder="Username"
                   underlineColorAndroid='transparent'
                   onChangeText={(text) => this.onChangeText(text,"emp_no")}
                   ref={input => { this.input_emp_no = input }}
                   style={[styles.TextInputStyleClass, { bottom: 120, width: width * 0.58 }]}/>

                 <TextInput
                   placeholder="Password"
                   underlineColorAndroid='transparent'
                   secureTextEntry={true}
                   onChangeText={(text) => this.onChangeText(text,"password")}
                   onSubmitEditing={() =>{ this.enter()}}
                   ref={input => { this.input_password = input }}
                   style={[styles.TextInputStyleClass, { bottom: 70, width: width * 0.58 }]}/>    
               </View>
             )}
          </KeyboardShift>

         </ImageBackground>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  backgroundImage: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  resizeMode: 'cover',
 },
  TextInputStyleClass: {
   paddingLeft: 10,
   paddingRight: 10,
   height: 35,
   width: 78,
   borderWidth: 1,
   borderColor: '#FA8043',
   color: '#FA8043',
   borderRadius: 10 ,
   position: 'absolute',
   backgroundColor : "#FFFFFF",
   fontSize: 16/PixelRatio.getFontScale()
  },
   viewContent:{
   flex:1,
   alignItems: 'center',
  }
});

export default TestScreen;

