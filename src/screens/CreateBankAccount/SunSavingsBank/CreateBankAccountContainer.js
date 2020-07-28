import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import {
  CreateBankAccount
} from "./CreateBankAccount"
import { config } from "./config";
import validate from "validate.js";
import { getFormattedDate } from "library/helpers";
import API from "../../../actions/api";
import { getFormattedDate } from "library/helpers";
import Modal from "react-native-modal";

export const CreateBankAccountContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)((props) => {
  const [formData, setFormData] = useState({
    ...config.personalInformation.defaultFormValue,
    ...config.additionalInformation.defaultFormValue,
    ...config.homeInformation.defaultFormValue,
    ...config.employmentInformation.defaultFormValue,
    ...config.proofOfIdentity.defaultFormValue,
    ...config.electronicSigntaure.defaultFormValue,
  });
  const [invalids, setInvalids] = useState({});
  const [isFetched, setFetch] = useState(false);
  const [isModalVisible, toggleModal] = useState(false);
  const [search, setSearch] = useState("");

  const {
    createBankAccount,
    navigation,

    // Store Props
    account,
    lists,
    barangays,
    city,
    otp,

    // Dispatch
    getLists,
    searchByCity,
    getBarangays,
    requestOTP,
    addFormData,
    initializeReducer,
  } = props;

  useEffect(() => {
    initializeReducer();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      getLists();
      setFetch(true);
    }, 300);
  }, [isFetched]);

  const handleEvent = (event, options = null) => {
    let {
      additionalValidate,
      id,
      index,
      value,
      fields,
      constraints,
      next,
      fileName,
      contentType,
      data64,
      onUploadSuccess,
      onUploadError,
      home_mobile,
    } = options;
    switch (event) {
      case "onChange":
        if (options instanceof Array) {
          let items = {};
          options.map((item) => {
            items[item.index] = item.value;
          });
          setFormData({
            ...formData,
            ...items,
          });
        } else if (options) {
          setFormData({
            ...formData,
            [index]: ovalue,
          });
        }
        break;

      case "onDateChange":
        setFormData({
          ...formData,
          [index]: value || formData[index],
        });
        break;

      case "onBlur":
        const invalid = validate(
          {
            ...additionalValidate,
            [index]: accountInfo[index],
          },
          {
            [index]: constraints[index],
          }
        );

        if (invalid) {
          // Add invalid
          setInvalids({
            ...invalids,
            ...invalid,
          });
        } else {
          // Then remove the invalid message on selected index
          const temporary_invalids = {
            ...invalids,
          };
          delete temporary_invalids[index];
          setInvalids(temporary_invalids);
        }
        break;

      case "onSearchChange":
        setSearch(value);
        break;

      case "onSearch":
        searchByCity(search);
        break;

      case "onSelectCity":
        setAccountInfo({
          ...accountInfo,
          city: id,
          city_description: value,
        });
        getBarangays(id);
        break;

      case "onValidate":
        const currentInvalids = validate(fields, constraints);
        if (!currentInvalids) {
          next();
        } else {
          setInvalids(currentInvalids);
        }
        break;

      case "onSubmit":
        requestOTP({
          mobile_number: formData.phoneNumber,
          save_info: {
            title: formData.title,
            appelation: formData.appellation,
            fname: formData.firstName,
            mname: formData.middleName,
            lname: formData.lastName,
            email: formData.email,
            gender: formData.gender,
            phoneNumber: formData.phoneNumber,
            
            birth_date: getFormattedDate(formData.birthDate),
            place_of_birth: formData.placeOfBirth,
            mothers_maiden_name: formData.mothersMaidenName,
            civil_status: formData.civilStatus,
            civil_status_desc: formData.civilStatusDesc,
            nationality: formData.nationality,
            nationality_desc: formData.nationalityDesc,
            is_foreigner: formData.isForeigner,
  
            home_address: formData.homeAddress,
            home_village: formData.homeVillage,
            dynamic_address: formData.homeBarangayOrDistrict,
            h_ownership: formData.homeOwnership,
            home_ownership_desc: formData.homeOwnershipDesc,
            home_phone: formData.homePhone,
            home_mobile: "63" + formData.homeMobile,
            home_stayed_since: getFormattedDate(formData.homeStayedSince),
  
            source_of_fund: formData.sourceOfFund,
            source_of_fund_desc: formData.sourceOfFundDesc,
            job_title_path: formData.jobTitle,
            job_title_desc: formData.jobTitleDesc,
  
            id1_code: formData.id1Code,
            id1_ref: formData.governmentId1,
            id1_code_desc: formData.governmentType1,
            id1_url: formData.governmentId1Url,
            id2_code: formData.id2Code,
            id2_ref: formData.governmentId2,
            id2_url: formData.governmentId2Url,
            id2_code_desc: formData.governmentType2,
  
            eSignatureId: response[0]
          },
        });
        break;

      case "onUpload":
        API.upload({
          file_name: fileName,
          content_type: contentType,
          data64: data64,
        })
          .then(({data: {data, status, msg}}) => {
            if(status == "ok" && response.length > 0) {
              onUploadSuccess(data[0])
            } else {
              onUploadError(msg)
            }
          });
        break;

      case "onModalOpen":
        toggleModal(true);
        break;

      case "onModalClose":
        toggleModal(false);
        break;

      default:
        break;
    }
  };

  return (
    <React.Fragment>
      <CreateBankAccount 
        lists={lists}
        handleEvent={handleEvent}
        invalids={invalids}
        data={formData}
      />
      <Modal isVisible={lists.isFetching || barangays.isFetching || otp.isFetching ? true : false}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator color="#FFF" size="large" />
          <Text style={{ color: "white" }}>Loading</Text>
        </View>
      </Modal>
      <Modal isVisible={account.isSaving}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ActivityIndicator color="#FFF" size="large" />
          <Text style={{ color: "white" }}>Creating Account...</Text>
        </View>
      </Modal>
    </React.Fragment>
    
  );
});

