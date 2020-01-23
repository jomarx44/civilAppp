import React from "React";
import { Alert } from "react-native";
import NavigationService from "../navigation/NavigationService";
import { Toast } from "native-base";
import axios from "axios";
import {
  getMethod,
  postMethod,
  getMethodWithToken,
  postMethodWithToken,
  postMethodWithTokenApply,
  putMethod,
  putMethodWithToken,
  postOnly,
  getDataOnly,
  dispatchOnly,
  alertBox
} from "./axiosCalls";
import * as TYPE from "./types";
import * as Auth from "store/auth";

// Authentication

const loginInitial = (username, password) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    reducer_type: TYPE.LOGIN_INITIAL,
    params: {
      action: "signin",
      username: username,
      password: password
    }
  };
  return postMethod(json_data);
};

const login = (username, password) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    params: {
      action: "signin",
      username: username,
      password: password
    }
  };

  return dispatch => {
    dispatch({
      type: TYPE.LOGIN
    });
    return postOnly(json_data)
      .then(response => {
        dispatch({
          type: response.data.success ? TYPE.LOGIN_SUCCESS : TYPE.LOGIN_ERROR,
          payload: response.data
        });
      })
      .catch(error => {
        dispatch({
          type: TYPE.LOGIN_ERROR,
          payload: response.data
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const checkEmail = userId => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    reducer_type: TYPE.CHECK_EMAIL,
    params: {
      action: "isEmailVerified",
      userid: userId
    }
  };
  return postMethod(json_data);
};

const signup = userdata => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    reducer_type: TYPE.SIGNUP,
    params: {
      action: "signup",
      email: userdata.email,
      password: userdata.password,
      givenName: userdata.givenName,
      middleName: userdata.middleName,
      familyName: userdata.familyName,
      phoneNumber: userdata.phoneNumber
    }
  };
  return postMethod(json_data);
};

const verifyOTP = ({ token, otp }) => {
  const json_data = {
    path: "byteperbyte/CISVerify",
    params: {
      token,
      otp
    }
  };
  console.log("Verify OTP and Token: ", json_data);
  return dispatch => {
    dispatch({
      type: TYPE.CHECK_OTP
    });
    return getDataOnly(json_data)
      .then(response => {
        const response_data = response.data.data["Register.Info"];
        const has_data = checkStatus(response) && !response_data.ErrorMsg;

        dispatch(
          has_data
            ? {
                type: TYPE.CHECK_OTP_SUCCESS,
                payload: {
                  id: response.cis_no //CIS id
                }
              }
            : {
                type: TYPE.CHECK_OTP_ERROR,
                payload: {
                  isFetching: false,
                  success: false,
                  message: response_data.ErrorMsg
                }
              }
        );

        if (has_data) {
        }
      })
      .catch(error => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: TYPE.CHECK_OTP_ERROR,
          payload: {
            success: false,
            is_fetching: false,
            message: error
          }
        });
      });
  };
};

// Accounts

const checkAccount = ({
  first_name,
  middle_name,
  last_name,
  date_of_birth
}) => {
  const json_data = {
    path: "byteperbyte/CISCheck",
    params: {
      first_name,
      middle_name,
      last_name,
      date_of_birth
    }
  };
  console.log("Requesting OTP and Token: ", json_data);

  return dispatch => {
    dispatch({
      type: TYPE.REQUEST_OTP,
      payload: {
        is_fetching: true,
        success: null,
        message: ""
      }
    });

    return getDataOnly(json_data)
      .then(response => {
        const response_data = response.data.data["Register.Info"];
        const has_data = checkStatus(response) && !response_data.ErrorMsg;
        console.log(response_data);

        dispatch(
          has_data
            ? {
                type: TYPE.REQUEST_OTP_SUCCESS,
                payload: {
                  token: response_data.token
                }
              }
            : {
                type: TYPE.REQUEST_OTP_ERROR,
                payload: {
                  is_fetching: false,
                  success: false,
                  message: response_data.ErrorMsg
                }
              }
        );

        // has_data && NavigationService.navigate("OTPScreen");
      })
      .catch(error => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: REQUEST_OTP_ERROR,
          payload: {
            is_fetching: false,
            success: false,
            message: error
          }
        });
      });
  };
};

