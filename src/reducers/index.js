import { combineReducers } from "redux";
import common from "./commonReducer";
import auth from "./authReducer";
import accountReducer from "./accountReducer";
import { accountDetailsReducer, accountsReducer } from "./AccountReducer";
import AppAttributeReducer from "./AppAttributeReducer";
import { cisReducer } from "./cisReducer";
import { cityReducer } from "./cityReducer";
import ListReducer from "./ListReducer";
import { LoaderReducer } from "./loaderReducer";
import { otpReducer } from "./OTPReducer";
import { profileReducer } from "./profileReducer";
import { tokenReducer } from "./tokenReducer";

export default combineReducers({
  common,
  auth,
  account: accountReducer,
  accounts: accountsReducer,
  accountDetails: accountDetailsReducer,
  appAttribute: AppAttributeReducer,
  cis: cisReducer,
  city: cityReducer,
  lists: ListReducer,
  loader: LoaderReducer,
  otp: otpReducer,
  profile: profileReducer,
  token: tokenReducer,
});
