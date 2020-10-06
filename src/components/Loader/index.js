import React from "react";
import PropTypes from "prop-types";
import { ActivityIndicator, Text, View, ViewPropTypes } from "react-native";
import Modal from "react-native-modal";
import { styles } from "./styles";

export const Loader = (props) => {
  const {
    isVisible,
    loadingIndicatorColor = "#FFF",
    loadingText = "Loading",
    loadingTextColor = "#FFF",
    modalStyle,
    containerStyle,
  } = props;
  return (
    <Modal isVisible={isVisible} style={[modalStyle]}>
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator color={loadingIndicatorColor} size="large" />
        <Text style={{ color: loadingTextColor }}>{loadingText}</Text>
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  loadingIndicatorColor: PropTypes.string,
  loadingText: PropTypes.string,
  loadingTextColor: PropTypes.string,
  modalStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
};

export default Loader;