const mapStateToProps = (state) => {
  const {
    lists: {
      meta,
      barangays,
      homeOwnerships,
      civilStatuses,
      idTypes,
      jobTitles,
      nationalities,
      fundSources,
    },
    city,
    appAttribute,
    otp
  } = state;

  return {
    account: {
      isSaving: appAttribute.isSaving,
    },
    barangays: {
      isFetching: barangays.isFetching,
    },
    city,
    lists: {
      barangays: Object.values(barangays.data),
      homeOwnerships: Object.values(homeOwnerships.data),
      civilStatuses: Object.values(civilStatuses.data),
      idTypes: Object.values(idTypes.data),
      jobTitles: Object.values(jobTitles.data),
      nationalities: Object.values(nationalities.data),
      fundSources: Object.values(fundSources.data),
      isFetching: meta.isFetching,
    },
    otp
  };
};

const mapDispatchToProps = (dispatch) => ({
  initializeReducer: () => {
    dispatch({
      type: ADD_ACCOUNT_INITIALIZE,
    });
    dispatch({
      type: REQUEST_OTP_INITIALIZE,
    });
    dispatch({
      type: CHECK_OTP_INITIALIZE,
    });
    dispatch({
      type: CLEAR_TEMPORARY_KEY
    })
  },
  addFormData: (data) => {
    dispatch({
      type: ADDFIELD_ACCOUNT_FORMDATA,
      payload: {
        formData: data,
      },
    });
  },
  getLists: () => {
    dispatch(API.getLists());
  },
  searchByCity: (city) => {
    dispatch(API.searchByCity(city));
  },
  getBarangays: (city) => {
    dispatch(API.getBarangays(city));
  },
  requestOTP: ({ mobile_number, save_info }) => {
    dispatch({
      type: REQUEST_OTP,
    });

    // const test = () => {
    //   dispatch({
    //     type: REQUEST_OTP_SUCCESS,
    //     payload: {
    //       token: "8174955",
    //     },
    //   });
    //   // otp = 1617542:
    // navigation.navigate("OTPCreateBankAccountScreen");
    // };

    // const testingInterval = setInterval(() => {
    //   test();
    //   clearInterval(testingInterval);
    // }, 2000);

    // return;

    API.requestOTP({
      mobile_number,
      save_info,
    })
      .then(({ data: { token, status, msg } }) => {
        if (token && token != "") {
          dispatch({
            type: REQUEST_OTP_SUCCESS,
            payload: {
              token: token,
            },
          });
          navigation.navigate("OTPCreateBankAccountScreen");
        } else {
          dispatch({
            type: REQUEST_OTP_ERROR,
            payload: {
              message: msg,
            },
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: REQUEST_OTP_ERROR,
          payload: {
            message: error,
          },
        });
      });
  },
});

export default CreateBankAccountContainer;
