import React, { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
} from "react-native";

// Custom Component
import Modal from "react-native-modal";
import SlideContainer from "library/components/SlideContainer";
import PNElectronicSignature from "library/components/PNElectronicSignature";
import PNStackedButtons from "library/Layout/Content/PNStackedButtons";
import { ContainedButton, OutlineButton } from "../../../../components/Buttons";
import PNContentWithTitle from "library/Layout/Content/PNContentWithTitle";

import PNFormContactInfo from "library/components/PNFormContactInfo";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormRadio from "library/components/PNFormRadio";
import PNFormDatePicker from "library/components/PNFormDatePicker";
import PNDropDown from "../../../../library/components/PNDropDown";

import PNFormButton from "library/components/PNFormButton";
import FormButtonContainer from "library/Layout/Containers/FormButtonContainer";
import { InputModal } from "../../../../library/components/Form/Inputs/Modal";
// import TransparentModal from "../../../../library/components/Modals/TransparentModal";
import CityItem from "../../../../library/components/CityItem";

// Others
import { getFormattedDate } from "library/helpers";
import axios from "axios";
import API from "../../../../actions/api";
import { ProofOfIdentity } from "../../../ProofOfIdentity";
// import {} from "../../../../reducers/"

export const PersonalInformationScreen = ({
  handleEvent,
  invalids,
  data: {
    title,
    appellation,
    firstName,
    middleName,
    lastName,
    email,
    gender,
    phoneNumber,
  },
}) => {
  const input_title = useRef();
  const input_appellation = useRef();
  const input_firstName = useRef();
  const input_middleName = useRef();
  const input_lastName = useRef();
  const input_email = useRef();
  const input_phoneNumber = useRef();

  const constraints = {
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
  };

  return (
    <React.Fragment>
      <PNContentWithTitle title="Personal Information">
        <PNFormInputBox
          placeholder="Title"
          ref={input_title}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "title",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_firstName.current.focus();
          }}
          value={title}
          onBlur={() => handleEvent("onBlur", { constraints, index: "title" })}
          invalid={invalids.title ? invalids.title[0] : ""}
        />
        <PNFormInputBox
          placeholder="First Name"
          ref={input_firstName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "firstName",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_middleName.current.focus();
          }}
          value={firstName}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "firstName" })
          }
          invalid={invalids.firstName ? invalids.firstName[0] : ""}
        />
        <PNFormInputBox
          placeholder="Middle Name"
          ref={input_middleName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "middleName",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_lastName.current.focus();
          }}
          value={middleName}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "middleName" })
          }
          invalid={invalids.middleName ? invalids.middleName[0] : ""}
        />
        <PNFormInputBox
          placeholder="Last Name"
          ref={input_lastName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "lastName",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_appellation.current.focus();
          }}
          value={lastName}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "lastName" })
          }
          invalid={invalids.lastName ? invalids.lastName[0] : ""}
        />
        <PNFormInputBox
          placeholder="Appellation"
          ref={input_appellation}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "appellation",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_phoneNumber.current.focus();
          }}
          value={appellation}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "appellation" })
          }
          invalid={invalids.appellation ? invalids.appellation[0] : ""}
        />
        <PNFormContactInfo
          title="Phone Number"
          ref={input_phoneNumber}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "phoneNumber",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_email.current.focus();
          }}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "phoneNumber" })
          }
          value={phoneNumber}
          invalid={invalids.phoneNumber ? invalids.phoneNumber[0] : ""}
        />
        <PNFormInputBox
          placeholder="Email Address"
          ref={input_email}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "email",
              value: text,
            })
          }
          onSubmitEditing={() => {
            // Focus Gender???
          }}
          value={email}
          onBlur={() => handleEvent("onBlur", { constraints, index: "email" })}
          invalid={invalids.email ? invalids.email[0] : ""}
        />
        <PNFormRadio
          items={[
            {
              onPress: () => {
                handleEvent("onChange", {
                  index: "gender",
                  value: "1",
                });
                // handleEvent("onBlur", { constraints, index: "gender" });
              },
              selected: gender == "1",
              title: "Male",
            },
            {
              onPress: () => {
                handleEvent("onChange", {
                  index: "gender",
                  value: "2",
                });
                // handleEvent("onBlur", { constraints, index: "gender" });
              },
              selected: gender == "2",
              title: "Female",
            },
          ]}
          invalid={invalids.gender ? invalids.gender[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: {
                title,
                appellation,
                firstName,
                middleName,
                lastName,
                email,
                phoneNumber,
                gender,
              },
              constraints,
            });
          }}
          disabled={false}
          label="NEXT"
        />
      </FormButtonContainer>
    </React.Fragment>
  );
};

