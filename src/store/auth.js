import { AsyncStorage } from "react-native";
import Config from "res/strings/main";

// PIN Authentication

export const onPinAuthenticated = () =>
  AsyncStorage.setItem("PIN_AUTHENTICATED", "true");
export const onPinDeauthenticate = () =>
  AsyncStorage.removeItem("PIN_AUTHENTICATED");
export const isPinAuthenticated = async () => {
  try {
    return value !== null;
  } catch (error) {
    throw error;
  }
};

// USER TOKEN
export const setToken = token => AsyncStorage.setItem("USER_TOKEN", token);
export const deleteToken = () => AsyncStorage.removeItem("USER_TOKEN");
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("USER_TOKEN");
  } catch (error) {
    throw error;
  }
};

export const isLoggedIn = async () => {
  try {
    const value = await AsyncStorage.getItem("USER_TOKEN");
    return value !== null;
  } catch (error) {
    throw error;
  }
};

// USER TOKEN
export const setLoggedState = state =>
  AsyncStorage.setItem("LOGGED_STATE", state);
export const deleteLoggedState = () => AsyncStorage.removeItem("LOGGED_STATE");
// export const getLoggedState = async() => {
//   return new Promise((resolve, reject) => {
//     AsyncStorage.getItem("LOGGED_STATE")
//       .then(res => {
//         if (res !== null) {
//           resolve(res);
//         } else {
//           resolve('None');
//         }
//       })
//       .catch(err => reject(err));
//   });
// };
export const getLoggedState = async () => {
  try {
    const value = await AsyncStorage.getItem("LOGGED_STATE");
    return value !== null ? value : " None";
  } catch (error) {
    throw error;
  }
};

// APP Screen Expiry
export const setBGEpochInactive = () => {
  const _sec = new Date().getTime() / 1000;
  AsyncStorage.setItem("EPOCH_INACTIVE", _sec.toString());
};
export const deleteBGEpochInactive = () =>
  AsyncStorage.removeItem("EPOCH_INACTIVE");
export const isInactiveFor15Minutes = async () => {
  try {
    const value = await AsyncStorage.getItem("EPOCH_INACTIVE");
    if (value !== null) {
      const last = parseFloat(res);
      const sec = new Date().getTime() / 1000;
      const diff = sec - last;
      const min = parseInt(diff / 60);
      return min >= Config.inactiveForMinutes;
    }
    
    return false;
  } catch (error) {
    throw error;
  }
};
