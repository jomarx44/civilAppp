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

import NavigationService from "navigation/NavigationService.js";
import PNFormNavigation from "../../library/components/PNFormNavigation";
import PNFormInputBox from "../../library/components/PNFormInputBox"
import PNFormButton from "../../library/components/PNFormButton"
import PNFormHeader from "../../library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js"

const constraints = {
  permanent_unit_number: {
    presence: {
      allowEmpty: false
    }
  },
  permanent_street_name: {
    presence: {
      allowEmpty: false
    }
  },
  permanent_city: {
    presence: {
      allowEmpty: false
    }
  }
}

class CIS06 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        permanent_unit_number: "",
        permanent_street_name: "",
        permanent_city: ""
      },
      invalid: {}
    };
    this.input_unit_number = React.createRef();
    this.input_street_name = React.createRef();
    this.input_city = React.createRef();
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
        shadowColor: 'transparent'
      }
    }
  };

  handleOnBlur = ( index, additionalValidate = {} ) => {
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
  }
 
  handlePress = () => {
    const invalid = validate(this.state.cis, constraints);
    
    if (!invalid) {
      this.props.addAttributes(this.state.cis);
      NavigationService.navigate("CIS07");
    } else {
      this.setState({
        invalid: invalid
      });
    }
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  render() {
    let { height, width } = Dimensions.get("window");
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>My Permanent Address is:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNFormInputBox
                  placeholder="Home # / Unit #"
                  ref={input => {
                    this.input_unit_number = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "permanent_unit_number")
                  }
                  onSubmitEditing={() => {
                    this.input_street_name.focus();
                  }}
                  value={this.state.cis.permanent_unit_number}
                  onBlur={() => this.handleOnBlur("permanent_unit_number")}
                  invalid={invalid.permanent_unit_number ? invalid.permanent_unit_number[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Street Name"
                  ref={input => {
                    this.input_street_name = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "permanent_street_name")
                  }
                  onSubmitEditing={() => {
                    this.input_city.focus();
                  }}
                  value={this.state.cis.permanent_street_name}
                  onBlur={() => this.handleOnBlur("permanent_street_name")}
                  invalid={invalid.permanent_street_name ? invalid.permanent_street_name[0] : ""}
                />
                <PNFormInputBox
                  placeholder="City, State"
                  ref={input => {
                    this.input_city = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "permanent_city")
                  }
                  value={this.state.cis.permanent_city}
                  onBlur={() => this.handleOnBlur("permanent_city")}
                  invalid={invalid.permanent_city ? invalid.permanent_city[0] : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS06);
