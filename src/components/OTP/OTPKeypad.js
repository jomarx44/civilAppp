import React from "react";
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { OTPKeypadButton } from "./OTPKeypadButton"
import { OTPKeypadButtonText } from "./OTPKeypadButtonText"
import { styles } from "./styles";

export const OTPKeypad = (props) => {
  const { onChangeValue, onRemove, style } = props;
  return (
    <View style={[styles.keypadContainer, style]}>
      <View style={styles.keypadRow}>
        <OTPKeypadButton onPress={() => onChangeValue("1")}>
          <OTPKeypadButtonText>1</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onChangeValue("2")}>
          <OTPKeypadButtonText>2</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onChangeValue("3")}>
          <OTPKeypadButtonText>3</OTPKeypadButtonText>
        </OTPKeypadButton>
      </View>
      <View style={styles.keypadRow}>
        <OTPKeypadButton onPress={() => onChangeValue("4")}>
          <OTPKeypadButtonText>4</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onChangeValue("5")}>
          <OTPKeypadButtonText>5</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onChangeValue("6")}>
          <OTPKeypadButtonText>6</OTPKeypadButtonText>
        </OTPKeypadButton>
      </View>
      <View style={styles.keypadRow}>
        <OTPKeypadButton onPress={() => onChangeValue("7")}>
          <OTPKeypadButtonText>7</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onChangeValue("8")}>
          <OTPKeypadButtonText>8</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onChangeValue("9")}>
          <OTPKeypadButtonText>9</OTPKeypadButtonText>
        </OTPKeypadButton>
      </View>
      <View style={[{ flexDirection: "row", alignSelf: "flex-end"}]}>
        <OTPKeypadButton onPress={() => onChangeValue("0")}>
          <OTPKeypadButtonText>0</OTPKeypadButtonText>
        </OTPKeypadButton>
        <OTPKeypadButton onPress={() => onRemove()}>
          <Feather name="delete" size={26} color="#FFF" />
        </OTPKeypadButton>
      </View>
    </View>
  );
};

OTPKeypad.propTypes = {
  onChangeValue: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  style: ViewPropTypes.style
}

export default OTPKeypad;
