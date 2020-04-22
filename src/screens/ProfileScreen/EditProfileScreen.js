// To be added
import React, { createRef, useState, useEffect } from "react";
import { View } from "react-native";
import { connect } from "react-redux";

// Custom Component
import FormButtonContainer from "../../library/Layout/Containers/FormButtonContainer";
import PNContentWithTitle from "../../library/Layout/Content/PNContentWithTitle";
import PNFormTextBox from "library/components/PNFormTextBox";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";
import PNOutlineButton from "../../library/components/Buttons/PNOutlineButton";

// Others
import validate from "validate.js";
import API from "../../actions/api";

const constraints = {
  email: {
    presence: {
      allowEmpty: false,
    },
    email: {
      message: "isn't valid",
    },
  },
  givenName: {
    presence: {
      allowEmpty: false,
    },
  },
  familyName: {
    presence: {
      allowEmpty: false,
    },
  },
};

export const EditProfileScreen = ({
  profile: {
    data: {
      id,
      emails,
      name: { givenName, middleName, familyName },
      phoneNumbers
    }
  },
  saveProfile,
  updateUserInformation,
  navigation,
}) => {
  const [userInfo, setUserInfo] = useState({
    id,
    givenName,
    middleName,
    familyName,
    email: emails[0].value,
    phoneNumbers
  });
  const [invalids, setInvalids] = useState({});

  const input_givenName = createRef();
  const input_middleName = createRef();
  const input_familyName = createRef();
  const input_email = createRef();

  const constraints = {
    givenName: {
      presence: {
        allowEmpty: false,
      },
    },
    middleName: {
      presence: {
        allowEmpty: false,
      },
    },
    familyName: {
      presence: {
        allowEmpty: false,
      },
    },
    email: {
      presence: {
        allowEmpty: false,
      },
      email: {
        message: "isn't valid",
      },
    }
  };

  const handleEvent = (event, options = {}) => {
    const { additionalValidate, index, fields } = options;
    switch (event) {
      case "onChange":
        if (options instanceof Array) {
          let items = {};
          options.map((item) => {
            items[item.index] = item.value;
          });
          setUserInfo({
            ...userInfo,
            ...items,
          });
        } else if (options) {
          setUserInfo({
            ...userInfo,
            [options.index]: options.value,
          });
        }
        break;

      case "onChangeWithValidate":
        break;

      case "onBlur":
        const invalid = validate(
          {
            ...additionalValidate,
            [index]: userInfo[index],
          },
          {
            [index]: constraints[index],
          }
        );

        if (invalid) {
          // Add invalid
          setInvalids({
            ...invalids,
            ...invalid,
          });
        } else {
          // Then remove the invalid message on selected index
          const temporary_invalids = {
            ...invalids,
          };
          delete temporary_invalids[index];
          setInvalids(temporary_invalids);
        }

        break;

      case "onSubmit":
        const currentInvalids = validate(userInfo, constraints);
        if (!currentInvalids) {
          // Submit
          updateUserInformation({
            id: userInfo.id,
            name: {
              givenName: userInfo.givenName,
              middleName: userInfo.middleName,
              familyName: userInfo.familyName,
            },
            emails: [
              {
                "primary": true,
                "value": userInfo.email,
              },
            ],
            phoneNumbers
          });
        } else {
          setInvalids(currentInvalids);
        }
        break;

      default:
        break;
    }
  };

  return (
    <View style={{flex: 1}}>
      <PNContentWithTitle title="Edit Profile">
        <PNFormTextBox
          label="First Name"
          onChangeText={text => {
            handleEvent("onChange", {
              index: "givenName",
              value: text,
            })
          }}
          ref={input_givenName}
          onSubmitEditing={() => input_middleName.current.focus()}
          onBlur={() =>
            handleEvent("onBlur", {
              index: "givenName",
            })
          }
          invalid={invalids.givenName ? invalids.givenName[0] : ""}
          value={userInfo.givenName}
        />

        <PNFormTextBox
          label="Middle Name"
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "middleName",
              value: text,
            })
          }
          ref={input_middleName}
          onSubmitEditing={() => input_familyName.current.focus()}
          onBlur={() =>
            handleEvent("onBlur", {
              index: "middleName",
            })
          }
          invalid={invalids.middleName ? invalids.middleName[0] : ""}
          value={userInfo.middleName}
        />

        <PNFormTextBox
          label="Last Name"
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "familyName",
              value: text,
            })
          }
          ref={input_familyName}
          onSubmitEditing={() => input_email.current.focus()}
          onBlur={() =>
            handleEvent("onBlur", {
              index: "familyName",
            })
          }
          invalid={invalids.familyName ? invalids.familyName[0] : ""}
          value={userInfo.familyName}
        />

        <PNFormTextBox
          label="Email Address"
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "email",
              value: text,
            })
          }
          ref={input_email}
          onBlur={() =>
            handleEvent("onBlur", {
              index: "email",
            })
          }
          invalid={invalids.email ? invalids.email[0] : ""}
          value={userInfo.email}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNContainedButton 
          label="Save"
          onPress={() => {
            handleEvent("onSubmit")
          }}
        />
        <PNOutlineButton 
          label="Cancel"
          onPress={() => {
            navigation.goBack();
          }}
        />
      </FormButtonContainer>
    </View>
      
  );
};

const mapStateToProps = (state) => {
  const { profile } = state;
  return {
    profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInformation: (payload) => {
      dispatch(API.updateUserInformation(payload));
    },
    saveProfile: (payload) => {
      dispatch(API.saveProfile(payload));
    },
    getProfile: (payload) => {
      dispatch(API.getProfile(payload));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileScreen);
