import AppJson from "../../app.json";
import Axios from "axios";
import Config from "../../app.json";
import Constants from "expo-constants";
import { captureException } from "sentry-expo"

export const mainInstance = Axios.create({
  baseURL: Config.appid.API_URL,
  timeout: 10000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "X-IBM-Client-Id": AppJson.appid.IBM_CLIENT_ID,
    "DeviceID": Constants.installationId,
    "DeviceName": Constants.deviceName
  },
});

export const createIBMInstance = (accessToken) => {
  return Axios.create({
    baseURL: `${Config.appid.APPID_AUTH_SERVER_HOST}/oauth/v4/${Config.appid.IBM_TENANT_ID}/`,
    timeout: 10000,
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
};

// For online error logging
mainInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  captureException(error)
  return Promise.reject(error);
})