import React, { useRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text, View, ViewPropTypes } from "react-native";

export const FormComponent = (props) => {
  const {
    data,
    invalids,
    isSubmitting,
    onBlur,
    onChange,
    onSubmit,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text>Form Component</Text>
    </View>
  );
};

FormComponent.propTypes = {
  data: PropTypes.object,
  invalids: PropTypes.object,
  isSubmitting: PropTypes.bool,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default FormComponent;

const styles = StyleSheet.create({
  container: {},
});
