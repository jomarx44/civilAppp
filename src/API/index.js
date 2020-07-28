import { createIBMInstance, mainInstance } from "./config";

export const manage = (action, params = {}) => {
  return mainInstance.post("bf33cd0a-aa9c-4424-9253-bf0d82a101fd/manage", {
    action,
    ...params,
  });
};

export const getList = (type, additionalParams = {}) => {
  return mainInstance.get("/byteperbyte/MISDropDown", {
    params: {
      type,
      ...additionalParams,
    },
  });
};

export const attribute = {
  put: ({ attributeName, attributeValue, accessToken }) => {
    return manage("put_attribute_name", {
      attribute_name: attributeName,
      attribute_value: attributeValue,
      access_token: accessToken,
    });
  },
  get: (attributeName, accessToken) => {
    return manage("get_attribute_name", {
      attribute_name: attributeName,
      access_token: accessToken,
    });
  },
};

export const auth = {
  signin: (username, password) => {
    return manage("signin", { username, password });
  },

  resendEmail: (id) => {
    return manage("resendUserVerification", {
      userid: id,
    });
  },

  verifyEmail: (id) => {
    return manage("isEmailVerified", { userid: id });
  },

  forgotPassword: (username) => {
    return manage("forgotpassword", {
      user: username,
    });
  },
};

export const CIS = {
  check: ({ firstName, middleName, lastName, birthDate }) => {
    return mainInstance.get("byteperbyte/CISCheck", {
      params: {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        date_of_birth: birthDate,
      },
    });
  },

  verify: (token, otp) => {
    return mainInstance.get("byteperbyte/CISVerify", {
      params: {
        token,
        otp,
      },
    });
  },
};

export const bankAccount = {
  /**
   * Create Account
   * @description Used for creating Bank Accounts with provided account details
   * @param {Object} accountDetails Account Bank Details
   */
  create: (accountDetails = {}) => {
    return mainInstance.post(
      "sunsavings/SSCreateAccountRequest",
      accountDetails
    );
  },

  /**
   * Link Account
   * @description
   * @param {String} CISNumber CIS Number
   * @param {String} accessToken Access Token
   */
  link: (CISNumber, accessToken) => {
    return attribute.put({
      attributeName: "cis_no",
      attributeValue: CISNumber,
      accessToken,
    });
  },

  /**
   * Get Accounts
   * @description Used for fetching Bank Accounts based on CIS Number provided
   * @param {String} CISNo Customer Information System Number
   */
  get: (CISNo) => {
    return mainInstance.get("byteperbyte/CISAccountInquiry", {
      params: {
        cisno: CISNo,
      },
    });
  },

  /**
   * Get History
   * @description Used for fetching transaction history of bank account based on account number provided.
   * @param {String} accountNumber Bank Account Number
   * @param {} count Count
   */
  getHistory: (accountNumber, count) => {
    return mainInstance.get("byteperbyte/AccountInquiryHistory", {
      params: {
        acctno: accountNumber,
        count,
      },
    });
  },

  getInfo: (accountNumber) => {
    return mainInstance.get("byteperbyte/AccountsInfo", {
      params: {
        acctno: accountNumber,
      },
    });
  },
};

export const profile = {
  get: (id) => {
    return manage("getProfile", { user_id: id });
  },

  update: ({
    id,
    attributes,
    givenName,
    middleName,
    familyName,
    emails,
    phoneNumber,
  }) => {
    return manage("updateProfile", {
      id,
      attributes,
      givenName,
      middleName,
      familyName,
      emails,
      phoneNumber,
    });
  },
};

export const user = {
  create: ({
    email,
    password,
    givenName,
    middleName,
    familyName,
    phoneNumber,
  }) => {
    return manage("signup", {
      email,
      password,
      givenName,
      middleName,
      familyName,
      phoneNumber,
    });
  },

  update: ({ id, userName, password, name, emails, phoneNumbers }) => {
    return manage("updateUserByID", {
      id,
      userName,
      password,
      name,
      emails,
      phoneNumbers,
    });
  },

  getInfo: (accessToken) => {
    return createIBMInstance(accessToken).get("/userinfo");
  },
};

export const token = {
  getByRefreshToken: (refreshToken) => {
    return manage("refresh_token", { refresh_token: refreshToken });
  },
};

export const list = {
  getBank: () => {
    return mainInstance.get("/byteperbyte/BankList");
  },
  getCity: (city) => {
    return mainInstance.get("/byteperbyte/MISSearch", {
      params: {
        search: city,
      },
    });
  },
  getBarangay: (cityCode) => {
    return getList("address", { city_code: cityCode });
  },
  getCivilStatus: () => {
    return getList("civil_status");
  },
  getHomeOwnership: () => {
    return getList("home_ownership");
  },
  getIdList: () => {
    return getList("id_list");
  },
  getJobTitle: () => {
    return getList("job_title");
  },
  getNationality: () => {
    return getList("nationality");
  },
  getSourceOfFund: () => {
    return getList("source_of_fund");
  },
};

export const transferMoney = {
  otp: (accountNumber) => {
    return mainInstance.post("/byteperbyte/InstaPayOTP", {
      acctno: accountNumber
    })
  }
}