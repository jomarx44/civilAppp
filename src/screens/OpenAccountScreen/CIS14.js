import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/CDKeyboardShift.js";

import {
  ActivityIndicator,
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
import Overlay from "../../library/components/Overlay";
import NavigationService from "navigation/NavigationService.js";
import PNFormInitialDeposit from "../../library/components/PNFormInitialDeposit";
import PNHeaderBackButtonBlue from "library/components/PNHeaderBackButtonBlue";
import PNHeaderTitle from "library/components/PNHeaderTitle";
import { connect } from "react-redux";
import {
  addAttributes,
  putAttributes,
  requestUniqueId
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import { requestOTP_TM } from "../../reducers/OTPReducer/OTP_actions";

class CIS14 extends React.Component {
  input_initial_deposit;
  state = {
    cis: {
      initial_deposit: ""
    }
  };

  componentDidUpdate(prevProps) {
    const {
      otp,
      token
    } = this.props;

    if(prevProps.otp !== otp) {
      if(!otp.isFetching & (otp.success == false)) {
        alertBox(otp.message);
      }
    }

    if(prevProps.token !== token) {
      if (!token.isFetching && token.success) {
        NavigationService.navigate("OTPOpenAccount");
      }
    }
  }

  handlePress = () => {
    const { addAttributes, appAttribute, requestOTP_TM } = this.props;
    addAttributes(this.state.cis);
    requestOTP_TM({
      mobile_number: appAttribute.temporary_attributes.contact_information,
      save_info: appAttribute.temporary_attributes
    });
  };

  onChangeText = (value, field) => {
    const { cis } = this.state;
    cis[field] = value;
    this.setState({ cis });
  };

  numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  }

  static navigationOptions = {
    header: <PNHeaderBackButtonBlue />
  };

  render() {
    const { otp, token } = this.props;

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
                  <PNFormInitialDeposit
                    title="Initial Deposit"
                    reference={input => {
                      this.input_initial_deposit = input;
                    }}
                    onChangeText={text =>
                      this.onChangeText(text, "initial_deposit")
                    }
                    value={this.state.cis.initial_deposit}
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
              {otp.isFetching && otp.success == null &&(
                <Overlay>
                  <ActivityIndicator color="#FFF" size="large" />
                </Overlay>
              )}
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
  const { appAttribute, otp, token } = state;
  return { appAttribute, otp, token };
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
    },
    requestOTP_TM: params => {
      dispatch(requestOTP_TM(params));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CIS14);