export const AdditionalInformationScreen = ({
  handleEvent,
  invalids,
  data: {
    birth_date,
    place_of_birth,
    mothers_maiden_name,
    civil_status,
    nationality,
  },
  lists,
}) => {
  const input_birthPlace = useRef();
  const input_motherMaidenName = useRef();

  const constraints = {
    birth_date: {
      presence: {
        allowEmpty: false,
      },
    },
    place_of_birth: {
      presence: {
        allowEmpty: false,
      },
    },
    civil_status: {
      presence: {
        allowEmpty: false,
      },
    },
    mothers_maiden_name: {
      presence: {
        allowEmpty: false,
      },
    },
    nationality: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  return (
    <React.Fragment>
      <PNContentWithTitle title="Additional Information">
        <PNFormDatePicker
          title="Date of Birth"
          placeHolderText="Select Date of Birth"
          onDateChange={(date) => {
            handleEvent("onDateChange", {
              index: "birth_date",
              value: date,
            });
            // handleEvent("onBlur", { constraints, index: "birth_date" });
          }}
          maximumDate={new Date()}
          invalid={invalids.birth_date ? invalids.birth_date[0] : ""}
        />
        <PNFormInputBox
          placeholder="Place of Birth"
          ref={input_birthPlace}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "place_of_birth",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_motherMaidenName.current.focus();
          }}
          value={place_of_birth}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "place_of_birth" })
          }
          invalid={invalids.place_of_birth ? invalids.place_of_birth[0] : ""}
        />
        <PNFormInputBox
          placeholder="Mother's Maiden Name"
          ref={input_motherMaidenName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "mothers_maiden_name",
              value: text,
            })
          }
          // onSubmitEditing={() => {
          //
          //   this.input_middle_name.current.focus();
          // }}
          value={mothers_maiden_name}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "mothers_maiden_name" })
          }
          invalid={
            invalids.mothers_maiden_name ? invalids.mothers_maiden_name[0] : ""
          }
        />
        <PNDropDown
          placeholder={{ label: "Select Civil Status", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "civil_status",
                  value: value,
                },
                {
                  index: "civil_status_desc",
                  value: lists.civilStatus[index - 1].label,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "civil_status",
                  value: value,
                },
                {
                  index: "civil_status_desc",
                  value: null,
                },
              ]);
            }
            // handleEvent("onBlur", { constraints, index: "civil_status" });
          }}
          options={lists.civilStatus}
          selectedValue={civil_status}
          title="Civil Status"
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "civil_status" })
          // }
          invalid={invalids.civil_status ? invalids.civil_status[0] : ""}
        />
        <PNDropDown
          placeholder={{ label: "Select Nationality", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "nationality",
                  value: value,
                },
                {
                  index: "nationality_desc",
                  value: lists.nationality[index - 1].label,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "nationality",
                  value: value,
                },
                {
                  index: "nationality_desc",
                  value: null,
                },
              ]);
            }
          }}
          options={lists.nationality}
          selectedValue={nationality}
          title="Nationality"
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "nationality" })
          // }
          invalid={invalids.nationality ? invalids.nationality[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: {
                birth_date,
                place_of_birth,
                mothers_maiden_name,
                civil_status,
                nationality,
              },
              constraints,
            });
          }}
          disabled={false}
          label="NEXT"
        />
      </FormButtonContainer>
    </React.Fragment>
  );
};

