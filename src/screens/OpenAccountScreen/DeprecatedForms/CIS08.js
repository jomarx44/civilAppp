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
import {
  Container,
} from "native-base";

import PNFormContactInfo from "library/components/PNFormContactInfo";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormButton from "library/components/PNFormButton";
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  contact_information: {
    presence: {
      allowEmpty: false
    }
  },
  email: {
    presence: {
      allowEmpty: false
    },
    email: {
      message: "This doesn't look like a valid email"
    }
  }
}

class CIS08 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        contact_information: '',
        email: ''
      },
      invalid: {}
    };

    this.input_contact_information = React.createRef();
    this.input_email = React.createRef();
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

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  componentDidMount() {
    console.log("APPATTRIBUTE: ", this.props.appAttribute);
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
      const attribute = {
        email: this.state.cis.email,
        contact_information: this.state.cis.contact_information
      };
      attribute.contact_information = '63' + attribute.contact_information;
      this.props.addAttributes(attribute);
      this.props.navigation.navigate("CIS09");
    } else {
      this.setState({
        invalid: invalid
      });
    }
  };

  render() {
    let { height, width } = Dimensions.get("window");
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>My Contact Info is:</PNFormHeader>
              <ScrollView 
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                  <PNFormContactInfo
                    title="Contact Information"
                    ref={input => {
                      this.input_contact_information = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "contact_information")
                    }
                    value={this.state.cis.contact_information}
                    invalid={invalid.contact_information ? invalid.contact_information[0] : ""}
                  />
                  <PNFormInputBox
                    placeholder="Email Address"
                    ref={this.input_email}
                    onChangeText={text => this.onChangeText(text, "email")}
                    // onSubmitEditing={() => {
                    //   console.log('KWAKWAK', this.input_middle_name);
                    //   this.input_middle_name.current.focus();
                    // }}
                    value={this.state.cis.email}
                    onBlur={() => this.handleOnBlur("email")}
                    invalid={invalid.email ? invalid.email[0] : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS08);
