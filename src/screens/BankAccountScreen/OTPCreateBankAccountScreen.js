import React, {useState, useEffect} from 'react'
import { Alert, View, Text } from 'react-native'
import { connect } from 'react-redux'

// Custom Component
import { OTPScreen } from "../OTPScreen"
import API from "../../actions/api";
import {
  requestUniqueId
} from "../../reducers/AppAttributeReducer/AppAttribute_actions";
import {CHECK_OTP, CHECK_OTPTM_SUCCESS, CHECK_OTP_ERROR} from "../../actions/types";

export const OTPCreateBankAccountScreen = ({otp, auth, appAttribute, account, requestUniqueId, verifyOTP }) => {
  const [OTPValue, setOTPValue] = useState("");

  useEffect(() => {
    if(otp.isVerified === true) {
      requestUniqueId(account.formData)
    } else if(otp.isVerified === false) {
      Alert.alert(
        "OTP",
        "Wrong OTP Code. Please try again"
      )
    }
  }, [otp.isVerified]);

  useEffect(() => {
    if(appAttribute.temporary_key ) {
      API.createBankAccout({
        uniqueId: appAttribute.temporary_key,
        attributes: account.formData,
        access_token: auth.accessToken
      });
    }
  }, [appAttribute.temporary_key])

  const onDone = () => {
    verifyOTP({
      token: otp.token,
      otp: OTPValue
    });
  }

  return (
    <OTPScreen onDone={onDone} otp={otp} value={OTPValue} setValue={setOTPValue} />
  )
}

const mapStateToProps = ({auth, otp, account, user, appAttribute}) => ({
  auth,
  otp,
  user,
  account,
  appAttribute
})

const mapDispatchToProps = (dispatch) => {
  return {
    verifyOTP: ({token, otp}) => {
      dispatch({
        type: CHECK_OTP,
      });

      API.verifyOTP({token, otp})
        .then(({data: {data}}) => {
          
          if(data.status == "ok") {
            dispatch({
              type: CHECK_OTPTM_SUCCESS,
            });
          } else {
            dispatch({
              type: CHECK_OTP_ERROR,
              payload: {
                message: ""
              }
            });
          }
          // // for testing
          // dispatch({
          //   type: CHECK_OTPTM_SUCCESS,
          // });
        })
        .catch((error) => {
          
          dispatch({
            type: CHECK_OTP_ERROR,
            payload: {
              message: error
            }
          });
        });
    },
    requestUniqueId: attributes => {
      dispatch(requestUniqueId(attributes));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPCreateBankAccountScreen)
