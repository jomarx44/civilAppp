export const config = {
  company: {
    id: "SunSavingsBank",
    name: "Sun Savings Bank",
    logo: {
      login: require("res/images/SunSavingsBank/ic_logo_login.png"),
      sidebar: require("res/images/SunSavingsBank/ic_logo_login.png")
    } 
  },
  settings: {
    enableFingerprintLogin: true,
    enableCreateMobileAccount: true,
    enableAnnouncement: true,
    enableChangePassword: true,
    enableChangeMobileNumber: true,
    enableOTPMobile: true,
    enableOTPEmail: true,
  },
  icons: {
    drawer: require("res/images/ic_menu_white.png")
  },
};

export default config;