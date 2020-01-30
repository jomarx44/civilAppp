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
import ModalDropdown from "react-native-modal-dropdown";
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from "navigation/NavigationService.js";
import styles from "styles/commonStyle";
import PNFormTextBox from "../../library/components/PNFormTextBox";
import PNDropDownInput from "../../library/components/PNDropDownInput";
import PNDropDownInputFund from "../../library/components/PNDropDownInputFund";
import PNDropDown from "../../library/components/PNDropDown";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";

const options = [
  {
    label: 'Salary',
    value: 'salary'
  },
  {
    label: 'Investment',
    value: 'investment'
  },
  {
    label: 'Government Assistance',
    value: 'government assistance'
  },
  {
    label: 'Business',
    value: 'business'
  },
  {
    label: 'Others',
    value: 'others'
  },
]

class CIS11 extends React.Component {
  input_work;
  input_contact_number;
  input_field;
  input_position;
  input_fund_source;
  input_gross_income;
  input_employers_name;
  input_employers_address;
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        work: "",
        contact_number: "",
        position: "",
        source_of_funds: "",
        gross_income: "",
        employers_name: "",
        employers_address: ""
      }
    };
  }

  componentDidMount() {
    console.log("APPATTRIBUTE: ", this.props.appAttribute);
  }

  handlePress = () => {
    this.props.addAttributes(this.state.cis);
    NavigationService.navigate("CIS12");
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  handleValueChange = (value) => {
    this.onChangeText(value, 'source_of_funds');
  }

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
                <PNHeaderTitle title="My Employment Information:" />
              </View>
              <ScrollView style={localStyle.container}>
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNFormTextBox
                    title="Nature of Work"
                    reference={input => {
                      this.input_work = input;
                    }}
                    onChangeText={text => this.onChangeText(text, "work")}
                  />
                  <PNFormTextBox
                    title="Contact Number"
                    reference={input => {
                      this.input_contact_number = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "contact_number")
                    }
                  />
                  <PNFormTextBox
                    title="Employment Position"
                    reference={input => {
                      this.input_position = input;
                    }}
                    onChangeText={text => this.onChangeText(text, "position")}
                  />
                  <PNDropDown
                    onValueChange={this.handleValueChange}
                    options={options}
                    selectedValue={this.state.cis.source_of_funds}
                    title="Source of Funds"
                  />
                  <PNFormTextBox
                    title="Monthly Gross Income"
                    reference={input => {
                      this.input_gross_income = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "gross_income")
                    }
                  />
                  <PNFormTextBox
                    title="Employer's Name"
                    reference={input => {
                      this.input_employers_name = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "employers_name")
                    }
                  />
                  <PNFormTextBox
                    title="Employer's Address"
                    reference={input => {
                      this.input_employers_address = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "employers_address")
                    }
                  />
                </View>
                <View style={localStyle.footer}>
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS11);
