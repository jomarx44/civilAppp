import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View } from 'react-native'

// Custom Components Here
import { SelectSourceAccountList } from "./components/SelectSourceAccountList"

export const SelectSourceAccount = (props) => {
  const { data } = props;
  return (
    <View style={[styles.container]}>
      <SelectSourceAccountList 
        data={data}
      />
    </View>
  )
}

SelectSourceAccount.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      accountNumber: PropTypes.string,
      accountType: PropTypes.string,
      availableBalance: PropTypes.string,
      onPress: PropTypes.func
    })
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 50
  }
})
