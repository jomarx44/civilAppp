import React from 'react'
import PropTypes from 'prop-types'
import { Text, ViewPropTypes } from 'react-native'
import { MaterialIcons } from "@expo/vector-icons";
import { Card } from "../../../components"
import { styles } from "./styles"

export const BankItem = (props) => {
  const { children, style, onPress } = props
  return (
    <Card style={[styles.bankItemContainer, style]} onPress={onPress}>
      <Text style={styles.bankItemText}>{children}</Text>
      <MaterialIcons color="#dddddd" name="chevron-right" size={25} />
    </Card>
  )
}

BankItem.propTypes = {
  children: PropTypes.node,
  onPress: PropTypes.func,
  style: ViewPropTypes.style
}

export default BankItem;
