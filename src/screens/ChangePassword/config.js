export const config = {
  constraints: {
    password: {
      presence: {
        allowEmpty: false,
      },
      length: {
        minimum: 8,
        message: "must be atleast 8 characters",
      },
    },
    confirmPassword: {
      presence: {
        allowEmpty: false,
      },
      equality: {
        attribute: "password",
        message: "and Password did not matched.",
      },
    },
  },
  validate: true
};

export default config;
