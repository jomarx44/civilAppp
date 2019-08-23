import { combineReducers } from 'redux';
import common from './commonReducer';
import auth from './authReducer';

export default combineReducers({
    common: common,
    auth: auth,
});
