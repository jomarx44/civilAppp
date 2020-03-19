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
  DatePicker
} from "native-base";

import PNFormButton from "library/components/PNFormButton";
import PNFormDatePicker from 'library/components/PNFormDatePicker';
import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormHeader from "library/components/PNFormHeader";
import PNFormInputBox from "library/components/PNFormInputBox";
import { connect } from "react-redux";
import {addAttributes} from '../../reducers/AppAttributeReducer/AppAttribute_actions'
import validate from "validate.js";

const constraints = {
  birthdate: {
    presence: {
      allowEmpty: false
    }
  },
  birth_place: {
    presence: {
      allowEmpty: false
    }
  }
}

class CIS03 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        birthdate: '',
        birth_place: ''
      },
      invalid: {}
    };

    this.input_birthdate = React.createRef();
    this.input_birth_place = React.createRef();
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
    console.log('APPATTRIBUTE: ', this.props.appAttribute);
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
    const cis = {
      ...this.state.cis
    };
    cis.birthdate = cis.birthdate != '' ? cis.birthdate.toISOString().slice(0,10) : '';
    const invalid = validate(cis, constraints);
    
    if (!invalid) {
      this.props.addAttributes(cis);
      this.props.navigation.navigate('CIS04');
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

  handleDateChange = (date) => {
    const currentState = this.state;
    currentState.cis.birthdate = date || currentState.cis.birthdate;
    this.setState(currentState)
  }

  render() {
    let { height, width } = Dimensions.get("window");
    const {invalid} = this.state;
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1 }}>
              <PNFormHeader>I was born:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNFormDatePicker 
                    title='Date of Birth'
                    placeHolderText='Select Date of Birth'
                    onDateChange={this.handleDateChange}
                    maximumDate={new Date()}
                    invalid={invalid.birthdate ? invalid.birthdate[0] : ""}
                  />
                  <PNFormInputBox
                    placeholder="Place of Birth"
                    ref={input => {
                      this.input_birth_place = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "birth_place")
                    }
                    value={this.state.cis.birth_place}
                    onBlur={() => this.handleOnBlur("birth_place")}
                    invalid={invalid.birth_place ? invalid.birth_place[0] : ""}
                  />
                </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS03);

