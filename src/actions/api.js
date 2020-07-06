import { Alert } from "react-native";
import * as NavigationService from "../navigation/NavigationService";
import { Toast } from "native-base";
import axios from "axios";
import { postMethod, postOnly, getDataOnly, alertBox } from "./axiosCalls";
import {
  accountLink,
  accountLinkError,
  accountLinkInitialize,
  accountLinkSuccess,
} from "../redux/account/actions";
import * as Profile from "store/profile";
import * as TYPE from "./types";

// Helpers
import {
  dispatcher,
  optionsDispatch,
  APIErrorLogging,
} from "../library/helpers";

/*******************************
 *
 * Tokens
 *
 *******************************/

const getTokenByRefreshToken = (refreshToken) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "refresh_token",
      refresh_token: refreshToken,
    },
  };
};

/*******************************
 *
 * Authentication
 *
 *******************************/

const login = (username, password) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "signin",
      username: username,
      password: password,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.LOGIN,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: TYPE.LOGIN_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: TYPE.STORE_TOKENS,
            payload: {
              tokens: {
                access_token: response.data.access_token,
                id_token: response.data.id_token,
                refresh_token: response.data.refresh_token,
              },
              expires_in: response.data.expires_in,
            },
          });
        } else {
          dispatch({
            type: TYPE.LOGIN_ERROR,
            payload: response.data,
          });
          alertBox(response.data.message);
        }
      })
      .catch((error) => {
        APIErrorLogging("login", error);
        dispatch({
          type: TYPE.LOGIN_ERROR,
          payload: error,
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const loginByFingerprint = (refreshToken) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "refresh_token",
      refresh_token: refreshToken,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.LOGIN,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: TYPE.LOGIN_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: TYPE.STORE_TOKENS,
            payload: {
              tokens: {
                access_token: response.data.access_token,
                id_token: response.data.id_token,
                refresh_token: response.data.refresh_token,
              },
              expires_in: response.data.expires_in,
            },
          });
        } else {
          dispatch({
            type: TYPE.LOGIN_ERROR,
            payload: response.data,
          });
          alertBox(response.data.message);
        }
      })
      .catch((error) => {
        APIErrorLogging("loginByFingerprint", error);
        dispatch({
          type: TYPE.LOGIN_ERROR,
          payload: error,
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const forgotPassword = (username) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "forgotpassword",
      user: username,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.FORGOT_PASSWORD,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: TYPE.FORGOT_PASSWORD_SUCCESS,
            payload: {
              is_fetching: false,
              success: true,
              message: response.data.message,
            },
          });
          alertBox(response.data.message);
          NavigationService.navigate("Login");
        } else {
          dispatch({
            type: TYPE.FORGOT_PASSWORD_ERROR,
            payload: {
              is_fetching: false,
              sucess: false,
              message: response.data.message,
            },
          });
          alertBox(response.data.message);
        }
      })
      .catch((error) => {
        APIErrorLogging("forgotPassword", error);
        dispatch({
          type: TYPE.FORGOT_PASSWORD_ERROR,

          payload: {
            is_fetching: false,
            message: error,
          },
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const updateUserInformation = ({
  id,
  emails,
  phoneNumbers,
  userName,
  password,
  name,
}) => {
  let json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "updateUserByID",
      user_data: {
        id,
        active: true,
        emails,
        phoneNumbers,
        userName,
        password: password ? password : null,
        name,
      },
    },
  };

  Object.keys(json_data.body.user_data).forEach(
    (key) =>
      json_data.body.user_data[key] == null &&
      delete json_data.body.user_data[key]
  );

  return (dispatch) => {
    dispatch({
      type: TYPE.UPDATE_PROFILE,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: TYPE.UPDATE_PROFILE_SUCCESS,
            payload: response.data,
          });
        } else {
          dispatch({
            type: TYPE.UPDATE_PROFILE_ERROR,
            payload: { message: "" },
          });
        }
      })
      .catch((error) => {
        APIErrorLogging("updateUserInformation", error);
        dispatch({
          type: TYPE.UPDATE_PROFILE_ERROR,
          payload: { message: error },
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const checkEmail = (userId) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    reducer_type: TYPE.CHECK_EMAIL,
    params: {
      action: "isEmailVerified",
      userid: userId,
    },
  };

  // return dispatch => {
  //   dispatch()
  // }
  return postMethod(json_data);
};

// TO BE REFACTORED
// Can reuse the API for signup

const resend_email = (userId) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "resendUserVerification",
      userid: userId,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.RESEND_EMAIL,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: TYPE.RESEND_EMAIL_SUCCESS,
            payload: response.data,
          });
          alertBox(
            "Email Verification successfully resent. Please check your email."
          );
        } else {
          const error = JSON.parse(response.data.log_error);
          alertBox(error.detail);
          dispatch({
            type: TYPE.RESEND_EMAIL_ERROR,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        APIErrorLogging("resend_email", error);
        dispatch({
          type: TYPE.RESEND_EMAIL_ERROR,
          payload: error,
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

const signup = (userdata) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "signup",
      email: userdata.email,
      password: userdata.password,
      givenName: userdata.givenName,
      middleName: userdata.middleName,
      familyName: userdata.familyName,
      phoneNumber: userdata.phoneNumber,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.SIGNUP,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: TYPE.SIGNUP_SUCCESS,
            payload: response.data,
          });
          Profile.setSignUpData(response.data);
          NavigationService.navigate("EmailVerification");
          // NavigationService.navigate("CreateMobileAccount2");
        } else {
          const error = JSON.parse(response.data.log_error);
          alertBox(error.detail);
          dispatch({
            type: TYPE.SIGNUP_ERROR,
            payload: response.data,
          });
        }
      })
      .catch((error) => {
        APIErrorLogging("signup", error);
        dispatch({
          type: TYPE.SIGNUP_ERROR,
          payload: error,
        });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

// Accounts

const checkAccount = ({
  first_name,
  middle_name,
  last_name,
  date_of_birth,
}) => {
  const json_data = {
    path: "byteperbyte/CISCheck",
    params: {
      first_name,
      middle_name,
      last_name,
      date_of_birth,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.REQUEST_OTP,
    });

    // const test = () => {
    //   dispatch({
    //     type: TYPE.REQUEST_OTP_SUCCESS,
    //     payload: {
    //       token: "1961875",
    //     },
    //   });
    //   NavigationService.navigate("LinkAccountOTP");
    // };

    // const testingInterval = setInterval(() => {
    //   test();
    //   // otp = 8526710:
    //   clearInterval(testingInterval);
    // }, 2000);

    // return;

    return getDataOnly(json_data)
      .then((response) => {
        const response_data = response.data.data["Register.Info"];
        const has_data = !response_data.ErrorMsg;
        if (has_data) {
          dispatch({
            type: TYPE.REQUEST_OTP_SUCCESS,
            payload: {
              token: response_data.token,
            },
          });

          NavigationService.navigate("LinkAccountOTP");
        } else {
          dispatch({
            type: TYPE.REQUEST_OTP_ERROR,
            payload: {
              message: response_data.ErrorMsg,
            },
          });
          alertBox(response_data.ErrorMsg);
        }
      })
      .catch((error) => {
        APIErrorLogging("checkAccount", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: REQUEST_OTP_ERROR,
          payload: {
            isFetching: false,
            success: false,
            message: response_data.ErrorMsg,
            token: "",
          },
        });
      });
  };
};

