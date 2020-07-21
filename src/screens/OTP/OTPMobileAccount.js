import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { ModifiedOTP } from "./ModifiedOTP"

export const OTPMobileAccount = (props) => {
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

OTPMobileAccount.propTypes = {}

export default OTPMobileAccount
