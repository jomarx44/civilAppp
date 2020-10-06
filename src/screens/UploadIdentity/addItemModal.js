import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Modal from "react-native-modal";
import DropDownPicker from "react-native-dropdown-picker";
import { itemStyles } from "./styles"

export const AddItemModal = (props) => {
  const {
    isVisible,
    setVisibility,
    disabled,
    items,
    defaultValue,
    placeholder,
    onChangeItem,
  } = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={() => {
        setVisibility(false);
      }}
      onBackdropPress={() => {
        setVisibility(false);
      }}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        <DropDownPicker
          disabled={disabled}
          items={items}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChangeItem={onChangeItem}
          style={{ backgroundColor: "#fff", width: "100%" }}
          containerStyle={{ height: 40 }}
          dropDownStyle={{ backgroundColor: "#fcfcfc" }}
          itemStyle={{
            height: 20,
            justifyContent: "flex-start",
          }}
          labelStyle={itemStyles.label}
          selectedLabelStyle={itemStyles.selectedLabel}
        />
      </View>
    </Modal>
  );
};

export default AddItemModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  contentContainer: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    height: 500,
    padding: 25,
    width: "100%",
  },
});


