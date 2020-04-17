import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import ViewPager from "@react-native-community/viewpager";
import { connect } from "react-redux";

// Custom Component
import Modal from "react-native-modal";
import {
  AdditionalInformationScreen,
  EmploymentInformationScreen,
  HomeInformationScreen,
  IDScreen,
  PersonalInformationScreen,
  ElectronicSignatureScreen
} from "./forms/SunSavingsBank/BankAccountFormScreen";

// Others
import API from "../../actions/api";
import validate from "validate.js";
import { AndroidBackHandler } from "react-navigation-backhandler";
import {
  REQUEST_OTP,
  REQUEST_OTP_ERROR,
  REQUEST_OTP_SUCCESS,
  ADD_ACCOUNT_INITIALIZE,
  ADDFIELD_ACCOUNT_FORMDATA,
  REQUEST_OTP_INITIALIZE,
  CHECK_OTP_INITIALIZE
} from "../../actions/types"

const DEBUG = true;

export const CreateBankAccountScreen = ({
  createBankAccount,
  navigation,

  // Store Props
  account,
  lists,
  barangays,
  city,

  // Dispatch
  getLists,
  searchByCity,
  getBarangays,
  requestOTP,
  addFormData,
  initializeReducer,
  ...props
}) => {
  const [page, setPage] = useState(0);
  const [accountInfo, setAccountInfo] = useState({
      title: 'N/A',
      appelation: 'N/A',
      firstName: 'Sample',
      middleName: 'Account',
      lastName: 'Lang',
      email: 'alvin@thousandminds.com',
      phoneNumber: '9953186216',
      gender: '1',
      birth_date: new Date(),
      place_of_birth: 'Taipei, Taiwan',
      mothers_maiden_name: 'Salvacion Viernes',
      home_address: 'Sample',
      home_village: 'Sample',
      home_phone: 'N/A',
      home_stayed_since: new Date(),
      government_id_1: 'Sample',
      government_id_2: 'Sample',
      id1_code: 'ID15',
      id2_code: 'ID22',
      job_title: 'ENG',
      job_title_desc: 'Engineer',
      nationality: 'PH',
      nationality_desc: 'Filipino',
      source_of_fund: 'REMIT',
      source_of_fund_desc: 'Allottee / Beneficiary',
      home_barangay_or_district: 'L/NCR/NCRD4/MAKATI/MAK100',
      civil_status: '3',
      civil_status_desc: 'Separated',
      city: 'MAKATI',
      city_description: 'City Of Makati',
      home_ownership: 'HO2',
      home_ownership_desc: 'Mortgaged',
      government_type_1: 'Seaman`s Book',
      government_type_2: 'School ID'
    });
  const [invalids, setInvalids] = useState({});
  const [isFetched, setFetch] = useState(false);
  const [isModalVisible, toggleModal] = useState(false);
  const [search, setSearch] = useState("");

  // References
  const refViewPager = useRef();

  useEffect(() => {
    initializeReducer();
  }, []);

  useEffect(() => {
    getLists();
    setFetch(true);
  }, [isFetched]);

  const handleOnBack = () => {
    if (page !== 0) {
      prev();
      return true;
    }

    return false;
  };

  const handleEvent = (eventType, options = {}) => {
    let { additionalValidate, index, fields, constraints } = options;
    switch (eventType) {
      case "onChange":
        if (options instanceof Array) {
          let items = {};
          options.map((item) => {
            items[item.index] = item.value;
          });
          setAccountInfo({
            ...accountInfo,
            ...items,
          });
        } else if (options) {
          setAccountInfo({
            ...accountInfo,
            [options.index]: options.value,
          });
        }
        break;

      case "onSearchChange":
        setSearch(options.value);
        break;

      case "onDateChange":
        setAccountInfo({
          ...accountInfo,
          [options.index]: options.value || accountInfo[options.index],
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

      case "onSelectCity":
        setAccountInfo({
          ...accountInfo,
          city: options.id,
          city_description: options.value,
        });
        getBarangays(options.id);
        break;

      case "onSearch":
        searchByCity(search);
        break;

      case "onNext":
        if (!DEBUG) {
          const currentInvalids = validate(fields, constraints);
          if (!currentInvalids) {
            next();
          } else {
            setInvalids(currentInvalids);
          }
        } else {
          next();
        }
        break;
      
      case "onAddFormData":
        addFormData(options.data);
        break;

      case "onSubmit":
        requestOTP({
          mobile_number: options.data.home_mobile,
          save_info: options.data
        })
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

  // Used by next() and prev()
  const go = (page) => {
    refViewPager.current.setPage(page);
  };

  const next = () => {
    const newPage = page + 1;
    setPage(newPage);
    go(newPage);
  };

  const prev = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      go(newPage);
    }
  };
  
  return (
    <AndroidBackHandler onBackPress={handleOnBack}>
      <View style={styles.containerStyle}>
        <ViewPager
          style={styles.viewPagerStyle}
          initialPage={0}
          scrollEnabled={false}
          ref={refViewPager}
        >
          <View key="1">
            <PersonalInformationScreen
              lists={lists}
              data={accountInfo}
              handleEvent={handleEvent}
              invalids={invalids}
            />
          </View>
          <View key="2">
            <AdditionalInformationScreen
              lists={lists}
              data={accountInfo}
              handleEvent={handleEvent}
              invalids={invalids}
            />
          </View>
          <View key="3">
            <HomeInformationScreen
              lists={lists}
              data={accountInfo}
              handleEvent={handleEvent}
              invalids={invalids}
              modalVisible={isModalVisible}
              search={search}
              city={city}
            />
          </View>
          <View key="4">
            <EmploymentInformationScreen
              lists={lists}
              data={accountInfo}
              handleEvent={handleEvent}
              invalids={invalids}
            />
          </View>
          <View key="5">
            <IDScreen
              lists={lists}
              data={accountInfo}
              handleEvent={handleEvent}
              invalids={invalids}
            />
          </View>
          <View key="6">
            <ElectronicSignatureScreen
              data={accountInfo}
              handleEvent={handleEvent}
            />
          </View>
        </ViewPager>
        <Modal
          isVisible={lists.isFetching || barangays.isFetching}
        >
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <ActivityIndicator color="#FFF" size="large" />
            <Text style={{color: "white"}}>Loading</Text>
          </View>
        </Modal>
        <Modal
          isVisible={account.isSaving}
        >
          <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
            <ActivityIndicator color="#FFF" size="large" />
            <Text style={{color: "white"}}>Creating Account...</Text>
          </View>
        </Modal>
      </View>
    </AndroidBackHandler>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  viewPagerStyle: {
    flex: 1,
  },
  slideContainerStyle: {
    flex: 1,
  },
});const mapStateToProps = (state) => {
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
    appAttribute
  } = state;

  return {
    account: {
      isSaving: appAttribute.isSaving
    },
    barangays: {
      isFetching: barangays.isFetching
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
  };
};

const mapDispatchToProps = (dispatch, {navigation}) => {
  return {
    initializeReducer: () => {
      dispatch({
        type: ADD_ACCOUNT_INITIALIZE,
      })
      dispatch({
        type: REQUEST_OTP_INITIALIZE,
      })
      dispatch({
        type: CHECK_OTP_INITIALIZE,
      })
    },
    addFormData: (data) => {
      dispatch({
        type: ADDFIELD_ACCOUNT_FORMDATA,
        payload: {
          formData: data
        }
      })
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
      //       token: "5479244",
      //     },
      //   });
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
  };
};

export const CreateBankAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateBankAccountScreen);

export default CreateBankAccount;