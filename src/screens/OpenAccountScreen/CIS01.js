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
import PNFormInputBox from "../../library/components/PNFormInputBox";
import PNFormButton from "../../library/components/PNFormButton";
import PNFormHeader from "../../library/components/PNFormHeader";
import PNFormNavigation from "../../library/components/PNFormNavigation";
import NavigationService from "navigation/NavigationService.js";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  first_name: {
    presence: {
      allowEmpty: false
    }
  },
  last_name: {
    presence: {
      allowEmpty: false
    }
  }
}

class CIS01 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        first_name: "",
        middle_name: "",
        last_name: ""
      },
      invalid: {}
    };

    this.input_first_name = React.createRef();
    this.input_middle_name = React.createRef();
    this.input_last_name = React.createRef();
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
      NavigationService.navigate("CIS02");
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
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <PNFormHeader>My Full Name is:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNFormInputBox
                  placeholder="First Name"
                  ref={this.input_first_name}
                  onChangeText={text => this.onChangeText(text, "first_name")}
                  // onSubmitEditing={() => {
                  //   console.log('KWAKWAK', this.input_middle_name);
                  //   this.input_middle_name.current.focus();
                  // }}
                  value={this.state.cis.first_name}
                  onBlur={() => this.handleOnBlur("first_name")}
                  invalid={invalid.first_name ? invalid.first_name[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Middle Name"
                  ref={this.input_middle_name}
                  onChangeText={text => this.onChangeText(text, "middle_name")}
                  // onSubmitEditing={() => {
                  //   this.input_last_name.current.focus();
                  // }}
                  value={this.state.cis.middle_name}
                />
                <PNFormInputBox
                  placeholder="Last Name"
                  ref={input => {
                    this.input_last_name = input;
                  }}
                  onChangeText={text => this.onChangeText(text, "last_name")}
                  value={this.state.cis.last_name}
                  onBlur={() => this.handleOnBlur("last_name")}
                  invalid={invalid.last_name ? invalid.last_name[0] : ""}
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
    paddingBottom: 51,
    flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS01);
