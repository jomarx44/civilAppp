import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import {
  Container,
} from "native-base";
import PNFormTextBox from "../../library/components/PNFormTextBox";
import PNRadioFormGender from "../../library/components/PNRadioFormGender";
import PNBlueButtonSaveAsyncStorage from "library/components/PNBlueButtonSaveAsyncStorage";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import NavigationService from "navigation/NavigationService.js";
import { connect } from "react-redux";
import {addAttributes} from '../../reducers/AppAttributeReducer/AppAttribute_actions'

class CIS02 extends React.Component {
  input_gender;
  constructor(props) {
    super(props);
    this.state = {
      radioButton: "value1",
      cis: {
        gender: ''
      }
    };
  }

  componentDidMount() {
    console.log('APPATTRIBUTE: ', this.props.appAttribute);
  }

  handlePress = () => {
    this.props.addAttributes(this.state.cis);
    NavigationService.navigate('CIS03');
  };

  handleToggleGender = (selected_gender) => {
    const currentState = this.state;
    currentState.cis.gender = selected_gender;
    this.setState(currentState);
  }

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  render() {
    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1 }}>
              <View
                style={{ backgroundColor: "#309fe7", height: height * 0.2 }}
              >
                <PNHeaderTitle title="I am a:" />
              </View>
              <ScrollView style={localStyle.container}>
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNRadioFormGender title="Gender" toggleGender={this.handleToggleGender } value={this.state.cis.gender}/>
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity style={localStyle.button} onPress={this.handlePress}>
                    <Text style={localStyle.button_text}>NEXT</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
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
    fontFamily: "Montserrat_Medium"
  },
  header: {
    backgroundColor: "#309fe7",
    flex: 1
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS02);

