import React from "react";
import { StyleSheet, Text, ViewPropTypes } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export const Dropdown = (props) => {
  const {
    itemStyle,
    activeItemStyle,
    labelStyle,
    activeLabelStyle,
    selectedLabelStyle,
    dropDownStyle,
    containerStyle,
    placeholderStyle,
    arrowStyle,
    searchableStyle,
    style,
    ...dropdownProps
  } = props

  return (
    <DropDownPicker
      itemStyle={{
        ...styles.itemStyle,
        ...itemStyle
      }}
      activeItemStyle={{
        ...styles.activeItemStyle,
        ...activeItemStyle
      }}
      labelStyle={{
        ...styles.labelStyle,
        ...labelStyle
      }}
      activeLabelStyle={{
        ...styles.activeLabelStyle,
        ...activeLabelStyle
      }}
      selectedLabelStyle={{
        ...styles.selectedLabelStyle,
        ...selectedLabelStyle
      }}
      dropDownStyle={{
        ...styles.dropDownStyle,
        ...dropDownStyle
      }}
      containerStyle={{
        ...styles.containerStyle,
        ...containerStyle
      }}
      placeholderStyle={{
        ...styles.placeholderStyle,
        ...placeholderStyle
      }}
      arrowStyle={{
        ...styles.arrowStyle,
        ...arrowStyle
      }}
      searchableStyle={{
        ...styles.searchableStyle,
        ...searchableStyle
      }}
      style={{
        ...styles.style,
        ...style
      }}
      {...dropdownProps}
    />
  );
};

Dropdown.propTypes = {
  ...DropDownPicker.propTypes,
  itemStyle: ViewPropTypes.style,
  activeItemStyle: ViewPropTypes.style,
  labelStyle: Text.propTypes.style,
  activeLabelStyle: Text.propTypes.style,
  selectedLabelStyle: Text.propTypes.style,
  dropDownStyle: ViewPropTypes.style,
  containerStyle: ViewPropTypes.style,
  placeholderStyle: Text.propTypes.style,
  arrowStyle: ViewPropTypes.style,
  searchableStyle: Text.propTypes.style,
  style: ViewPropTypes.style,
}

Dropdown.defaultProps = {
  arrowColor: "#f9a010",
}

export default Dropdown;

const styles = StyleSheet.create({
  itemStyle: {
    justifyContent: "flex-start",
  },
  activeItemStyle: {
    justifyContent: "flex-start",
    color: "#f5ac14",
  },
  labelStyle: {
    color: "#444",
    fontFamily: "Avenir_Book",
    fontSize: 15,
  },
  activeLabelStyle: {
    color: "#f5ac14",
  },
  selectedLabelStyle: {
    color: "#f5ac14",
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
  },
  dropDownStyle: { backgroundColor: "#FFF" },
  containerStyle: { height: 40, marginBottom: 40 },
  placeholderStyle: {
    color: "#444",
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
  },
  arrowStyle: {},
  searchableStyle: {},
  style: {
    backgroundColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomColor: "#e1e1e5",
  },
});
