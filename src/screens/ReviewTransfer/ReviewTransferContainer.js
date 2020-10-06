import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Alert } from "react-native";

// Form Component
import { ReviewTransfer } from "./ReviewTransfer";

// Custom Component Here

// Others
import { config } from "./config";
import { transferMoney } from "../../API";

export const ReviewTransferContainer = (props) => {
  const [code, setCode] = useState({
    token: "",
    otp: "",
  });

  const { navigation, route } = props;

  useEffect(() => {
    if (!route.params?.transferMoneyData) {
      Alert.alert(
        "Review Transfer Error",
        "You must fill up the Transfer Money form first,",
        [{ text: "Go Back", onPress: navigation.goBack }]
      );
    }
  }, []);

  const handleSubmit = () => {
    navigation.navigate("OTPTransferMoney", {
      formData: route.params?.transferMoneyData,
    });
  };

  return (
    <React.Fragment>
      <ReviewTransfer
        data={route.params?.transferMoneyData}
        onSubmit={handleSubmit}
      />
    </React.Fragment>
  );
};

ReviewTransferContainer.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      transferMoneyData: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        bankCode: PropTypes.string.isRequired,
        recipientAccountNumber: PropTypes.string.isRequired,
        recipientMobileNumber: PropTypes.string.isRequired,
        recipientAccountName: PropTypes.string,
        sourceAccount: PropTypes.object.isRequired,
      }).isRequired,
    }),
  }),
};

const mapStateToProps = (state) => () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewTransferContainer);
