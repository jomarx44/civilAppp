import React, { useRef, useState, useEffect, useCallback } from "react";
import { ActivityIndicator, View, StyleSheet, Text } from "react-native";
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
  ElectronicSignatureScreen,
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
  CLEAR_TOKENS,
  REQUEST_OTP_INITIALIZE,
  CHECK_OTP_INITIALIZE,
  CLEAR_TEMPORARY_KEY,
} from "../../actions/types";
import otpReducer from "../../reducers/OTPReducer/OTP_reducer";

const DEBUG = false;

export const CreateBankAccountScreen = ({
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
  ...props
}) => {
  const [page, setPage] = useState(0);
  const [accountInfo, setAccountInfo] = useState({});
  const [invalids, setInvalids] = useState({});
  const [isFetched, setFetch] = useState(false);
  const [isModalVisible, toggleModal] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  // References
  const refViewPager = useRef();

  useEffect(() => {
    initializeReducer();
  }, []);

  useEffect(() => {
    if (
      lists.homeOwnerships.length <= 0 ||
      lists.civilStatuses.length <= 0 ||
      lists.idTypes.length <= 0 ||
      lists.jobTitles.length <= 0 ||
      lists.nationalities.length <= 0 ||
      lists.fundSources.length <= 0
    ) {
      setTimeout(() => {
        getLists();
        setFetch(true);
      }, 300);
    }
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
          save_info: options.data,
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
              setLoading={setLoading}
              lists={lists}
              data={accountInfo}
              handleEvent={handleEvent}
              invalids={invalids}
              navigation={navigation}
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
          isVisible={
            lists.isFetching ||
            barangays.isFetching ||
            otp.isFetching ||
            isLoading
              ? true
              : false
          }
        >
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
});
const mapStateToProps = (state) => {
  // return {};
  const {
    lists: {
      meta,
      barangays,
      homeOwnership,
      civilStatus,
      idList,
      jobTitle,
      nationality,
      sourceOfFund,
    },
    city,
    appAttribute,
    otp,
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
      homeOwnerships: Object.values(homeOwnership.data),
      civilStatuses: Object.values(civilStatus.data),
      idTypes: Object.values(idList.data),
      jobTitles: Object.values(jobTitle.data),
      nationalities: Object.values(nationality.data),
      fundSources: Object.values(sourceOfFund.data),
      isFetching: meta.isFetching,
    },
    otp,
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
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
        type: CLEAR_TEMPORARY_KEY,
      });
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
          console.log(error);
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
