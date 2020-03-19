import React, { useState } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

// Custom Components
import PNFormTextBox from "library/components/PNFormTextBox";
import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import PNFormButton from "library/components/PNFormButton";

// Others
import API from "../../actions/api";

export const ChangeMobileNumberScreen = (props) => {
  const [newMobileNumber, setNewMobileNumber] = useState("");
  const [confirmMobileNumber, setConfirmMobileNumber] = useState("");

  handlePress = () => {

  }

  return (
    <PNContentWithTitleAndDescription title="Change Mobile Number" desc="">
      <PNFormTextBox 
        title="New Mobile Number"
        onChangeText={text => setNewMobileNumber(text)}
        value={newMobileNumber}
        // onSubmitEditing={() => this.input_middlename.current.focus()}
        // ref={this.input_firstname}
      />
      <PNFormButton
        onPress={() => {
          handlePress();
        }}
        // disabled={this.props.is_fetching}
        label="Next"
        // loading={this.props.is_fetching}
      />
    </PNContentWithTitleAndDescription>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeMobileNumberScreen)
