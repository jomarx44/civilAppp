import { combineReducers } from "redux";
import common from "./commonReducer";
import auth from "./authReducer";
import {accountDetailsReducer, accountsReducer} from "./accountReducer";

export default combineReducers({
  common,
  auth,
  accounts: accountsReducer,
  accountDetails: accountDetailsReducer
});
