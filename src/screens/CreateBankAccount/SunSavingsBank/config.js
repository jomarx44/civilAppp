export const config = {
  personalInformation: {
    defaultFormValue: {
      title: "",
      appellation: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      gender: "",
      phoneNumber: "",
    },
    constraints: {
      title: {
        presence: {
          allowEmpty: false,
        },
      },
      appellation: {
        presence: {
          allowEmpty: false,
        },
      },
      firstName: {
        presence: {
          allowEmpty: false,
        },
      },
      lastName: {
        presence: {
          allowEmpty: false,
        },
      },
      email: {
        presence: {
          allowEmpty: false,
        },
        email: {
          message: "isn't valid",
        },
      },
      gender: {
        presence: {
          allowEmpty: false,
        },
      },
      phoneNumber: {
        presence: {
          allowEmpty: false,
        },
        length: {
          minimum: 10,
          message: "is not valid",
        },
      },
    },
  },
  additionalInformation: {
    defaultFormValue: {
      birthDate: "",
      placeOfBirth: "",
      mothersMaidenName: "",
      civilStatus: "",
      civilStatusDesc: "",
      nationality: "",
      nationalityDesc: "",
      isForeigner: 0,
    },
    constraints: {
      birthDate: {
        presence: {
          allowEmpty: false,
        },
      },
      placeOfBirth: {
        presence: {
          allowEmpty: false,
        },
      },
      mothersMaidenName: {
        presence: {
          allowEmpty: false,
        },
      },
      civilStatus: {
        presence: {
          allowEmpty: false,
        },
      },
      nationality: {
        presence: {
          allowEmpty: false,
        },
      },
    },
  },
  homeInformation: {
    defaultFormValue: {
      homeAddress: "",
      homeVillage: "",
      homeBarangayOrDistrict: "",
      homeOwnership: "",
      homeOwnershipDesc: "",
      homePhone: "",
      homeStayedSince: "",
    },
    constraints: {
      homeAddress: {
        presence: {
          allowEmpty: false,
        },
      },
      homeVillage: {
        presence: {
          allowEmpty: false,
        },
      },
      homeBarangayOrDistrict: {
        presence: {
          allowEmpty: false,
        },
      },
      homeStayedSince: {
        presence: {
          allowEmpty: false,
        },
      },
      homeOwnership: {
        presence: {
          allowEmpty: false,
        },
      },
      homePhone: {
        presence: {
          allowEmpty: false,
        },
      },
      cityDescription: {
        presence: {
          allowEmpty: false,
        },
      },
    },
  },
  employmentInformation: {
    defaultFormValue: {
      sourceOfFund: "",
      sourceOfFundDesc: "",
      jobTitle: "",
      jobTitleDesc: "",
    },
    constraints: {
      sourceOfFund: {
        presence: {
          allowEmpty: false,
        },
      },
      jobTitle: {
        presence: {
          allowEmpty: false,
        },
      },
    },
  },
  proofOfIdentity: {
    defaultFormValue: {
      id1Code: "",
      governmentId1: "",
      governmentType1: "",
      governmentId1Url: "",
      id2Code: "",
      governmentId2: "",
      governmentId2Url: "",
      governmentType2: "",
    },
    constraints: {
      governmentType1: {
        presence: {
          allowEmpty: false,
        },
      },
      governmentId1: {
        presence: {
          allowEmpty: false,
        },
      },
      governmentType2: {
        presence: {
          allowEmpty: false,
        },
        exclusion: {
          within: [governmentType1],
          message: "^Please choose another ID Type",
        },
      },
      governmentId2: {
        presence: {
          allowEmpty: false,
        },
      },
    },
  },
  electronicSigntaure: {
    defaultFormValue: {
      eSignatureId: "",
    },
    constraints: {},
  },
};

export default config;
