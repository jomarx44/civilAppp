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

import PNFormNavigation from "library/components/PNFormNavigation"
import PNFormButton from "library/components/PNFormButton"
import PNDropDown from "library/components/PNDropDown";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  civil_status: {
    presence: {
      allowEmpty: false
    }
  },
  maiden_name: {
    presence: {
      allowEmpty: false
    }
  }
}

const options = [
  {
    label: "Single",
    value: "single"
  },
  {
    label: "Married",
    value: "married"
  },
  {
    label: "Divorced",
    value: "divorced"
  },
  {
    label: "Separated",
    value: "separated"
  },
  {
    label: "Widowed",
    value: "widowed"
  }
];

class CIS04 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        civil_status: "",
        maiden_name: ""
      },
      invalid: {}
    };
    this.input_civil_status = React.createRef();
    this.input_maiden_name = React.createRef();
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
      this.props.addAttributes(this.state.cis);
      this.props.navigation.navigate("CIS05");
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

  handleValueChange = value => {
    this.onChangeText(value, "civil_status");
  };

  render() {
    let { height, width } = Dimensions.get("window");
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>My Personal Information:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNDropDown
                  placeholder={{label: 'Select Civil Status', value: null}}
                  onValueChange={this.handleValueChange}
                  options={options}
                  selectedValue={this.state.cis.civil_status}
                  title="Civil Status"
                  onBlur={() => this.handleOnBlur("civil_status")}
                  invalid={invalid.civil_status ? invalid.civil_status[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Mother's Maiden Name"
                  ref={input => {
                    this.input_maiden_name = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "maiden_name")
                  }
                  value={this.state.cis.maiden_name}
                  onBlur={() => this.handleOnBlur("maiden_name")}
                  invalid={invalid.maiden_name ? invalid.maiden_name[0] : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS04);
