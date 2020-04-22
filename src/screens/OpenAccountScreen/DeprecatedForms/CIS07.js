import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/KeyboardShift";

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

import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormButton from "library/components/PNFormButton"
import PNFormHeader from "library/components/PNFormHeader";
import PNRadioFormAddress from "library/components/PNRadioFormAddress";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  present_city: {
    presence: {
      allowEmpty: false
    }
  },
  present_street_name: {
    presence: {
      allowEmpty: false
    }
  },
  present_unit_number: {
    presence: {
      allowEmpty: false
    }
  }
}

class CIS07 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      cis: {
        present_city: "",
        present_street_name: "",
        present_unit_number: ""
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

  componentDidMount() {
    
  }

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
        () => 
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
      this.props.navigation.navigate("CIS08");
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
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>My Present Address is:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                  <PNRadioFormAddress
                    onPress={() => this.toggleChecked()}
                    selected={this.state.isChecked}
                  />
                  <PNFormInputBox
                    placeholder="Home # / Unit #"
                    ref={input => {
                      this.input_unit_number = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "present_unit_number")
                    }
                    onSubmitEditing={() => {
                      this.input_street_name.focus();
                    }}
                    editable={!this.state.isChecked}
                    value={this.state.cis.present_unit_number}
                    onBlur={() => this.handleOnBlur("present_unit_number")}
                    invalid={invalid.present_unit_number ? invalid.present_unit_number[0] : ""}
                  />
                  <PNFormInputBox
                    placeholder="Street Name"
                    ref={input => {
                      this.input_street_name = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "present_street_name")
                    }
                    onSubmitEditing={() => {
                      this.input_city.focus();
                    }}
                    editable={!this.state.isChecked}
                    value={this.state.cis.present_street_name}
                    onBlur={() => this.handleOnBlur("present_street_name")}
                    invalid={invalid.present_street_name ? invalid.present_street_name[0] : ""}
                  />
                  <PNFormInputBox
                    placeholder="City, State"
                    ref={input => {
                      this.input_city = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "present_city")
                    }
                    onSubmitEditing={() => {
                      // this..focus();
                    }}
                    editable={!this.state.isChecked}
                    value={this.state.cis.present_city}
                    onBlur={() => this.handleOnBlur("present_city")}
                    invalid={invalid.present_city ? invalid.present_city[0] : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS07);
