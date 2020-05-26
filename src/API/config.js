import Axios from "axios";
import Config from "../../app.json";
import Constants from "expo-constants";

Axios.defaults.baseURL = Config.appid.API_URL;
Axios.defaults.headers = {
  "Access-Control-Allow-Origin": "*",
  "Content-Type": "application/json",
  "X-IBM-Client-Id": AppJson.appid.IBM_CLIENT_ID,
  DeviceID: Constants.installationId,
  DeviceName: Constants.deviceName,
};
Axios.defaults.timeout = 10000;

export default Axios;