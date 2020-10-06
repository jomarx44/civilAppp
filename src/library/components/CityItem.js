import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export const CityItem = ({containerStyle, titleStyle, descriptionStyle, data, onPress}) => {
  const {city, country, description, id_code, stateProv} = data;
  return (
    <TouchableOpacity style={[styles.defaultContainerStyle, containerStyle]} onPress={onPress}>
      <Text style={[styles.defaultCityTextStyle, titleStyle]}>{city}</Text>
      <Text style={[styles.defaultDescriptionStyle, descriptionStyle]}>{description}</Text>
    </TouchableOpacity>
  )
}

export default CityItem;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: "transparent",
    padding: 18,
    justifyContent: 'center',
  },
  defaultCityTextStyle: {
    color: "#003D6F",
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
    marginBottom: 2
  },
  defaultDescriptionStyle: {
    color: "#77869E",
    fontFamily: "Avenir_Roman",
    fontSize: 13
  }
})
