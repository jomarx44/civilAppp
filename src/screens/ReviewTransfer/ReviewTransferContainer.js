import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { StyleSheet, Text, View } from 'react-native'

// Custom Component Here
import { ReviewTransfer } from "./ReviewTransfer"

export const ReviewTransferContainer = (props) => {
  return (
    <ReviewTransfer

    />
  )
}

const mapStateToProps = (state) => () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewTransferContainer);

const styles = StyleSheet.create({})
