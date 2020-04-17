import React, { useState, useEffect } from "react";
import { ActivityIndicator, View, Text } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Custom Components
import PNFormTextBoxPhoneNumber from "library/components/PNFormTextBox-PhoneNumber";
import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import PNContainedButton from "../../library/components/Buttons/PNContainedButton";
import validate from "validate.js";
import Modal from "react-native-modal";

const constraints = {
  newMobileNumber: {
    presence: {
      allowEmpty: false,
    },
    length: {
      minimum: 10,
      message: "is not valid",
    },
  },
};

export const ChangeMobileNumberScreen = ({
  navigation,
  cis,
  otp,
  requestOTP,
}) => {
  const [newMobileNumber, setNewMobileNumber] = useState("");
  const [invalids, setInvalids] = useState({});

  const handlePress = () => {
    const currentInvalids = validate(
      {
        newMobileNumber,
      },
      constraints
    );
    if (!currentInvalids) {
      requestOTP({
        mobile_number: "63" + newMobileNumber,
        save_info: {
          mobile_number: "63" + newMobileNumber,
        },
      });
    } else {
      setInvalids(currentInvalids);
    }
  };

  const handleOnBlur = () => {
    const invalid = validate(
      {
        newMobileNumber,
      },
      constraints
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
      delete temporary_invalids.newMobileNumber;
      setInvalids(temporary_invalids);
    }
  };

  return (
    <React.Fragment>
      <PNContentWithTitleAndDescription
        title="Change Mobile Number"
        desc=""
        containerStyle={{ backgroundColor: "#F7F7F7" }}
      >
        <PNFormTextBoxPhoneNumber
          label="New Mobile Number"
          onChangeText={(text) => setNewMobileNumber(text)}
          onSubmitEditing={() => handlePress()}
          maxLength={10}
          value={newMobileNumber}
          onBlur={() => handleOnBlur()}
          invalid={invalids.newMobileNumber ? invalids.newMobileNumber[0] : ""}
        />
        <PNContainedButton
          buttonStyle={{ marginTop: 30 }}
          onPress={() => handlePress()}
          disabled={otp.isFetching}
          label="Next"
          loading={otp.isFetching}
        />
      </PNContentWithTitleAndDescription>
      <Modal isVisible={otp.isFetching}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator color="#FFF" size="large" />
          <Text style={{ color: "white" }}>Loading</Text>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ChangeMobileNumberScreen;
