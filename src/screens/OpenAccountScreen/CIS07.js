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
import { Container } from "native-base";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from "navigation/NavigationService.js";
import PNFormTextBox from "../../library/components/PNFormTextBox";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import PNRadioFormAddress from "../../library/components/PNRadioFormAddress";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";

class CIS07 extends React.Component {
  input_unit_number;
  input_street_name;
  input_city;
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      cis: {
        present_city: "",
        present_street_name: "",
        present_unit_number: ""
      }
    };
  }

  componentDidMount() {
    console.log("APPATTRIBUTE: ", this.props.appAttribute);
  }

  handlePress = () => {
    this.props.addAttributes(this.state.cis);
    NavigationService.navigate("CIS08");
  };

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  toggleChecked = () => {
    const {
      permanent_city,
      permanent_street_name,
      permanent_unit_number
    } = this.props.appAttribute.temporary_attributes;

    this.setState({
      isChecked: !this.state.isChecked,
      cis: {
        present_city: !this.state.isChecked ? permanent_city : '',
        present_street_name: !this.state.isChecked ? permanent_street_name : '',
        present_unit_number: !this.state.isChecked ? permanent_unit_number : ''
      }
    });
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
                <PNHeaderTitle title="My Present Address is:" />
              </View>
              <ScrollView style={localStyle.container}>
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNRadioFormAddress
                    onPress={() => this.toggleChecked()}
                    selected={this.state.isChecked}
                  />
                  <PNFormTextBox
                    title="Home # / Unit #"
                    reference={input => {
                      this.input_unit_number = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "present_unit_number")
                    }
                    editable={!this.state.isChecked}
                    value={this.state.cis.present_unit_number}
                  />
                  <PNFormTextBox
                    title="Street Name"
                    reference={input => {
                      this.input_street_name = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "present_street_name")
                    }
                    editable={!this.state.isChecked}
                    value={this.state.cis.present_street_name}
                  />
                  <PNFormTextBox
                    title="City, State"
                    reference={input => {
                      this.input_city = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "present_city")
                    }
                    editable={!this.state.isChecked}
                    value={this.state.cis.present_city}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={localStyle.button}
                    onPress={this.handlePress}
                  >
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS07);