const getAccounts = (cisno) => {
  const json_data = {
    path: "byteperbyte/CISAccountInquiry",
    params: {
      cisno: cisno,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.FETCH_ACCOUNTS,
    });
    return getDataOnly(json_data)
      .then((response) => {
        if (response.data.status == "ok") {
          let accountList = {
            LN: {
              title: "Loan Accounts",
              accounts: {},
              accountsById: [],
            },
            TD: {
              title: "Time Deposit",
              accounts: {},
              accountsById: [],
            },
            SA: {
              title: "Savings Account",
              accounts: {},
              accountsById: [],
            },
          };

          const { data: output } = response;
          if (output.data["Account.Info"].accts) {
            const accounts = output.data["Account.Info"].accts.a;

            if (accounts instanceof Array) {
              accounts.map((account, index) => {
                if (accountList[account.accttype]) {
                  accountList[account.accttype].accounts[
                    account.AcctNoFormatted
                  ] = {
                    key: index,
                    title: account.Name1,
                    acctno: account.AcctNoFormatted,
                    balance: `PHP ${account.LedgerFormatted}`,
                  };
                  accountList[account.accttype].accountsById.push(
                    account.AcctNoFormatted
                  );
                }
              });
            } else {
              // Object
              if (accountList[accounts.accttype]) {
                accountList[accounts.accttype].accounts[
                  accounts.AcctNoFormatted
                ] = {
                  key: 1,
                  title: accounts.Name1,
                  acctno: accounts.AcctNoFormatted,
                  balance: `PHP ${accounts.LedgerFormatted}`,
                };
                accountList[accounts.accttype].accountsById.push(
                  accounts.AcctNoFormatted
                );
              }
            }
          }

          dispatch({
            type: TYPE.FETCH_ACCOUNTS_SUCCESS,
            payload: accountList,
          });
        } else {
          dispatch({
            type: TYPE.FETCH_ACCOUNTS_ERROR,
            payload: {
              is_fetching: false,
              error: true,
              list: [],
            },
          });
        }
      })
      .catch((error) => {
        APIErrorLogging("getAccounts", error);
        dispatch({
          type: TYPE.FETCH_ACCOUNTS_ERROR,
          payload: {
            is_fetching: false,
            error: true,
            list: [],
          },
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
      count,
    },
  };

  return getDataOnly(json_data);
};

const getAccountInfo = (acctno) => {
  const json_data = {
    path: "byteperbyte/AccountsInfo",
    params: {
      acctno,
    },
  };

  return getDataOnly(json_data);
};

const getAccountDetails = (acctno, count) => {
  let accountDetails = {
    id: acctno, // Account Number
    balance: {
      raw: "", // Available Balance
      formatted: "", // Available Balance (Formatted)
    },
    currency: "", // Currency Code
    history: [], // History
    name: "", // Full Name (Name1)
    product: "", // Product
    status: {
      type: "", // Status
      code: "", // Status Number
    },
    type: {
      raw: "", // Account Type
      formatted: "", // Account Type (Formatted)
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.FETCH_ACCOUNTDETAILS,
    });

    axios
      .all([getAccountInfo(acctno), getAccountHistory(acctno, count)])
      .then(
        axios.spread((info, history) => {
          if (info.data.data["Account.Info"].ErrorMsg !== "") {
            alertBox(
              "Ooops! There's something wrong connecting to the server. Please try again."
            );

            NavigationService.navigate("Dashboard");
            dispatch({
              type: TYPE.FETCH_ACCOUNTINFO_ERROR,
            });
            return;
          }

          if (history.data.data["Account.Info"].ErrorMsg !== "") {
            alertBox(
              "Ooops! There's something wrong connecting to the server. Please try again."
            );

            NavigationService.navigate("Dashboard");
            dispatch({
              type: TYPE.FETCH_ACCOUNTSHISTORY_ERROR,
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
            Product,
            // ReturnCode,
            // SourceofTransfer,
            // cs,
            // its,
            // sls,
            // tds
          } = info.data.data["Account.Info"];

          accountDetails.balance = {
            raw: Available ? Available : "",
            formatted: AvailableFormatted ? AvailableFormatted : "",
          };
          accountDetails.type = {
            raw: AcctType ? AvailableFormatted : "",
            formatted: AcctTypeFormatted ? AcctTypeFormatted : "",
          };
          accountDetails.status = {
            type: AccountStatus ? AccountStatus : "",
            code: AccountStatusNo ? AccountStatusNo : "",
          };
          accountDetails.currency = CurrencyCode ? CurrencyCode : "";

          if (
            history.data.data["Account.Info"].tis !== null &&
            history.data.data["Account.Info"].tis.ti instanceof Array
          ) {
            accountDetails.history = history.data.data[
              "Account.Info"
            ].tis.ti.map((history, index) => {
              return {
                id: index.toString(),
                title: history.tn,
                date: history.td,
                amount: history.dr
                  ? parseInt(history.dr)
                  : -Math.abs(parseInt(history.cr)),
              };
            });
          }

          accountDetails.name = Name1 ? Name1 : "";
          accountDetails.product = Product ? Product : "";

          dispatch({
            type: TYPE.FETCH_ACCOUNTDETAILS_SUCCESS,
            payload: {
              account: {
                [acctno]: accountDetails,
              },
            },
          });
        })
      )
      .catch((error) => {
        APIErrorLogging("getAccountDetails", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );

        NavigationService.navigate("Dashboard");
        dispatch({
          type: TYPE.FETCH_ACCOUNTDETAILS_ERROR,
        });
      });
  };
};

const createBankAccount = (accountData) => {
  const json_data = {
    path: "sunsavings/SSCreateAccountRequest",
    body: accountData,
  };

  return postOnly(json_data);
};

const addBankAccount = ({ id, accountData, access_token }) => {
  return (dispatch) => {
    return putAttributes({
      name: id,
      value: accountData,
      access_token,
    })
      .then(({ data: { data, status, msg } }) => {})
      .catch((error) => {
        APIErrorLogging("addBankAccount", error);
        dispatch({
          type: TYPE.ADD_ACCOUNT_ERROR,
        });
      });
  };
};

const linkAccount = ({ cis_no, access_token }) => {
  return putAttributes({
    name: "cis_no",
    value: cis_no,
    access_token,
  });
};

const linkAccountWithDispatch = ({ cis_no, access_token }) => {
  return (dispatch) => {
    dispatch(accountLink());
    return linkAccount({ cis_no, access_token })
      .then(({ data }) => {
        if(data.success == true) {
          dispatch(accountLinkSuccess());
        } else {
          dispatch(accountLinkError("Error"))
        }
      })
      .catch((error) => {
        APIErrorLogging("linkAccountWithDispatch", error);
        dispatch(accountLinkError(error));
      });
  };
};

const createBankAccout = ({ uniqueId, attributes, access_token }) => {
  return (
    putAttributes({
      name: uniqueId,
      value: attributes,
      access_token,
    })
      // .then(({data: {data, status, msg}}) => {
      .then(({ data }) => {
        if (data.status == "error") {
        } else {
          NavigationService.navigate("Dashboard");
          alertBox("Created Bank Account successfully!");
        }
      })
      .catch((error) => {
        APIErrorLogging("createBankAccout", error);
      })
  );
};

const putAttributes = ({ name, value, access_token }) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "put_attribute_name",
      attribute_name: name,
      attribute_value: value,
      access_token: access_token,
    },
  };

  return postOnly(json_data);
};

