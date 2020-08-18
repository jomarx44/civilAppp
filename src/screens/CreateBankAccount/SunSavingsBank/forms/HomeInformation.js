import React, { useRef } from "react";
import {
  ActivityIndicator,
  Text,
  View,
  FlatList,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import PNContainedButton from "../../../../library/components/Buttons/PNContainedButton";
import PNContentWithTitle from "library/Layout/Content/PNContentWithTitle";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormDatePicker from "library/components/PNFormDatePicker";
import PNDropDown from "../../../../library/components/PNDropDown";
import PNFormButton from "library/components/PNFormButton";
import FormButtonContainer from "library/Layout/Containers/FormButtonContainer";
import { InputModal } from "../../../../library/components/Form/Inputs/Modal";
import CityItem from "../../../../library/components/CityItem";

export const HomeInformation = (props) => {
  const {
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
    constraints,
  } = props;

  const input_homeAddress = useRef();
  const input_homeVillage = useRef();
  const input_homePhone = useRef();

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
            <PNContainedButton
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

export default HomeInformation;
