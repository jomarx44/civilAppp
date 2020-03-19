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

import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormInputBox from "library/components/PNFormInputBox"
import PNFormDatePicker from 'library/components/PNFormDatePicker';
import PNFormTextBox from "library/components/PNFormTextBox";
import PNFormButton from "library/components/PNFormButton"
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import {addAttributes} from '../../reducers/AppAttributeReducer/AppAttribute_actions'

class CIS05 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cis: {
        beneficiary_name: '',
        beneficiary_address: '',
        beneficiary_birth_date: new Date(),
        beneficiary_birth_place: '',
        beneficiary_fund_source: '', 
        beneficiary_work_nature: ''
      },
      invalid: {}
    };

    this.input_beneficiary_name = React.createRef();
    this.input_beneficiary_address = React.createRef();
    this.input_birth_date = React.createRef();
    this.input_birth_place = React.createRef();
    this.input_work_nature = React.createRef();
    this.input_fund_source = React.createRef();
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
    const { cis } = this.state;
    cis.beneficiary_birth_date = cis.beneficiary_birth_date.toISOString().slice(0,10);
    this.props.addAttributes(cis);
    this.props.navigation.navigate('CIS06');
  };

  handleDateChange = (date) => {
    const currentState = this.state;
    currentState.cis.beneficiary_birth_date = date || currentState.cis.beneficiary_birth_date;
    this.setState(currentState)
  }

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
              <PNFormHeader>Beneficiary(if applicable) :</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNFormInputBox
                  placeholder="Name"
                  ref={input => {
                    this.input_beneficiary_name = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "beneficiary_name")
                  }
                  value={this.state.cis.beneficiary_name}
                />
                <PNFormInputBox
                  placeholder="Address"
                  ref={input => {
                    this.input_beneficiary_address = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "beneficiary_address")
                  }
                  value={this.state.cis.beneficiary_address}
                />
                <PNFormDatePicker 
                  placeHolderText='Select Date of Birth'
                  defaultDate={this.state.cis.beneficiary_birth_date}
                  onDateChange={this.handleDateChange}
                  maximumDate={new Date()}
                />
                <PNFormInputBox
                  placeholder="Birth Place"
                  ref={input => {
                    this.input_birth_place = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "beneficiary_birth_place")
                  }
                  value={this.state.cis.beneficiary_birth_place}
                />
                <PNFormInputBox
                  placeholder="Nature of Work"
                  ref={input => {
                    this.input_work_nature = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "beneficiary_work_nature")
                  }
                  value={this.state.cis.beneficiary_work_nature}
                />
                <PNFormInputBox
                  placeholder="Source of Fund"
                  ref={input => {
                    this.input_fund_source = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "beneficiary_fund_source")
                  }
                  value={this.state.cis.beneficiary_fund_source}
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS05);
