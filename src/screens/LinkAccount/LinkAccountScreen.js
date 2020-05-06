import React, {useState, useEffect} from "react";
import { connect } from "react-redux";

// Custom Components
import { LinkAccountForm } from "./LinkAccountForm";

// Others
import API from "../../actions/api";
import {
  ACCOUNT_LINK_INITIALIZE,
  REQUEST_OTP_INITIALIZE,
  CHECK_OTP_INITIALIZE,
  CLEAR_TEMPORARY_KEY,
  CLEAR_CIS,
} from "../../actions/types"
import { getFormattedDate } from "../../library/helpers";
import validate from "validate.js";

const constraints = {};

export const LinkAccount = ({
  checkAccount,
  initializeReducer,
  otp
}) => {
  const [accountInfo, setAccountInfo] = useState({
    accountNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    birthDate: new Date(),
    tin: "",
  });

  useEffect(() => {
    initializeReducer();
  }, [])

  const handleChange = (value, index) => {
    setAccountInfo({
      ...accountInfo,
      [index]: value
    });
  };

  const handleSubmit = () => {
    const {
      accountNumber,
      firstName,
      middleName,
      lastName,
      birthDate,
      tin,
    } = accountInfo;

    checkAccount({
      acctno: accountNumber,
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      date_of_birth: getFormattedDate(birthDate),
      tin: tin,
    });
  };

  return (
    <LinkAccountForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      accountInfo={accountInfo}
      isLoading={otp.isFetching}
    />
  );
}

const mapStateToProps = ({otp}, props) => {
  return { otp };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeReducer: () => {
      dispatch({
        type: CLEAR_CIS
      });
      dispatch({
        type: ACCOUNT_LINK_INITIALIZE,
      })
      dispatch({
        type: REQUEST_OTP_INITIALIZE,
      });
      dispatch({
        type: CHECK_OTP_INITIALIZE,
      });
      dispatch({
        type: CLEAR_TEMPORARY_KEY
      })
    },
    checkAccount: (account_info) => {
      dispatch(API.checkAccount(account_info));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LinkAccount);
