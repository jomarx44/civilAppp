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
import PNFormNavigation from "../../library/components/PNFormNavigation";
import PNFormButton from "../../library/components/PNFormButton";
import PNFormRadio from "../../library/components/PNFormRadio";
import PNFormHeader from "../../library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  account_type: {
    presence: {
      allowEmpty: false
    }
  }
};

class CIS13 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        account_type: ""
      },
      invalid: {}
    };

    this.input_account_type = React.createRef();
  }

  static navigationOptions = {
    header: ({ scene, previous, navigation }) => {
      const { options } = scene.descriptor;
      const title =
        options.title !== undefined ? options.title : "Create Account";
      return <PNFormNavigation title={title} />;
    },
    headerStyle: {
      style: {
        shadowColor: "transparent"
      }
    }
  };

  handleOnBlur = (index, additionalValidate = {}) => {
    const current = {
      ...additionalValidate,
      [index]: this.state.cis[index]
    };
    const invalid = validate(current, { [index]: constraints[index] });
    if (invalid) {
      this.setState(
        {
          ...this.state,
          invalid: {
            ...this.state.invalid,
            ...invalid
          }
        },
        () => console.log("Invalid State: ", this.state.invalid)
      );
    } else {
      const { invalid } = this.state;
      delete invalid[index];
      this.setState({
        ...this.state,
        invalid
      });
    }
  };

  handlePress = () => {
    const invalid = validate(this.state.cis, constraints);

    if (!invalid) {
      this.props.addAttributes(this.state.cis);
      NavigationService.navigate("CIS14");
    } else {
      this.setState({
        invalid: invalid
      });
    }
  };

  toggleAccountType = selected_accountType => {
    const currentState = this.state;
    currentState.cis.account_type = selected_accountType;
    this.setState(currentState);
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  render() {
    let { height, width } = Dimensions.get("window");
    const { invalid } = this.state;
    const data = [
      {
        onPress: () => this.toggleAccountType("savings"),
        selected: this.state.cis.account_type == "savings",
        title: "Savings"
      },
      {
        onPress: () => this.toggleAccountType("time_deposit"),
        selected: this.state.cis.account_type == "time_deposit",
        title: "Time Deposit"
      },
      {
        onPress: () => this.toggleAccountType("current_account"),
        selected: this.state.cis.account_type == "current_account",
        title: "Current Account"
      }
    ];

    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <PNFormHeader>The Purpose of my Account is:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNFormRadio
                  items={data}
                  invalid={invalid.account_type ? invalid.account_type[0] : ""}
                />
              </ScrollView>
              <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
                {/* <PNFormButton onPress={this.handlePress} disabled={!this.state.validated} label="Next" /> */}
                <PNFormButton
                  onPress={this.handlePress}
                  disabled={false}
                  label="Next"
                />
              </View>
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
  contentContainer: {
    paddingTop: 30
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
    fontFamily: "Avenir_Medium"
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS13);
