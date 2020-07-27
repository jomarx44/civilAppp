import { combineReducers } from "redux";
import { account } from "./account/reducer";
import { auth } from "./auth/reducer";
import { bankAccount } from "./bankAccount/reducer";
import { list } from "./list/reducer";
import { user } from "./user/reducer"

export default combineReducers({
  account,
  auth,
  bankAccount,
  list,
  user
})