const getAccounts = cisno => {
  const json_data = {
    path: "byteperbyte/CISAccountInquiry",
    params: {
      cisno: cisno
    }
  };

  console.log(json_data);

  return dispatch => {
    console.log(json_data);
    return getDataOnly(json_data)
      .then(response => {
        console.log(response.data);
        if (response.data.status == "ok") {
          let accountListFormatted = [
            {
              title: "Loan Accounts",
              data: []
            },
            {
              title: "Time Deposit",
              data: []
            },
            {
              title: "Savings Account",
              data: []
            }
          ];

          const { data: output } = response;
          const accountList = output.data["Account.Info"].accts.a;

          accountList.map((account, index) => {
            let idx = 0;
            switch (account.accttype) {
              case "LN":
                idx = 0;
                break;
              case "TD":
                idx = 1;
                break;
              case "SA":
                idx = 2;
                break;
            }

            accountListFormatted[idx].data.push({
              key: index,
              title: account.Name1,
              acctno: account.AcctNoFormatted,
              balance: `PHP ${account.LedgerFormatted}`
            });
          });

          dispatch({
            type: TYPE.FETCH_ACCOUNTS_SUCCESS,
            payload: accountListFormatted
          });
        } else {
          dispatch({
            type: TYPE.FETCH_ACCOUNTS_ERROR,
            payload: {
              is_fetching: false,
              error: true,
              list: []
            }
          });
        }
      })
      .catch(error => {
        dispatch({
          type: TYPE.FETCH_ACCOUNTS_ERROR,
          payload: {
            is_fetching: false,
            error: true,
            list: []
          }
        });
        throw error;
      });
  };
};

const getAccountHistory = (acctno, count) => {
  const json_data = {
    path: "byteperbyte/AccountInquiryHistory",
    params: {
      acctno,
      count
    }
  };

  return getDataOnly(json_data);
};

const getAccountInfo = acctno => {
  const json_data = {
    path: "byteperbyte/AccountsInfo",
    params: {
      acctno
    }
  };

  return getDataOnly(json_data);
};

const getAccountDetails = (acctno, count) => {
  let accountDetails = {
    id: acctno, // Account Number
    balance: {
      raw: "", // Available Balance
      formatted: "" // Available Balance (Formatted)
    },
    currency: "", // Currency Code
    history: [], // History
    name: "", // Full Name (Name1)
    product: "", // Product
    status: {
      type: "", // Status
      code: "" // Status Number
    },
    type: {
      raw: "", // Account Type
      formatted: "" // Account Type (Formatted)
    }
  };

  return dispatch => {
    dispatch({
      type: TYPE.FETCH_ACCOUNTDETAILS
    });

    axios
      .all([getAccountInfo(acctno), getAccountHistory(acctno, count)])
      .then(
        axios.spread((info, history) => {
          if (!checkStatus(info)) {
            dispatch({
              type: TYPE.FETCH_ACCOUNTINFO_ERROR
            });
            return;
          }

          if (!checkStatus(history)) {
            dispatch({
              type: TYPE.FETCH_ACCOUNTSHISTORY_ERROR
            });
            return;
          }

          const {
            AccountStatus,
            AccountStatusNo,
            // AcctNo,
            // AcctNoFormatted,
            AcctType,
            AcctTypeFormatted,
            Available,
            AvailableFormatted,
            CurrencyCode,
            // ErrorMsg,
            // ErrorMsg2,
            // Float,
            // FloatFormatted,
            // Hold,
            // HoldFormatted,
            // Ledger,
            // LedgerFormatter,
            Name1,
            // Name2,
            Product
            // ReturnCode,
            // SourceofTransfer,
            // cs,
            // its,
            // sls,
            // tds
          } = info.data.data["Account.Info"];

          accountDetails.balance = {
            raw: Available,
            formatted: AvailableFormatted
          };
          accountDetails.type = {
            raw: AcctType,
            formatted: AcctTypeFormatted
          };
          accountDetails.status = {
            type: AccountStatus,
            code: AccountStatusNo
          };
          accountDetails.currency = CurrencyCode;
          // accountDetails.name = Name2 ? Name2 : Name1;
          accountDetails.history = history.data.data["Account.Info"].tis.ti.map(
            (history, index) => {
              return {
                id: index.toString(),
                title: history.tn,
                date: history.td,
                amount: history.dr
                  ? parseInt(history.dr)
                  : -Math.abs(parseInt(history.cr))
              };
            }
          );
          accountDetails.name = Name1;
          accountDetails.product = Product;

          dispatch({
            type: TYPE.FETCH_ACCOUNTDETAILS_SUCCESS,
            payload: accountDetails
          });
        })
      )
      .catch(error => {
        dispatch({
          type: TYPE.FETCH_ACCOUNTDETAILS_ERROR
        });
      });
  };
};

const checkStatus = response => {
  return response.data.status == "ok";
};

export default {
  loginInitial,
  login,
  checkEmail,
  signup,
  checkAccount,
  verifyOTP,
  getAccounts,
  getAccountHistory,
  getAccountInfo,
  getAccountDetails
};
