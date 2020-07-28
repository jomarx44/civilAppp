import React from 'react'
<<<<<<< HEAD
import { View } from 'react-native'
import Modal from "react-native-modal";
import { styles } from "./styles"

export const MenuModal = (props) => {
=======
import { StyleSheet, Text, View } from 'react-native'
import Modal from "react-native-modal";
import { styles } from "./styles"

const MenuModal = (props) => {
>>>>>>> AC/pnmobile-live
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
