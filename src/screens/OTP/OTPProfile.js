import React, { useState } from 'react'
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

export default OTPProfile
