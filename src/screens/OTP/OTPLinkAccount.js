import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  CIS,
  bankAccount
} from "../../API"
import { ModifiedOTP } from "./ModifiedOTP"

export const OTPLinkAccount = (props) => {
  const [isLoading, setLoadingState] = useState(false);
  const { token, accessToken, navigation } = props;

  /**
   * Link Account Event Handler
   * @param {String} CISNumber CIS Number
   */
  const handleLinkAccount = (CISNumber) => {
    bankAccount.link(CISNumber, accessToken)
      .then(({ data }) => {
        navigation.navigate()
      })
      .catch((error) => {

      })
  }

  /**
   * CIS Verify Event Handler
   * @param {String} code OTP Code
   */
  const handleDone = (code) => {
    setLoadingState(true);
    CIS.verify(token, code)
      .then(({ data: { data } }) => {
        const { ErrorMsg: ErrorMessage, cis_no: CISNumber } = data["Register.Info"];
        if(CISNumber) {
          // Verified
          // Put CIS as attributes
          handleLinkAccount(CISNumber)
        } else {
          // Mismatch Token
        }
      })
      .catch((error) => {

      })
  }

  return (
    <ModifiedOTP 
      onDone={handleDone}
      isLoading={isLoading}
      loadingText=""
    />
  )
}

OTPLinkAccount.propTypes = {
  accessToken: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired, 
  navigation: PropTypes.object
}

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPLinkAccount);
