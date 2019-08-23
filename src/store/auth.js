import {AsyncStorage} from 'react-native'
import Config from 'res/strings/main';


// PIN Authentication

export const onPinAuthenticated = () => AsyncStorage.setItem("PIN_AUTHENTICATED", "true");
export const onPinDeauthenticate = () => AsyncStorage.removeItem("PIN_AUTHENTICATED");
export const isPinAuthenticated = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("PIN_AUTHENTICATED")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

// USER TOKEN
export const setToken = ( token ) => AsyncStorage.setItem("USER_TOKEN", token);
export const deleteToken = ( ) => AsyncStorage.removeItem("USER_TOKEN");
export const getToken = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_TOKEN")
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

export const isLoggedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("USER_TOKEN")
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};


// USER TOKEN
export const setLoggedState = ( state ) => AsyncStorage.setItem("LOGGED_STATE", state);
export const deleteLoggedState = ( ) => AsyncStorage.removeItem("LOGGED_STATE");
export const getLoggedState = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("LOGGED_STATE")
      .then(res => {
        if (res !== null) {
          resolve(res);
        } else {
          resolve('None');
        }
      })
      .catch(err => reject(err));
  });
};

// APP Screen Expiry
export const setBGEpochInactive = () => {
    const _sec = (new Date).getTime() / 1000;
    //console.log("Time : " + _sec);
    AsyncStorage.setItem("EPOCH_INACTIVE", _sec.toString());
}
export const deleteBGEpochInactive = ( ) => AsyncStorage.removeItem("EPOCH_INACTIVE");
export const isInactiveFor15Minutes = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("EPOCH_INACTIVE")
      .then(res => {
        if (res !== null) {
          // compute inactivity
          const _last = parseFloat(res);
          const _sec = (new Date).getTime() / 1000;
          const _diff = _sec - _last;
          const _min = parseInt(_diff / 60);
        /*
          console.log("Time Last : " + _last);
          console.log("Time Now : " + _sec);
          console.log("Time Diff : " + parseInt(_diff));
          console.log("inactivity limit : " + Config.inactiveForMinutes);
          console.log("inactive for : " + _min);
         */

          if (_min >= Config.inactiveForMinutes) {
            resolve(true);
          }
          
          resolve(false);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};





