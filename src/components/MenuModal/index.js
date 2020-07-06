import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { styles } from "./styles"

const MenuModal = (props) => {
  const {isVisible, setVisibility, children} = props;
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
        {children}
      </View>
    </Modal>
  )
}

export default MenuModal;