export const HomeInformationScreen = ({
  handleEvent,
  invalids,
  lists,
  data: {
    home_address,
    home_village,
    city_description,
    home_barangay_or_district,
    home_ownership,
    home_phone,
    home_stayed_since,
    home_ownership_desc,
  },
  modalVisible,
  search,
  city,
}) => {
  const input_homeAddress = useRef();
  const input_homeVillage = useRef();
  const input_homePhone = useRef();

  const constraints = {
    home_address: {
      presence: {
        allowEmpty: false,
      },
    },
    home_village: {
      presence: {
        allowEmpty: false,
      },
    },
    home_barangay_or_district: {
      presence: {
        allowEmpty: false,
      },
    },
    home_stayed_since: {
      presence: {
        allowEmpty: false,
      },
    },
    home_ownership: {
      presence: {
        allowEmpty: false,
      },
    },
    home_phone: {
      presence: {
        allowEmpty: false,
      },
    },
    city_description: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  return (
    <React.Fragment>
      <PNContentWithTitle title="My Home Address">
        <PNFormInputBox
          placeholder="Address"
          ref={input_homeAddress}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "home_address",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_homeVillage.current.focus();
          }}
          value={home_address}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "home_address" })
          }
          invalid={invalids.home_address ? invalids.home_address[0] : ""}
        />
        <PNFormInputBox
          placeholder="Village"
          ref={input_homeVillage}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "home_village",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_homePhone.current.focus();
          }}
          value={home_village}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "home_village" })
          }
          invalid={invalids.home_village ? invalids.home_village[0] : ""}
        />
        <InputModal
          placeholder="Select Home City"
          value={city_description}
          onPress={() => {
            handleEvent("onModalOpen");
          }}
          invalid={invalids.home_city ? invalids.home_city[0] : ""}
        />
        <PNDropDown
          placeholder={{ label: "Select Barangay/District", value: null }}
          disabled={!city_description ? true : false}
          onValueChange={(value) => {
            handleEvent("onChange", {
              index: "home_barangay_or_district",
              value: value,
            });
          }}
          options={lists.barangays}
          selectedValue={home_barangay_or_district}
          // onBlur={() =>
          //   handleEvent("onBlur", {
          //     constraints,
          //     index: "home_barangay_or_district",
          //   })
          // }
          invalid={
            invalids.home_barangay_or_district
              ? invalids.home_barangay_or_district[0]
              : ""
          }
        />
        <PNDropDown
          placeholder={{ label: "Select Home Ownership", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "home_ownership",
                  value: value,
                },
                {
                  index: "home_ownership_desc",
                  value: lists.homeOwnership[index - 1].label,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "home_ownership",
                  value: value,
                },
                {
                  index: "home_ownership_desc",
                  value: null,
                },
              ]);
            }
          }}
          options={lists.homeOwnership}
          selectedValue={home_ownership}
          // onBlur={() =>
          //   handleEvent("onBlur", {
          //     constraints,
          //     index: "home_ownership",
          //   })
          // }
          invalid={invalids.home_ownership ? invalids.home_ownership[0] : ""}
        />
        <PNFormInputBox
          placeholder="Home Telephone Number"
          ref={input_homePhone}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "home_phone",
              value: text,
            })
          }
          value={home_phone}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "home_phone" })
          }
          invalid={invalids.home_phone ? invalids.home_phone[0] : ""}
        />
        <PNFormDatePicker
          title="Stayed Since"
          placeHolderText="Stayed Since"
          onDateChange={(date) =>
            handleEvent("onDateChange", {
              index: "home_stayed_since",
              value: date,
            })
          }
          maximumDate={new Date()}
          invalid={
            invalids.home_stayed_since ? invalids.home_stayed_since[0] : ""
          }
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: {
                home_address,
                home_village,
                home_phone,
                home_barangay_or_district,
                home_stayed_since,
                city_description,
                home_ownership,
              },
              constraints,
            });
          }}
          disabled={false}
          label="NEXT"
        />
      </FormButtonContainer>
      <Modal
        isVisible={modalVisible}
        style={{ justifyContent: "flex-end", margin: 0 }}
        onSwipeComplete={() => handleEvent("onModalClose")}
        onBackButtonPress={() => handleEvent("onModalClose")}
        swipeDirection="down"
      >
        <View style={{ backgroundColor: "white", flex: 1 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextInput
              value={search}
              onChangeText={(text) =>
                handleEvent("onSearchChange", {
                  value: text,
                })
              }
              style={{
                flex: 9,
                height: 40,
                borderColor: "#E1E1E5",
                borderWidth: 1,
                borderRightWidth: 0,
                paddingHorizontal: 10,
              }}
            />
            <ContainedButton
              buttonStyle={{ height: 40, flex: 2, borderRadius: 0 }}
              label="Search"
              onPress={() => handleEvent("onSearch")}
            />
          </View>
          <View style={{ flex: 9 }}>
            {city.isFetching && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ActivityIndicator size="large" color="#f9a010" />
              </View>
            )}
            {!city.isFetching && city.data.length > 0 && (
              <FlatList
                style={{ borderColor: "#EFF3F9", borderWidth: 1 }}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: "100%",
                      height: 1,
                      backgroundColor: "#EFF3F9",
                    }}
                  />
                )}
                data={city.data}
                renderItem={({ item }) => (
                  <CityItem
                    data={item}
                    onPress={() => {
                      handleEvent("onSelectCity", {
                        id: item.id_code,
                        value: item.city,
                      });
                      handleEvent("onModalClose");
                    }}
                  />
                )}
                keyExtractor={(item, index) => item.id_code}
              />
            )}
            {!city.isFetching && city.data.length == 0 && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text>No City Found</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </React.Fragment>
  );
};

