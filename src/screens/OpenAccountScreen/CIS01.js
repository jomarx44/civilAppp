import React from "react";
import AppJson from "../../../app.json";
import KeyboardShift from "library/components/CDKeyboardShift.js";
import {
  ScrollView,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import { Container } from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import styles from "styles/commonStyle";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNBlueButton from "library/components/PNBlueButton";
import PNBlueButtonSaveAsyncStorage from "library/components/PNBlueButtonSaveAsyncStorage";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import NavigationService from "navigation/NavigationService.js";
import { connect } from "react-redux";
import {addAttributes} from '../../reducers/AppAttributeReducer/AppAttribute_actions'

class CIS01 extends React.Component {
  input_first_number;
  input_middle_name;
  input_last_name;
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        first_name: '',
        middle_name: '',
        last_name: ''
      }
    };
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue navid="DashboardScreen" />
  };

  handlePress = () => {
    this.props.addAttributes(this.state.cis);
    NavigationService.navigate('CIS02');
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
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
                <PNHeaderTitle title="My Full Name is:" />
              </View>
              <ScrollView style={localStyle.container}>
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNFormTextBox
                    title="First Name"
                    reference={input => {
                      this.input_first_number = input;
                    }}
                    onChangeText={text => this.onChangeText(text, "first_name")}
                  />
                  <PNFormTextBox
                    title="Middle Name"
                    reference={input => {
                      this.input_middle_name = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "middle_name")
                    }
                  />
                  <PNFormTextBox
                    title="Last Name"
                    reference={input => {
                      this.input_last_name = input;
                    }}
                    onChangeText={text => this.onChangeText(text, "last_name")}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS01);
