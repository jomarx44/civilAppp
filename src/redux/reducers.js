import { combineReducers } from "redux";
import { account } from "./account/reducer";
import { auth } from "./auth/reducer";
import { bankAccount } from "./bankAccount/reducer";
// import {  } from "./profile";

export default combineReducers({
  account,
  auth,
  bankAccount,
})