export const config = {
  colors: {
    emailTitle: "#444444",
    emailDescription: "#444444",
    transactionType: "#003d6f",
    transactionAmountDebit: "#003d6f",
    transactionAmountCredit: "#00b87b",
    transactionDate: "#77869e", 
  },
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