export const config = {
  constraints: {
    firstName: {
      presence: {
        allowEmpty: false,
      },
    },
    middleName: {},
    lastName: {
      presence: {
        allowEmpty: false,
      },
    },
  },
  validate: true,
};

export default config;
