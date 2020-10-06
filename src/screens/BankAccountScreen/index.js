import { CreateBankAccountScreen } from "./CreateBankAccountScreen";

import { connect } from "react-redux";
import API from "../../actions/api";
import {
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
  ADD_ACCOUNT_INITIALIZE,
  ADDFIELD_ACCOUNT_FORMDATA,
  REQUEST_OTP_INITIALIZE,
  CHECK_OTP_INITIALIZE
} from "../../actions/types"
import {requestOTP_TM} from "../../reducers/OTPReducer/OTP_actions"

const mapStateToProps = (state) => {
  const {
    lists: {
      meta,
      barangays,
      homeOwnerships,
      civilStatuses,
      idTypes,
      jobTitles,
      nationalities,
      fundSources,
    },
    city,
    appAttribute
  } = state;

  return {
    account: {
      isSaving: appAttribute.isSaving
    },
    barangays: {
      isFetching: barangays.isFetching
    },
    city,
    lists: {
      barangays: Object.values(barangays.data),
      homeOwnerships: Object.values(homeOwnerships.data),
      civilStatuses: Object.values(civilStatuses.data),
      idTypes: Object.values(idTypes.data),
      jobTitles: Object.values(jobTitles.data),
      nationalities: Object.values(nationalities.data),
      fundSources: Object.values(fundSources.data),
      isFetching: meta.isFetching,
    },
  };
};

const mapDispatchToProps = (dispatch, {navigation}) => {
  return {
    initializeReducer: () => {
      dispatch({
        type: ADD_ACCOUNT_INITIALIZE,
      })
      dispatch({
        type: REQUEST_OTP_INITIALIZE,
      })
      dispatch({
        type: CHECK_OTP_INITIALIZE,
      })
    },
    addFormData: (data) => {
      dispatch({
        type: ADDFIELD_ACCOUNT_FORMDATA,
        payload: {
          formData: data
        }
      })
    },
    getLists: () => {
      dispatch(API.getLists());
    },
    searchByCity: (city) => {
      dispatch(API.searchByCity(city));
    },
    getBarangays: (city) => {
      dispatch(API.getBarangays(city));
    },
    requestOTP: ({ mobile_number, save_info }) => {
      dispatch({
        type: REQUEST_OTP,
      });

      const test = () => {
        dispatch({
          type: REQUEST_OTP_SUCCESS,
          payload: {
            token: "5479244",
          },
        });
      navigation.navigate("OTPCreateBankAccountScreen");
      };

      const testingInterval = setInterval(() => {
        test();
        clearInterval(testingInterval);
      }, 2000);

      return;

      API.requestOTP({
        mobile_number,
        save_info,
      })
        .then(({ data: { token, status, msg } }) => {
          if (token && token != "") {
            dispatch({
              type: REQUEST_OTP_SUCCESS,
              payload: {
                token: token,
              },
            });
            navigation.navigate("OTPCreateBankAccountScreen");
          } else {
            dispatch({
              type: REQUEST_OTP_ERROR,
              payload: {
                message: msg,
              },
            });
          }
        })
        .catch((error) => {
          dispatch({
            type: REQUEST_OTP_ERROR,
            payload: {
              message: error,
            },
          });
        });
    },
  };
};

export const CreateBankAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBankAccountScreen);

export default CreateBankAccount;