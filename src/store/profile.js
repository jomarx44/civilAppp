import { AsyncStorage } from "react-native";

// USER PROFILE

export const setProfileData = json_data =>
  AsyncStorage.setItem("PROFILE_DATA", JSON.stringify(json_data));
export const deleteProfileData = () => AsyncStorage.removeItem("PROFILE_DATA");
export const getProfileData = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("PROFILE_DATA")
      .then(res => {
        if (res !== null) {
          const json_data = JSON.parse(res);
          resolve(json_data);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

// ACCESS DATA

export const setAccessData = json_data =>
  AsyncStorage.setItem("ACCESS_DATA", JSON.stringify(json_data));
export const deleteAccessData = () => AsyncStorage.removeItem("ACCESS_DATA");
export const getAccessData = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("ACCESS_DATA")
      .then(res => {
        if (res !== null) {
          const json_data = JSON.parse(res);
          resolve(json_data);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

// SIGN UP DATA

export const setSignUpData = json_data =>
  AsyncStorage.setItem("SIGNUP_DATA", JSON.stringify(json_data));
export const deleteSignUpData = () => AsyncStorage.removeItem("SIGNUP_DATA");
export const getSignUpData = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("SIGNUP_DATA")
      .then(res => {
        if (res !== null) {
          const json_data = JSON.parse(res);
          resolve(json_data);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

// FORM DATA

export const setFormData = json_data =>
  AsyncStorage.setItem("FORM_DATA", JSON.stringify(json_data));
export const deleteFormData = () => AsyncStorage.removeItem("FORM_DATA");
export const getFormData = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("FORM_DATA")
      .then(res => {
        if (res !== null) {
          const json_data = JSON.parse(res);
          resolve(json_data);
        } else {
          resolve(null);
        }
      })
      .catch(err => reject(err));
  });
};

// FOR PASSWORD VALIDATION IN CHANGE PASSWORD
export const setPassword = state => AsyncStorage.setItem("PASSWORD", state);
export const getPassword = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem("PASSWORD")
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
