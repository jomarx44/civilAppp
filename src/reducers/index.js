import { combineReducers } from "redux";
import common from "./commonReducer";
import auth from "./authReducer";
import account from "./accountReducer";

export default combineReducers({
  common,
  auth,
  account
});
