import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ModifiedOTP } from "./ModifiedOTP"

export const OTPBankAccount = (props) => {
  const [isLoading, setLoadingState] = useState(false);

  const handleDone = (code) => {
    
  }

  return (
    <ModifiedOTP 
      onDone={handleDone}
      isLoading={isLoading}
      loadingText=""
    />
  )
}

OTPBankAccount.propTypes = {}

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPBankAccount);
