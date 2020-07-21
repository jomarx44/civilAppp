import { AsyncStorage } from "react-native";

export const SignupDataAsyncStorage = {
  set: (items) => {
    return AsyncStorage.setItem("SIGNUP_DATA", items);
  },
  get: () => {
    return AsyncStorage.getItem("SIGNUP_DATA");
  },
  remove: () => {
    return AsyncStorage.removeItem("SIGNUP_DATA");
  },
};
