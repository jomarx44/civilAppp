export const config = {
  constraints: {
    phoneNumber: {
      presence: {
        allowEmpty: false,
      },
      length: {
        minimum: 13,
        message: "^Mobile Number is not valid",
      },
    },
  },
  validate: true
};

export default config;
