import React from "react";
import PropTypes from "prop-types";
import { ScrollView, View, ViewPropTypes } from "react-native";
import { styles } from "./styles";

export const FormScrollView = (props) => {
  const { children, style, contentContainerStyle } = props;
  return (
    <ScrollView
      persistentScrollbar={true}
      style={[styles.formScrollStyle, style]}
      contentContainerStyle={[
        styles.formScrollContentStyle,
        contentContainerStyle,
      ]}
    >
      {children}
    </ScrollView>
  )
}

export const FormContentView = (props) => {
  const { children, style } = props;
  return (
    <View style={[styles.formContentStyle, style]}>
      {children}
    </View>
  );
};

export const FormHeaderView = (props) => {
  const { children, style } = props;
  return <View style={[styles.formHeaderStyle, style]}>{children}</View>;
};

FormScrollView.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
  contentContainerStyle: ViewPropTypes.style,
};

FormContentView.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

FormHeaderView.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style,
};

export default FormContentView;
