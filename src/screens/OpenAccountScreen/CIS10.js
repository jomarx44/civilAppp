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

import PNFormButton from "library/components/PNFormButton"
import PNFormNavigation from "library/components/PNFormNavigation";
import PNFormHeader from "library/components/PNFormHeader";
import { connect } from "react-redux";
import { addAttributes } from "../../reducers/AppAttributeReducer/AppAttribute_actions";

class CIS10 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButton: "value1",
      cis: {},
      invalid: {}
    };
    this.input_gender = React.createRef();
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

  // handleOnBlur = ( index, additionalValidate = {} ) => {
  //   const current = {
  //     ...additionalValidate,
  //     [index]: this.state.cis[index]
  //   };
  //   const invalid = validate(current, { [index]: constraints[index] });
  //   if (invalid) {
  //     this.setState(
  //       {
  //         ...this.state,
  //         invalid: {
  //           ...this.state.invalid,
  //           ...invalid
  //         }
  //       },
  //       () => console.log("Invalid State: ", this.state.invalid)
  //     );
  //   } else {
  //     const { invalid } = this.state;
  //     delete invalid[index];
  //     this.setState({
  //       ...this.state,
  //       invalid
  //     });
  //   }
  // }
 
  handlePress = () => {
    // const invalid = validate(this.state.cis, constraints);
    
    // if (!invalid) {
    //   this.props.addAttributes(this.state.cis);
    //   this.props.navigation.navigate("CIS11");
    // } else {
    //   this.setState({
    //     invalid: invalid
    //   });
    // }

    this.props.addAttributes(this.state.cis);
    this.props.navigation.navigate("CIS11");
  };

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
              <PNFormHeader>Signature or Fingerprint:</PNFormHeader>
              <ScrollView
                style={localStyle.container}
                contentContainerStyle={localStyle.contentContainer}
              >
                  <Text style={{ textAlign: "center" }}>
                    Signature or Fingerprint
                  </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(CIS10);
