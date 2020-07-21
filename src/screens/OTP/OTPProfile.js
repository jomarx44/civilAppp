import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ModifiedOTP } from "./ModifiedOTP"

export const OTPProfile = (props) => {
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

OTPProfile.propTypes = {}

const mapStateToProps = (props) => ({});

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OTPProfile);
