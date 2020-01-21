import React from "React";
import { Alert } from "react-native";
import { Toast } from "native-base";
import axios from "axios";
import querystring from "querystring";
import Constants from "expo-constants";
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

class Api {
  token = null;
  static instance = null;
  static getInstance() {
    if (Api.instance == null) {
      Api.instance = new Api();
    }
    return this.instance;
  }

  setToken(token) {
    this.token(token);
  }

  loginInitial(username, password) {
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
  }

  login(username, password) {
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
            type:
              response.data.status == "ok"
                ? TYPE.LOGIN_SUCCESS
                : TYPE.LOGIN_ERROR,
            payload: response.data
          });
        })
        .catch(error => {
          alertBox(
            "Ooops! There's something wrong connecting to the server. Please try again."
          );
        });
    };
  }

  checkEmail(userId) {
    const json_data = {
      path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
      reducer_type: TYPE.CHECK_EMAIL,
      params: {
        action: "isEmailVerified",
        userid: userId
      }
    };
    return postMethod(json_data);
  }

  signup(userdata) {
    console.log("userdata: ", userdata);
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
  }

  sendOTP(token, phoneNumber) {
    const json_data = {
      path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
      reducer_type: TYPE.OTP,
      params: {
        action: "send_otp",
        access_token: token,
        phone_number: phoneNumber
      }
    };
    return postMethod(json_data);
  }

  isOTPCorrect(token, otp) {
    const json_data = {
      path: "bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage",
      reducer_type: TYPE.OTP_CHECK,
      params: {
        action: "isOTPCorrect",
        access_token: token,
        otp: otp
      }
    };
    return postMethod(json_data);
  }

  getAccounts(cisno) {
    const json_data = {
      path: "byteperbyte/CISAccountInquiry",
      params: {
        cisno: cisno
      }
    };

    return dispatch => {
      return getDataOnly(json_data)
        .then(response => {
          console.log("Status: ", response.data.status);
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
              type: TYPE.FETCH_ACCOUNTS_ERROR
            });
          }
        })
        .catch(error => {
          throw error;
        });
    };
  }

  getAccountHistory(acctno, count) {
    const json_data = {
      path: "byteperbyte/AccountInquiryHistory",
      params: {
        acctno,
        count
      }
    };

    return getDataOnly(json_data);
  }

  getAccountInfo = acctno => {
    const json_data = {
      path: "byteperbyte/AccountsInfo",
      params: {
        acctno
      }
    };

    return getDataOnly(json_data);
  };

  getAccountDetails = (acctno, count) => {
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
        .all([
          this.getAccountInfo(acctno),
          this.getAccountHistory(acctno, count)
        ])
        .then(
          axios.spread((info, history) => {
            if (!this.checkStatus(info)) {
              dispatch({
                type: TYPE.FETCH_ACCOUNTINFO_ERROR
              });
              return;
            }

            if (!this.checkStatus(history)) {
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
            accountDetails.history = history.data.data[
              "Account.Info"
            ].tis.ti.map((history, index) => {
              return {
                id: index.toString(),
                title: history.tn,
                date: history.td,
                amount: history.dr
                  ? parseInt(history.dr)
                  : -Math.abs(parseInt(history.cr))
              };
            });
            accountDetails.name = Name1;
            accountDetails.product = Product;

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
          dispatch({
            type: TYPE.FETCH_ACCOUNTDETAILS_ERROR
          });
        });
    };
  };

  checkStatus = response => {
    return response.data.status == "ok";
  };
}

var instance = Api.getInstance();
module.exports = instance;