export const EmploymentInformationScreen = ({
  handleEvent,
  invalids,
  data: { source_of_fund, job_title },
  lists,
}) => {
  const constraints = {
    source_of_fund: {
      presence: {
        allowEmpty: false,
      },
    },
    job_title: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  return (
    <React.Fragment>
      <PNContentWithTitle title="Employment Information">
        <PNDropDown
          placeholder={{ label: "Select Source of Fund", value: null }}
          onValueChange={(value, index) => {
            handleEvent("onChange", {
              index: "source_of_fund",
              value: value,
            });
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "source_of_fund_desc",
                  value: lists.sourceOfFund[index - 1].label,
                },
                {
                  index: "source_of_fund",
                  value: value,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "source_of_fund_desc",
                  value: null,
                },
                {
                  index: "source_of_fund",
                  value: value,
                },
              ]);
            }
          }}
          options={lists.sourceOfFund}
          selectedValue={source_of_fund}
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "source_of_fund" })
          // }
          invalid={invalids.source_of_fund ? invalids.source_of_fund[0] : ""}
        />
        <PNDropDown
          placeholder={{ label: "Select Job Title", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "job_title_desc",
                  value: lists.jobTitle[index - 1].label,
                },
                {
                  index: "job_title",
                  value: value,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "job_title_desc",
                  value: null,
                },
                {
                  index: "job_title",
                  value: value,
                },
              ]);
            }
          }}
          options={lists.jobTitle}
          selectedValue={job_title}
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "job_title" })
          // }
          invalid={invalids.job_title ? invalids.job_title[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: { source_of_fund, job_title },
              constraints,
            });
          }}
          disabled={false}
          label="NEXT"
        />
      </FormButtonContainer>
    </React.Fragment>
  );
};

