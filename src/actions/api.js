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
import * as Profile from "store/profile";
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
    body: {
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
        if (response.data.success) {
          dispatch({
            type: TYPE.LOGIN_SUCCESS,
            payload: response.data
          });
        } else {
          dispatch({
            type: TYPE.LOGIN_ERROR,
            payload: response.data
          });
          alertBox(response.data.message);
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: TYPE.LOGIN_ERROR,
          payload: error
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const forgotPassword = username => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "forgotpassword",
      user: username
    }
  };

  return dispatch => {
    dispatch({
      type: TYPE.FORGOT_PASSWORD
    });
    return postOnly(json_data)
      .then(response => {
        if (response.data.success) {
          dispatch({
            type: TYPE.FORGOT_PASSWORD_SUCCESS,
            payload: {
              is_fetching: false,
              success: true,
              message: response.data.message
            }
          });
          alertBox(response.data.message);
          NavigationService.navigate("Login");
        } else {
          dispatch({
            type: TYPE.FORGOT_PASSWORD_ERROR,
            payload: {
              is_fetching: false,
              sucess: false,
              message: response.data.message
            }
          });
          alertBox(response.data.message);
        }
      })
      .catch(error => {
        dispatch({
          type: TYPE.FORGOT_PASSWORD_ERROR,

          payload: {
            is_fetching: false,
            message: error
          }
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

  console.log(json_data);
  // return dispatch => {
  //   dispatch()
  // }
  return postMethod(json_data);
};

// TO BE REFACTORED
// Can reuse the API for signup

const resend_email = userId => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "resendUserVerification",
      userid: userId
    }
  };

  return dispatch => {
    dispatch({
      type: TYPE.RESEND_EMAIL
    });
    return postOnly(json_data)
      .then(response => {
        console.log("TRIAL: ", response.data);
        if (response.data.success) {
          dispatch({
            type: TYPE.RESEND_EMAIL_SUCCESS,
            payload: response.data
          });
          alertBox("Email Verification successfully resent. Please check your email.")
        } else {
          const error = JSON.parse(response.data.log_error);
          alertBox(error.detail);
          dispatch({
            type: TYPE.RESEND_EMAIL_ERROR,
            payload: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: TYPE.RESEND_EMAIL_ERROR,
          payload: error
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
}

const signup = userdata => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "signup",
      email: userdata.email,
      password: userdata.password,
      givenName: userdata.givenName,
      middleName: userdata.middleName,
      familyName: userdata.familyName,
      phoneNumber: userdata.phoneNumber
    }
  };

  console.log(json_data);

  return dispatch => {
    dispatch({
      type: TYPE.SIGNUP
    });
    return postOnly(json_data)
      .then(response => {
        console.log("TRIAL: ", response.data);
        if (response.data.success) {
          dispatch({
            type: TYPE.SIGNUP_SUCCESS,
            payload: response.data
          });
          Profile.setSignUpData(response.data);
          NavigationService.navigate("EmailVerification");
        } else {
          const error = JSON.parse(response.data.log_error);
          alertBox(error.detail);
          dispatch({
            type: TYPE.SIGNUP_ERROR,
            payload: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
        dispatch({
          type: TYPE.SIGNUP_ERROR,
          payload: error
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
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
    });

    // const test = () => {
    //   dispatch({
    //     type: TYPE.REQUEST_OTP_SUCCESS,
    //     payload: {
    //       isFetching: false,
    //       message: "",
    //       success: true,
    //       token: "8399796"
    //     }
    //   });
    //   NavigationService.navigate("OTP");
    // }

    // const testingInterval = setInterval(() => {
    //   test();
    //   clearInterval(testingInterval);
    // }, 2000);

    // return;

    return getDataOnly(json_data)
      .then(response => {
        const response_data = response.data.data["Register.Info"];
        const has_data = checkStatus(response) && !response_data.ErrorMsg;
        console.log(response_data);

        if (has_data) {
          dispatch({
            type: TYPE.REQUEST_OTP_SUCCESS,
            payload: {
              isFetching: false,
              success: true,
              message: "",
              token: response_data.token
            }
          });
          NavigationService.navigate("OTP");
        } else {
          dispatch({
            type: TYPE.REQUEST_OTP_ERROR,
            payload: {
              isFetching: false,
              success: false,
              message: response_data.ErrorMsg,
              token: ""
            }
          });
          alertBox(
            "Ooops! There's something wrong connecting to the server. Please try again."
          );
        }
      })
      .catch(error => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: REQUEST_OTP_ERROR,
          payload: {
            isFetching: false,
            success: false,
            message: response_data.ErrorMsg,
            token: ""
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
          console.log("Info: ", info.data);
          if (info.data.data["Account.Info"].ErrorMsg !== "") {
            alertBox(
              "Ooops! There's something wrong connecting to the server. Please try again."
            );
            console.error(
              "Error while fetching Account Info: ",
              info.data.data["Account.Info"]
            );
            NavigationService.navigate("Dashboard");
            dispatch({
              type: TYPE.FETCH_ACCOUNTINFO_ERROR
            });
            return;
          }

          if (info.data.data["Account.Info"].ErrorMsg !== "") {
            alertBox(
              "Ooops! There's something wrong connecting to the server. Please try again."
            );
            NavigationService.navigate("Dashboard");
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
            raw: Available ? Available : "",
            formatted: AvailableFormatted ? AvailableFormatted : ""
          };
          accountDetails.type = {
            raw: AcctType ? AvailableFormatted : "",
            formatted: AcctTypeFormatted ? AcctTypeFormatted : ""
          };
          accountDetails.status = {
            type: AccountStatus ? AccountStatus : "",
            code: AccountStatusNo ? AccountStatusNo : ""
          };
          accountDetails.currency = CurrencyCode ? CurrencyCode : "";
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
          accountDetails.name = Name1 ? Name1 : "";
          accountDetails.product = Product ? Product : "";

          dispatch({
            type: TYPE.FETCH_ACCOUNTDETAILS_SUCCESS,
            payload: accountDetails
          });
        })
      )
      .catch(error => {
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        NavigationService.navigate("Dashboard");
        console.error("Error while fetching Account Info: ", error);
        dispatch({
          type: TYPE.FETCH_ACCOUNTDETAILS_ERROR
        });
      });
  };
};

const loan = payload => {};

const checkStatus = response => {
  return response.data.status == "ok";
};

export default {
  loginInitial,
  login,
  forgotPassword,
  checkEmail,
  resend_email,
  signup,
  checkAccount,
  verifyOTP,
  getAccounts,
  getAccountHistory,
  getAccountInfo,
  getAccountDetails,
  loan
};
