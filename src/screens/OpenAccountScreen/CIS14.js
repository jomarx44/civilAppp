import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  AsyncStorage,
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
import * as Profile from "store/profile";
import { setLoggedState } from "store/auth";

import { StackNavigator } from "react-navigation";
import NavigationService from "navigation/NavigationService.js";
import styles from "styles/commonStyle";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNBlueButton from "library/components/PNBlueButton";
import PNBlueButtonSaveAsyncStorage from "../../library/components/PNBlueButtonSaveAsyncStorage";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import { connect } from "react-redux";
import {
  addAttributes,
  putAttributes,
  requestUniqueId
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";

class CIS14 extends React.Component {
  input_initial_deposit;
  state = {
    cis: {
      initial_deposit: ""
    }
  };

  handlePress = () => {
    this.props.addAttributes(this.state.cis);
    console.log('oink', this.props.appAttribute);
    this.props.requestUniqueId(this.props.appAttribute.temporary_attributes);
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  render() {
    const { appAttribute, putAttributes, auth } = this.props;
    if (
      appAttribute &&
      !appAttribute.is_fetching &&
      appAttribute.temporary_key 
    ) {
      AsyncStorage.getItem('ACCESS_TOKEN')
        .then((response) => {
          const data ={
            attribute_name: appAttribute.temporary_key,
            attribute_value: appAttribute.temporary_attributes,
            access_token: response
          };
          console.log('appAttribute: ', appAttribute);
          console.log('DDDAAAATTTAAA: ', data);
          putAttributes(data);
          NavigationService.navigate("DashboardScreen");
        });
      
    }

    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1 }}>
              <View
                style={{ backgroundColor: "#309fe7", height: height * 0.2 }}
              >
                <PNHeaderTitle title="My Initial Deposit is:" />
              </View>
              <ScrollView style={localStyle.container}>
                <View style={{ flex: 4, paddingTop: 30 }}>
                  <PNFormTextBox
                    title=""
                    reference={input => {
                      this.input_initial_deposit = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "initial_deposit")
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity
                    style={localStyle.button}
                    onPress={this.handlePress}
                  >
                    <Text style={localStyle.button_text}>SAVE</Text>
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
    backgroundColor: "#309fe7"
  }
});

const mapStateToProps = (state, props) => {
  const { appAttribute, auth } = state;
  return { appAttribute, auth };
};

const mapDispatchToProps = dispatch => {
  return {
    addAttributes: attributes => {
      dispatch(addAttributes(attributes));
    },
    putAttributes: params => {
      dispatch(putAttributes(params));
    },
    requestUniqueId: attributes => {
      dispatch(requestUniqueId(attributes));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CIS14);
