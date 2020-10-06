import React from 'react'
import PropTypes from 'prop-types'
import { Text, View, ViewPropTypes } from 'react-native'
import { OTPKeypad } from "./OTPKeypad"
import { OTPInputs } from "./OTPInputs"
import { Description, Title } from "../../components"
import { FormHeaderView } from "../../layouts"
import { styles } from "./styles"

export const OTP = (props) => {
  const { containerStyle, onChangeValue, onRemove, value } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <FormHeaderView style={[styles.header]}>
        <Title style={{color: "#FFF"}}>Verification Code</Title>
        <Description style={{color: "#FFF"}}>
          Please type the verification code sent to your mobile number.
        </Description>
      </FormHeaderView>
      <OTPInputs value={value} />
      <OTPKeypad 
        onChangeValue={onChangeValue}
        onRemove={onRemove}
      />
    </View>
  )
}

OTP.propTypes = {
  containerStyle: ViewPropTypes.style,
  onChangeValue: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default OTP
