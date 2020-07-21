export const config = {
  constraints: {
    email: {
      presence: {
        allowEmpty: false
      },
      email: {
        message: "isn't valid"
      }
    },
    password: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 8,
        message: "must be atleast 8 characters"
      }
    },
    confirmPassword: {
      presence: {
        allowEmpty: false
      },
      equality: {
        attribute: "password",
        message: "and Password did not matched."
      }
    },
    givenName: {
      presence: {
        allowEmpty: false
      }
    },
    familyName: {
      presence: {
        allowEmpty: false
      }
    },
    phoneNumber: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 10,
        message: "is not valid"
      }
    }
  }
};

export default config;
