export const config = {
  constraints: {
    bankCode: {
      presence: {
        allowEmpty: false,
      },
    },
    sourceAccountNumber: {
      presence: {
        allowEmpty: false,
      },
    },
    recipientAccountNumber: {
      presence: {
        allowEmpty: false,
      },
    },
    recipientAccountName: {
      presence: {
        allowEmpty: false,
      },
    },
    amount: {
      presence: {
        allowEmpty: false,
      },
    },
    recipientEmailAddress: {
      presence: {
        allowEmpty: false,
      },
    },
    recipientMobileNumber: {
      presence: {
        allowEmpty: false,
      },
    },
    paymentDescription: {
      presence: {
        allowEmpty: false,
      },
    },
  },
};

export default config;
