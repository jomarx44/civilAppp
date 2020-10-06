import React from 'react'
import PropTypes from 'prop-types'
import { Text, ViewPropTypes } from 'react-native'
import { styles } from "./styles"

export const OTPKeypadButtonText = (props) => {
  const { children, style} = props;
  return (
    <Text
      style={[styles.keypadButtonText, style]}
    >
      {children}
    </Text>
  )
}

OTPKeypadButtonText.propTypes = {
  children: PropTypes.string,
  style: ViewPropTypes.style
}

export default OTPKeypadButtonText
