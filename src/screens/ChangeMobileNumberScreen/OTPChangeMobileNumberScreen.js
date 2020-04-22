import React, {useState, useEffect} from 'react'
import { Alert, View, Text } from 'react-native'
import { connect } from 'react-redux'

// Custom Component
import { OTPScreen } from "../OTPScreen"
import API from "../../actions/api";
import {
  CHECK_OTP,
  CHECK_OTP_ERROR,
  CHECK_OTP_SUCCESS,
  CHECK_OTPTM_SUCCESS,
  CHECK_OTP_INITIALIZE,
  REQUEST_OTP_INITIALIZE,
  UPDATE_PROFILE_INITIALIZE
} from "../../actions/types"

export const OTPChangeMobileNumberScreen = ({otp, verifyOTP, profile, updateUserInformation, navigation, route, initializeReducers}) => {
  const [OTPValue, setOTPValue] = useState("");

  useEffect(() => {
    if(otp.isVerified === true) {
      let { id, emails, phoneNumbers, name } = profile.data;
      phoneNumbers[0].value = route.params.phoneNumber;
      updateUserInformation({
        id,
        phoneNumbers,
        emails,
        name
      });
    } else if(otp.success === false) {
      Alert.alert(
        "OTP",
        "Wrong OTP Code. Please try again"
      )
    }
  }, [otp.isVerified]);

  useEffect(() => {
    if(profile.isUpdated === true) {
      Alert.alert(
        "Change Mobile Number",
        "Mobile Number was successfully changed.",
        [
          {
            text: "Ok",
            onPress: () => {
              initializeReducers();
              navigation.navigate("ViewProfile");
            },
          },
        ]
      )
    }
    
  }, [profile.isUpdated])

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

const mapStateToProps = ({otp, cis, profile}) => ({
  otp,
  cis,
  profile
});

const mapDispatchToProps = (dispatch) => {
  return {
    initializeReducers: () => {
      dispatch({
        type: UPDATE_PROFILE_INITIALIZE,
      });
      dispatch({
        type: REQUEST_OTP_INITIALIZE,
      });
      dispatch({
        type: CHECK_OTP_INITIALIZE,
      });
    },
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
    updateUserInformation: payload => {
      dispatch(API.updateUserInformation(payload));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OTPChangeMobileNumberScreen)
