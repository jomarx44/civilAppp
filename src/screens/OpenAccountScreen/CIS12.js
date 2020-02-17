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
import NavigationService from "navigation/NavigationService.js";
import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormButton from "library/components/PNFormButton"

import PNDropDown from 'library/components/PNDropDown';
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  government_number_type: {
    presence: {
      allowEmpty: false
    }
  },
  government_number:{
    presence: {
      allowEmpty: false
    }
  }
}

const options = [
  {
    label: 'SSS',
    value: 'sss'
  },
  {
    label: 'GSIS',
    value: 'gsis'
  },
  {
    label: 'TIN',
    value: 'tin'
  },
]

class CIS12 extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        government_number_type: '',
        government_number: '',
      },
      invalid: {}
    };

    this.input_government_number_type = React.createRef();
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
      NavigationService.navigate("CIS13");
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

  handleValueChange = (value) => {
    this.onChangeText(value, 'government_number_type');
  }

  render() {
    let { height, width } = Dimensions.get("window");
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>Government number(if any):</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNDropDown 
                  placeholder={{label: 'Select Government Number', value: null}}
                  onValueChange={this.handleValueChange}
                  options={options}
                  selectedValue={this.state.cis.government_number_type}
                  onBlur={() => this.handleOnBlur("government_number_type")}
                  invalid={invalid.government_number_type ? invalid.government_number_type[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Government Issued ID Number"
                  ref={input => {
                    this.input_account_type = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "government_number")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.government_number}
                  onBlur={() => this.handleOnBlur("government_number")}
                  invalid={invalid.government_number ? invalid.government_number[0] : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS12);
