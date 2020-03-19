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
import PNDropDown from "library/components/PNDropDown";
import PNFormButton from "library/components/PNFormButton";
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import validate from "validate.js";

const constraints = {
  work: {
    presence: {
      allowEmpty: false
    }
  },
  contact_number: {
    presence: {
      allowEmpty: false
    }
  },
  position: {
    presence: {
      allowEmpty: false
    }
  },
  source_of_funds: {
    presence: {
      allowEmpty: false
    }
  },
  gross_income: {
    presence: {
      allowEmpty: false
    }
  },
  employers_name: {
    presence: {
      allowEmpty: false
    }
  },
  employers_address: {
    presence: {
      allowEmpty: false
    }
  }
}

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
      },
      invalid: {}
    };

    this.input_work = React.createRef();
    this.input_contact_number = React.createRef();
    this.input_field = React.createRef();
    this.input_position = React.createRef();
    this.input_fund_source = React.createRef();
    this.input_gross_income = React.createRef();
    this.input_employers_name = React.createRef();
    this.input_employers_address = React.createRef();
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
      this.props.navigation.navigate("CIS12");
    } else {
      this.setState({
        invalid: invalid
      });
    }
  }

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  handleValueChange = (value) => {
    this.onChangeText(value, 'source_of_funds');
  }

  render() {
    let { height, width } = Dimensions.get("window");
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>My Employment Information:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNFormInputBox
                  placeholder="Nature of Work"
                  ref={input => {
                    this.input_work = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "work")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.work}
                  onBlur={() => this.handleOnBlur("work")}
                  invalid={invalid.work ? invalid.work[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Contact Number"
                  ref={input => {
                    this.input_contact_number = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "contact_number")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.contact_number}
                  onBlur={() => this.handleOnBlur("contact_number")}
                  invalid={invalid.contact_number ? invalid.contact_number[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Employment Position"
                  ref={input => {
                    this.input_position = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "position")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.position}
                  onBlur={() => this.handleOnBlur("position")}
                  invalid={invalid.position ? invalid.position[0] : ""}
                />
                <PNDropDown
                  placeholder={{label: 'Select Source of Income', value: null}}
                  onValueChange={this.handleValueChange}
                  options={options}
                  selectedValue={this.state.cis.source_of_funds}
                  onBlur={() => this.handleOnBlur("source_of_funds")}
                  invalid={invalid.source_of_funds ? invalid.source_of_funds[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Monthly Gross Income"
                  ref={input => {
                    this.input_gross_income = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "gross_income")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.gross_income}
                  onBlur={() => this.handleOnBlur("gross_income")}
                  invalid={invalid.gross_income ? invalid.gross_income[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Employer's Name"
                  ref={input => {
                    this.input_employers_name = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "employers_name")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.employers_name}
                  onBlur={() => this.handleOnBlur("employers_name")}
                  invalid={invalid.employers_name ? invalid.employers_name[0] : ""}
                />
                <PNFormInputBox
                  placeholder="Employer's Address"
                  ref={input => {
                    this.input_employers_address = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "employers_address")
                  }
                  onSubmitEditing={() => {
                  }}
                  value={this.state.cis.employers_address}
                  onBlur={() => this.handleOnBlur("employers_address")}
                  invalid={invalid.employers_address ? invalid.employers_address[0] : ""}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS11);
