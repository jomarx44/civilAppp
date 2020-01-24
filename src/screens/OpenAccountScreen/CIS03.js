import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  ScrollView,
  StatusBar,
  Image,
  Dimensions,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import {
  Container,
} from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from "navigation/NavigationService.js";
import styles from "styles/commonStyle";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNBlueButton from "library/components/PNBlueButton";
import PNBlueButtonSaveAsyncStorage from "library/components/PNBlueButtonSaveAsyncStorage";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import { connect } from "react-redux";
import {addAttributes} from '../../reducers/AppAttributeReducer/AppAttribute_actions'

class CIS03 extends React.Component {
  input_birthdate;
  input_birth_place;
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        birthdate: '',
        birth_place: ''
      }
    };
  }

  componentDidMount() {
    console.log('APPATTRIBUTE: ', this.props.appAttribute);
  }

  handlePress = () => {
    this.props.addAttributes(this.state.cis);
    NavigationService.navigate('CIS04');
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1 }}>
              <View
                style={{ backgroundColor: "#309fe7", height: height * 0.2 }}
              >
                <PNHeaderTitle title="I was born:" />
              </View>
              <ScrollView style={localStyle.container}>
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNFormTextBox
                    title="Date of Birth"
                    reference={input => {
                      this.input_birthdate = input;
                    }}
                    onChangeText={text => this.onChangeText(text, "birthdate")}
                  />
                  <PNFormTextBox
                    title="Place of Birth"
                    reference={input => {
                      this.input_birth_place = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "birth_place")
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={localStyle.button} onPress={this.handlePress}>
                    <Text style={localStyle.button_text}>NEXT</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          )}
        </KeyboardShift>
      </Container>
    );
  }
}

let localStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingBottom: 51
  },
  text: {
    marginLeft: 32,
    marginRight: 32,
    color: "#FFFFFF"
  },
  button: {
    width: "100%",
    height: 50,
    marginTop: 40,
    backgroundColor: "#309fe7",
    alignItems: "center",
    justifyContent: "center"
  },
  button_text: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat_Medium"
  },
  header: {
    backgroundColor: "#309fe7"
  }
});

const mapStateToProps = (state, props) => {
  const { appAttribute } = state;
  return { appAttribute };
};

const mapDispatchToProps = dispatch => {
  return {
    addAttributes: attributes => {
      dispatch(addAttributes(attributes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CIS03);

