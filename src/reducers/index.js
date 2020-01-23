import { combineReducers } from "redux";
import common from "./commonReducer";
import auth from "./authReducer";
import {accountDetailsReducer, accountsReducer} from "./accountReducer";
import {otpReducer} from './otpReducer'
import {cisReducer} from './cisReducer';
import {tokenReducer} from './tokenReducer';

export default combineReducers({
  common,
  auth,
  otp: otpReducer,
  accounts: accountsReducer,
  accountDetails: accountDetailsReducer,
  cis: cisReducer,
  token: tokenReducer
});