/*******************************
 *
 * CIS
 *
 *******************************/

const CISVerify = ({ token, otp }) => {
  const json_data = {
    path: "byteperbyte/CISVerify",
    params: {
      token,
      otp,
    },
  };

  return getDataOnly(json_data);
};

/*******************************
 *
 * Profile
 *
 *******************************/

const getProfile = ({ id }) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "getProfile",
      user_id: id,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.FETCH_PROFILE,
    });
    return postOnly(json_data)
      .then((response) => {
        if (response.data.success) {
          console.log("Response Data", response.data);
          const { attributes } = response.data;
          const {
            displayName,
            emails,
            id,
            name: { givenName, middleName, familyName },
            phoneNumbers,
          } = response.data.identities[0].idpUserInfo;

          dispatch({
            type: TYPE.FETCH_PROFILE_SUCCESS,
            payload: {
              id,
              attributes,
              emails,
              phoneNumbers,
              name: {
                displayName,
                givenName,
                middleName,
                familyName,
              },
            },
          });
        } else {
          dispatch({
            type: TYPE.FETCH_PROFILE_ERROR,
            payload: {
              message: response.data.message.error,
            },
          });
        }
      })
      .catch((error) => {
        APIErrorLogging("getProfile", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

// To be added
const saveProfile = ({
  id,
  attributes,
  givenName,
  middleName,
  familyName,
  emails,
  phoneNumber,
}) => {
  const json_data = {
    path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
    body: {
      action: "updateProfile",
      user_data: {
        id,
        emails,
        phoneNumber,
        given_name: givenName,
        middle_name: middleName,
        family_name: familyName,
        attributes: attributes,
      },
    },
  };

  Object.keys(json_data.body.user_data).forEach(
    (key) => json_data.body.user_data[key] == null && delete json_data.body.user_data[key]
  );

  console.log("json_data", json_data);

  return (dispatch) => {
    dispatch({
      type: TYPE.UPDATE_PROFILE,
    });
    return postOnly(json_data)
      .then(({data}) => {
        if(data.errorCode && data.errorCode !== "") {
          dispatch({
            type: TYPE.UPDATE_PROFILE_ERROR,
            payload: {
              message: data.message
            }
          });
        } else {
          dispatch({
            type: TYPE.UPDATE_PROFILE_SUCCESS,
            payload: {
              message: ""
            }
          });
        }
        
        console.log("response data: ", data);
      })
      .catch((error) => {
        console.log("error:", error)
        APIErrorLogging("saveProfile", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

/*******************************
 *
 * Loan
 *
 *******************************/

//  To be added
const loan = ({
  user_id,
  firstName,
  middleName,
  lastName,
  birthDate,
  amount,
  perCutOff,
  months,
}) => {
  const json_data = {
    path: "sunsavings/SSCreateLoanRequestMobile",
    body: {
      user_id,
      firstName,
      middleName,
      lastName,
      birthDate,
      amount,
      perCutOff,
      months,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.FETCH,
    });
    return postOnly(json_data)
      .then((response) => {
        let { data } = response;
        if (data.status == "ok") {
          Toast.show({
            text: data.msg,
            duration: 3000,
            type: "success",
          });
          dispatch({
            type: TYPE.FETCH_SUCCESS,
            payload: {
              message: data.msg,
            },
          });
        } else {
          Toast.show({
            text: data.msg,
            duration: 3000,
            type: "danger",
          });
          dispatch({
            type: TYPE.FETCH_ERROR,
            payload: {
              message: data.msg,
            },
          });
        }
        //
      })
      .catch((error) => {
        APIErrorLogging("loan", error);
        // dispatch({
        //   type: TYPE.LOAN_ERROR,
        //   payload: {
        //     is_fetching: false,
        //     message: error
        //   }
        // });
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
      });
  };
};

/*******************************
 *
 * Search
 *
 *******************************/

const searchByCity = (city) => {
  const json_data = {
    path: "/byteperbyte/MISSearch",
    params: {
      search: city,
    },
  };

  return (dispatch) => {
    dispatch({
      type: TYPE.SEARCH_CITY,
    });

    return getDataOnly(json_data)
      .then((response) => {
        dispatcher({
          dispatch,
          action: TYPE.SEARCH_CITY_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        APIErrorLogging("searchByCity", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatcher({
          dispatch,
          action: TYPE.SEARCH_CITY_ERROR,
          payload: {},
        });
      });
  };
};

/*******************************
 *
 * Lists
 *
 *******************************/

const getList = (type, additionalParams) => {
  const json_data = {
    path: "/byteperbyte//MISDropDown",
    params: {
      type,
      ...additionalParams,
    },
  };

  return getDataOnly(json_data);
};

const getBarangays = (city) => {
  return (dispatch) => {
    dispatcher({
      dispatch,
      action: TYPE.FETCH_BARANGAYS,
    });
    return getList("address", { city_code: city })
      .then(({ data }) => {
        if (data.status == "ok" && data.data instanceof Array) {
          const { data: lists } = data;
          let payload = {
            data: {},
            listsById: [],
          };

          lists.map((item) => {
            payload.data[item.id_code] = {
              label: item.description,
              value: item.path,
            };
            payload.listsById.push(item.id_code);
          });
          dispatcher({
            dispatch,
            action: TYPE.FETCH_BARANGAYS_SUCCESS,
            payload: payload,
          });
        } else {
          dispatcher({
            dispatch,
            action: TYPE.FETCH_BARANGAYS_ERROR,
          });
        }
      })
      .catch((error) => {
        APIErrorLogging("getBarangays", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatcher({
          dispatch,
          action: TYPE.FETCH_BARANGAYS_ERROR,
        });
      });
  };
};

const getLists = () => {
  return (dispatch) => {
    dispatch({
      type: TYPE.FETCH_LISTS,
    });
    axios
      .all([
        getList("civil_status"),
        getList("home_ownership"),
        getList("id_list"),
        getList("job_title"),
        getList("nationality"),
        getList("source_of_fund"),
      ])
      .then(
        axios.spread(
          (
            civilStatus,
            homeOwnership,
            idList,
            jobTitle,
            nationality,
            sourceOfFund
          ) => {
            // Civil Status
            optionsDispatch({
              data: civilStatus.data,
              type: "CIVILSTATUS",
              dispatch,
            });

            // Home Ownership
            optionsDispatch({
              data: homeOwnership.data,
              type: "HOMEOWNERSHIP",
              dispatch,
            });

            // ID List
            optionsDispatch({
              data: idList.data,
              type: "IDTYPE",
              dispatch,
            });

            // Job Title
            optionsDispatch({
              data: jobTitle.data,
              type: "JOBTITLE",
              dispatch,
            });

            // Nationality
            optionsDispatch({
              data: nationality.data,
              type: "NATIONALITY",
              dispatch,
            });

            // Source of Fund
            optionsDispatch({
              data: sourceOfFund.data,
              type: "FUNDSOURCE",
              dispatch,
            });

            dispatch({
              type: TYPE.FETCH_LISTS_SUCCESS,
            });
          }
        )
      )
      .catch((error) => {
        APIErrorLogging("getLists", error);
        alertBox(
          "Ooops! There's something wrong connecting to the server. Please try again."
        );
        dispatch({
          type: TYPE.FETCH_LISTS_ERROR,
        });
      });
  };
};

// Uploader
const upload = ({ file_name, content_type, data64 }) => {
  const json_data = {
    path: "sunsavings/SSFileUpload",
    body: {
      file_name: file_name,
      content_type: content_type,
      data64: data64,
    },
  };

  return postOnly(json_data);
};

/*******************************
 *
 * OTP
 *
 *******************************/

const requestOTP = ({ mobile_number, email, save_info }) => {
  const json_data = {
    // path: "tm/otp",
    path: "tm/otp_sunsavings",
    body: {
      mobile_number,
      email,
      save_info,
    },
  };

  Object.keys(json_data.body).forEach(
    (key) => json_data.body[key] == null && delete json_data.body[key]
  );

  return postOnly(json_data);
};

const verifyOTPBPB = ({ token, otp }) => {
  const json_data = {
    path: "byteperbyte/CISVerify",
    params: {
      token,
      otp,
    },
  };

  return getDataOnly(json_data);
};

const verifyOTPBPBwithDispatch = (payload) => {
  return (dispatch) => {
    dispatch({
      type: TYPE.CHECK_OTP,
    });

    return verifyOTPBPB(payload)
      .then(({ data: { data } }) => {
        if (data["Register.Info"].cis_no) {
          dispatch({
            type: TYPE.CHECK_OTP_SUCCESS,
            payload: {
              id: data["Register.Info"].cis_no, //CIS id
            },
          });
          dispatch({
            type: TYPE.CHECK_OTPTM_SUCCESS,
          });
        } else {
          dispatch({
            type: TYPE.CHECK_OTP_ERROR,
            payload: {
              message: data["Register.Info"].ErrorMsg,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: TYPE.CHECK_OTP_ERROR,
          payload: {
            message: error,
          },
        });
      });
  };
};

const verifyOTP = ({ token, otp }) => {
  const json_data = {
    path: "tm/otp_verify",
    body: {
      token: token + otp,
    },
  };

  return postOnly(json_data);
};

const createBankAccountOTP = ({ mobileNumber, data }) => {
  return (dispatch) => {
    requestOTP({
      mobile_number: mobileNumber,
      save_info: data,
    })
      .then((response) => {})
      .catch((error) => {});
  };
};

const checkStatus = (response) => {
  return response.data.status == "ok";
};

export default {
  login,
  loginByFingerprint,
  forgotPassword,
  updateUserInformation,
  checkEmail,
  resend_email,
  signup,
  checkAccount,
  getAccounts,
  getAccountHistory,
  getAccountInfo,
  getAccountDetails,
  createBankAccount,
  addBankAccount,
  CISVerify,
  linkAccount,
  linkAccountWithDispatch,
  createBankAccout,
  getProfile,
  saveProfile,
  loan,
  getList,
  getLists,
  getBarangays,
  searchByCity,
  upload,
  requestOTP,
  verifyOTP,
  verifyOTPBPB,
  verifyOTPBPBwithDispatch,
};
