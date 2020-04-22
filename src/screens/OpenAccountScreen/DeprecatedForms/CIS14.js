import React from "react";
import AppJson from "../../../app.json";

import KeyboardShift from "library/components/KeyboardShift";

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
import Overlay from "library/components/Overlay";
import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormInitialDeposit from "library/components/PNFormInitialDeposit";
import PNFormButton from "library/components/PNFormButton";
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import {
  addAttributes,
  requestUniqueId
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import { requestOTP_TM } from "../../reducers/OTPReducer/OTP_actions";
import validate from "validate.js";

const constraints = {
  initial_deposit: {
    presence: {
      allowEmpty: false
    }
  }
}

class CIS14 extends React.Component {
  constructor(props) {
    super(props);

    this.input_initial_deposit = React.createRef();
  }

  state = {
    cis: {
      initial_deposit: ""
    },
    invalid: {}
  };

  static navigationOptions = {
    header: ({ scene, previous, navigation }) => {
      const { options } = scene.descriptor;
      const title =
        options.title !== undefined ? options.title : "Create Account";
      return <PNFormNavigation title={title} />;
    },
    headerStyle: {
      style: {
        shadowColor: "transparent"
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
        () => 
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
      const { addAttributes, appAttribute, requestOTP_TM } = this.props;
      addAttributes(this.state.cis);
      requestOTP_TM({
        mobile_number: appAttribute.temporary_attributes.contact_information,
        save_info: appAttribute.temporary_attributes
      });
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
    const { otp, token } = this.props;
    const {invalid} = this.state;

    let { height, width } = Dimensions.get("window");
    return (
      <Container>
        <KeyboardShift>
          {() => (
            <View style={{ flex: 1, justifyContent: "space-between" }}>
              <PNFormHeader>My Initial Deposit is:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                <PNFormInitialDeposit
                  title="Initial Deposit"
                  ref={input => {
                    this.input_initial_deposit = input;
                  }}
                  onChangeText={text =>
                    this.onChangeText(text, "initial_deposit")
                  }
                  value={this.state.cis.initial_deposit}
                  onBlur={() => this.handleOnBlur("initial_deposit")}
                  invalid={invalid.initial_deposit ? invalid.initial_deposit[0] : ""}
                />
              </ScrollView>
              <View style={{ paddingHorizontal: 30, marginBottom: 30 }}>
                {/* <PNFormButton onPress={this.handlePress} disabled={!this.state.validated} label="Next" /> */}
                <PNFormButton
                  onPress={this.handlePress}
                  disabled={false}
                  label="Save"
                />
              </View>
              {otp.isFetching && otp.success == null && (
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
  const { appAttribute, otp, token } = state;
  return { appAttribute, otp, token };
};

const mapDispatchToProps = dispatch => {
  return {
    addAttributes: attributes => {
      dispatch(addAttributes(attributes));
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