export const IDScreen = ({
  handleEvent,
  setLoading,
  invalids,
  lists,
  data: {
    selfieImageData,
    identificationData,
    selfie_fileId,
    id1_code,
    id2_code,
    government_id_1,
    government_id1_url,
    government_id1_fileId,
    government_id_2,
    government_type_1,
    government_type_2,
    government_id2_url,
    government_id2_fileId,
  },
  navigation,
}) => {
  const [id1Status, setID1Status] = useState(false);
  const [id2Status, setID2Status] = useState(false);
  const [selfieStatus, setSelfieStatus] = useState(false);

  const constraints = {
    government_type_1: {
      presence: {
        allowEmpty: false,
      },
    },
    government_id_1: {
      presence: {
        allowEmpty: false,
      },
    },
    government_type_2: {
      presence: {
        allowEmpty: false,
      },
      exclusion: {
        within: [government_type_1],
        message: "^Please choose another ID Type",
      },
    },
    government_id_2: {
      presence: {
        allowEmpty: false,
      },
    },
  };

  const handleOnUploadSelfie = (selfie) => {
    handleEvent("onChange", { index: "selfieImageData", value: selfie });
    setLoading(true);
    API.upload({
      file_name: "selfie.png",
      content_type: "image",
      data64: selfie.base64,
    })
      .then(({ data: { data: response, status, msg } }) => {
        if (status == "ok" && response.length > 0) {
          setSelfieStatus(true);
          handleEvent("onChange", {
            index: "selfie_fileId",
            value: response[0],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleOnUploadIDs = (data) => {
    setLoading(true);
    const image1 = data[0].image;
    const image2 = data[1].image;
    if(image1 && image2) {
      API.uploadIDs(image1.base64, image2.base64)
      .then(
        axios.spread((responseID1, responseID2) => {
          const {
            data: { data: firstResponse, status: firstStatus, msg: firstMsg },
          } = responseID1;
          const {
            data: {
              data: secondResponse,
              status: secondStatus,
              msg: secondMsg,
            },
          } = responseID2;

          if (
            firstStatus == "ok" &&
            firstResponse.length > 0 &&
            secondStatus == "ok" &&
            secondResponse.length > 0
          ) {
            setID1Status(true);
            setID2Status(true);
            handleEvent("onChange", [
              { index: "government_id1_fileId", value: firstResponse[0] },
              { index: "government_id2_fileId", value: secondResponse[0] },
              { index: "id1_code", value: data[0].code },
              { index: "id2_code", value: data[1].code },
              { index: "government_id_1", value: data[0].number },
              { index: "government_id_2", value: data[1].number },
              { index: "government_type_1", value: data[0].type },
              { index: "government_type_2", value: data[1].type },
              { index: "identificationData", value: data}
            ]);
          }
        })
      )
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
    }
    
  };

  return (
    <ProofOfIdentity
      data={{
        selfieImageData,
        identificationData,
        selfie_fileId,
        id1_code,
        id2_code,
        government_id_1,
        government_id1_url,
        government_id1_fileId,
        government_id_2,
        government_type_1,
        government_type_2,
        government_id2_url,
        government_id2_fileId,
      }}
      items={lists.idList}
      handleEvent={handleEvent}
      constraints={constraints}
      invalids={invalids}
      navigation={navigation}
      handleOnUploadSelfie={handleOnUploadSelfie}
      handleOnUploadIDs={handleOnUploadIDs}
      id1Status={id1Status}
      id2Status={id2Status}
      selfieStatus={selfieStatus}
      onNext={() => {
        handleEvent("onNext", {
          fields: {
            id1_code,
            id2_code,
            government_id_1,
            government_id1_url,
            government_id1_fileId,
            government_id_2,
            government_type_1,
            government_type_2,
            government_id2_url,
            government_id2_fileId,
          },
          constraints,
        });
      }}
    />
  );
};

export const ElectronicSignatureScreen = ({ handleEvent, data }) => {
  const [isVisibile, setVisibility] = useState(false);
  const [imageData, setImageData] = useState("");
  const [isUploading, setUploading] = useState(false);

  useEffect(() => {
    // Known Bug (Need to delay the loading of electronic signature)
    setTimeout(() => setVisibility(true), 10);
  }, [isVisibile]);

  const uploadImage = () => {
    setUploading(true);
    API.upload({
      file_name: "esignature.png",
      content_type: "image",
      data64: imageData.replace("data:image/png;base64,", ""),
    })
      .then(({ data: { data: response, status, msg } }) => {
        if (status == "ok" && response.length > 0) {
          const formData = {
            title: data.title,
            appelation: data.appellation,
            fname: data.firstName,
            mname: data.middleName,
            lname: data.lastName,
            email: data.email,
            gender: data.gender,

            birth_date: getFormattedDate(data.birth_date),
            place_of_birth: data.place_of_birth,
            mothers_maiden_name: data.mothers_maiden_name,
            civil_status: data.civil_status,
            civil_status_desc: data.civil_status_desc,
            nationality: data.nationality,
            nationality_desc: data.nationality_desc,
            is_foreigner: 0,

            home_address: data.home_address,
            home_village: data.home_village,
            dynamic_address: data.home_barangay_or_district,
            h_ownership: data.home_ownership,
            home_ownership_desc: data.home_ownership_desc,
            home_phone: data.home_phone,
            home_mobile: "+63" + data.phoneNumber,
            home_stayed_since: getFormattedDate(data.home_stayed_since),

            source_of_fund: data.source_of_fund,
            source_of_fund_desc: data.source_of_fund_desc,
            job_title_path: data.job_title,
            job_title_desc: data.job_title_desc,

            selfie_document_id: data.selfie_fileId,
            id1_code: data.id1_code,
            id1_ref: data.government_id_1,
            id1_code_desc: data.government_type_1,
            id1_url: "",
            id1_document_id: data.government_id1_fileId,
            id2_code: data.id2_code,
            id2_ref: data.government_id_2,
            id2_code_desc: data.government_type_2,
            id2_url: "",
            id2_document_id: data.government_id2_fileId,

            eSignatureId: response[0],
          };

          handleEvent("onAddFormData", { data: formData });
          handleEvent("onSubmit", { data: formData });
        } else {
          // Failed
        }
      })
      .catch((error) => {})
      .finally(() => {
        setUploading(false);
      });
  };

  return (
    <View style={[styles.defaultContainerStyle]}>
      <View style={styles.signatureContainerStyle}>
        {isVisibile && (
          <PNElectronicSignature
            onChange={({ base64DataUrl }) => {
              setImageData(base64DataUrl);
            }}
            onError={() => {}}
          />
        )}
      </View>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.contentTitle}>
          Please sign here if the customer is present
        </Text>
        <Text style={styles.contentSubtitle}>
          By signing above, you agree to authorize change and all the terms and
          conditions.
        </Text>
      </View>
      <PNStackedButtons
        containerStyle={{ flex: 1, justifyContent: "flex-end" }}
      >
        <ContainedButton
          disabled={isUploading}
          loading={isUploading}
          label="Save"
          buttonStyle={{ width: "100%", height: 50, marginBottom: 20 }}
          onPress={() => {
            uploadImage();
          }}
        />
        <OutlineButton
          label="CLEAR SIGNATURE"
          buttonStyle={{ width: "100%", height: 50 }}
          onPress={() => {
            setVisibility(false);
            setImageData("");
          }}
        />
      </PNStackedButtons>
    </View>
  );
};

export const BankAccountFormScreen = (props) => {
  return (
    <React.Fragment>
      <PersonalInformationScreen {...props} key="1" />
      <AdditionalInformationScreen {...props} />
      <HomeInformationScreen {...props} />
      <EmploymentInformationScreen {...props} />
      <IDScreen {...props} />
    </React.Fragment>
  );
};

export default BankAccountFormScreen;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  signatureContainerStyle: {
    flex: 2,
  },
  contentContainerStyle: {
    alignItems: "center",
    borderTopColor: "#979797",
    borderTopWidth: 1,
    flex: 2,
    flexDirection: "column",
    padding: 15,
  },
  contentTitle: {
    color: "#444444",
    fontFamily: "Avenir_Medium",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  contentSubtitle: {
    color: "#868686",
    fontFamily: "Avenir_Book",
    fontSize: 12,
    textAlign: "center",
  },
});
