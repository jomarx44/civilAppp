import { combineReducers } from "redux";
import { accountReducer } from "./account/reducer";
// import {  } from "./auth/reducer";
import { BankAccountReducer } from "./bankAccount/reducer";
// import {  } from "./profile";

export default combineReducers({
  account: accountReducer,
  bankAccount: BankAccountReducer,
})