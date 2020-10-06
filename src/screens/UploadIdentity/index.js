import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { ContainedButton } from "../../components/Buttons";
import { Card } from "../../components/Card";
import { CameraModal } from "../../components/Camera";
import { styles, itemStyles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MenuModal from "../../components/MenuModal";
import DropDownPicker from "react-native-dropdown-picker";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNDropDown from "library/components/PNDropDown";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItemList } from "@react-navigation/drawer";
import validate from "validate.js";
import { ACCESS_TOKEN_ERROR } from "../../actions/types";

export const IdentityItem = (props) => {
  const { item, onRemove, onAdd, invalids, id } = props;

  console.log(invalids[`document${id}`])
  console.log(invalids[`type${id}`])
  console.log(invalids[`number${id}`])

  if (!item.image || item.code != "" || item.type != "" || item.number != "") {
    return (
      <Card
        style={{
          ...itemStyles.container,
          borderColor:
            invalids[`document${id}`] ||
            invalids[`type${id}`] ||
            invalids[`number${id}`]
              ? "#DC6061"
              : "#e5e5e5",
        }}
        onPress={onAdd}
      >
        <View style={itemStyles.imageContainer}>
          {/* {item.image ? (
            <Image
              style={itemStyles.image}
              source={{ uri: item.image.uri ? item.image.uri : null }}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                borderStyle: "dashed",
                borderColor: "#979797",
                borderWidth: 1,
                borderRadius: 4,
                height: 40,
                width: 40,
              }}
            >
              <Ionicons name="ios-add" size={24} color="#979797" />
            </View>
          )} */}
          <Image
              style={itemStyles.image}
              source={{ uri: item.image.uri ? item.image.uri : null }}
            />
        </View>
        <View style={itemStyles.detailsContainer}>
          <Text style={itemStyles.title}>{item.type}</Text>
          <Text style={itemStyles.description}>For Verification</Text>
        </View>
        {/* <IdentityRemoveButton onRemove={onRemove} /> */}
        <TouchableOpacity style={itemStyles.remove} onPress={onRemove}>
          <AntDesign name="closecircle" size={20} color="#0061f3" />
        </TouchableOpacity>
      </Card>
    );
  }

  return (
    <Card
      style={{
        ...itemStyles.container,
        borderColor:
          invalids[`document${id}`] ||
          invalids[`type${id}`] ||
          invalids[`number${id}`]
            ? "#DC6061"
            : "#e5e5e5",
      }}
      onPress={onAdd}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            borderStyle: "dashed",
            borderColor: "#979797",
            borderWidth: 1,
            borderRadius: 4,
            height: 40,
            width: 40,
          }}
        >
          <Ionicons name="ios-add" size={24} color="#979797" />
        </View>
        <View style={{ flexGrow: 1, paddingHorizontal: 20 }}>
          <Text
            style={{
              fontFamily: "Gilroy_Bold",
              color: "#979797",
              fontSize: 14,
            }}
          >
            ADD IDENTITY
          </Text>
        </View>
      </View>
    </Card>
  );
};

export const UploadIdentity = (props) => {
  const [isMenuModalOpen, setMenuModalState] = useState(false);
  const [isCameraModalOpen, setCameraModalState] = useState(false);
  const [selectedID, setSelectedID] = useState(0);
  const [invalids, setInvalids] = useState({});
  const [identificationData, setIdentificationData] = useState(
    props.route.params.data.identificationData
      ? props.route.params.data.identificationData
      : [
          {
            key: "f3440ef8-c0cd-11ea-b3de-0242ac130004",
            image: {},
            code: "",
            type: "",
            url: "",
            number: "",
          },
          {
            key: "0af3aaab-5fd8-4a23-b904-9d71a93555b7",
            image: {},
            code: "",
            type: "",
            url: "",
            number: "",
          },
        ]
  );

  const constraints = {
    type0: {
      presence: {
        allowEmpty: false,
        message: "^Please select a valid ID Type",
      },
    },
    number0: {
      presence: {
        allowEmpty: false,
        message: "^Government ID is required",
      },
    },
    document0: {
      presence: {
        allowEmpty: false,
        message: "^Please capture/select your ID card for verification",
      },
    },
    type1: {
      presence: {
        allowEmpty: false,
        message: "^Please select a valid ID Type",
      },
      exclusion: {
        within: [identificationData[0].type],
        message: "^Please choose another ID Type",
      },
    },
    number1: {
      presence: {
        allowEmpty: false,
        message: "^Government ID is required",
      },
    },
    document1: {
      presence: {
        allowEmpty: false,
        message: "^Please capture/select your ID card for verification",
      },
    },
  };

  const { navigation, route } = props;
  const { items, onSave } = route.params;

  const handleAdd = (id) => {
    setSelectedID(id);
    setMenuModalState(true);
  };

  const handleRemove = (id) => {
    let newIdentificationData = [...identificationData];
    newIdentificationData[id] = {
      key: id,
      image: {},
      code: "",
      type: "",
      url: "",
      number: "",
    };

    setIdentificationData(newIdentificationData);
  };

  const handleTakePhoto = () => {
    // setMenuModalState(false);
    setCameraModalState(true);
  };

  const handleSelectImageAsync = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
        base64: true,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled) {
        // Set Image
        handleChangeIdentityData("image", result);
        // setMenuModalState(false);
      }
    } catch (error) {
      console.log("Error while selecting image: ", error);
    }
  };

  const handleChangeIdentityData = (index, value) => {
    let newIdentificationData = [...identificationData];
    newIdentificationData[selectedID] = {
      ...newIdentificationData[selectedID],
      [index]: value,
    };

    setIdentificationData(newIdentificationData);
  };

  const handleMultipleChangeIdentityData = (attributes) => {
    let newIdentificationData = [...identificationData];
    newIdentificationData[selectedID] = {
      ...newIdentificationData[selectedID],
      ...attributes,
    };

    setIdentificationData(newIdentificationData);
  };

  const validateType = (id, value) => {
    const invalid = validate(
      {
        [`type${id}`]: value,
      },
      {
        [`type${id}`]: constraints[`type${id}`],
      }
    );
    console.log(invalid);
    if (invalid) {
      setInvalids({
        ...invalids,
        ...invalid,
      });
    } else {
      const temporary_invalids = {
        ...invalids,
      };
      delete temporary_invalids[`type${id}`];
      setInvalids(temporary_invalids);
    }
  };

  const validateValue = (id, value) => {
    const invalid = validate(
      {
        [`number${id}`]: value,
      },
      {
        [`number${id}`]: constraints[`number${id}`],
      }
    );
    console.log(invalid);
    if (invalid) {
      setInvalids({
        ...invalids,
        ...invalid,
      });
    } else {
      const temporary_invalids = {
        ...invalids,
      };
      delete temporary_invalids[`number${id}`];
      setInvalids(temporary_invalids);
    }
  };

  const handleSaveCaptured = (image) => {
    setCameraModalState(false);
    handleChangeIdentityData("image", image);
  };

  const handleSubmit = () => {
    const toBeValidated = {
      type0: identificationData[0].type,
      number0: identificationData[0].number,
      document0: identificationData[0].image,
      type1: identificationData[1].type,
      number1: identificationData[1].number,
      document1: identificationData[1].image,
    };

    // console.log("handleSubmit: ", toBeValidated);
    const invalid = validate(toBeValidated, constraints);
    if (!invalid) {
      onSave(identificationData);
      setInvalids({});
      navigation.goBack();
    } else {
      console.log(invalid);
      setInvalids(invalid);
    }
  };

  return (
    <View style={{ flexGrow: 1, marginTop: 40 }}>
      <FlatList
        data={identificationData}
        renderItem={({ item, index }) => {
          return (
            <IdentityItem
              id={index}
              item={item}
              onRemove={() => handleRemove(index)}
              onAdd={() => handleAdd(index)}
              invalids={invalids}
            />
          );
        }}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      />
      <View style={styles.buttonContainer}>
        <ContainedButton label="SUBMIT" onPress={() => handleSubmit()} />
      </View>
      <MenuModal isVisible={isMenuModalOpen} setVisibility={setMenuModalState}>
        <View
          style={{
            backgroundColor: "#FFF",
            paddingHorizontal: 20,
            paddingTop: 40,
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            height: 200,
          }}
        >
          <PNDropDown
            placeholder={{ label: "Select Government ID", value: null }}
            onValueChange={(value, index) => {
              if (index != 0) {
                handleMultipleChangeIdentityData({
                  code: value,
                  type: items[index - 1].label,
                });
                validateType(selectedID, items[index - 1].label);
              } else {
                handleMultipleChangeIdentityData({
                  code: value,
                  type: null,
                });
                validateType(selectedID, null);
              }
              // handleEvent("onBlur", { constraints, index: "civil_status" });
            }}
            options={items}
            selectedValue={identificationData[selectedID].code}
            invalid={
              invalids[`type${selectedID}`]
                ? invalids[`type${selectedID}`][0]
                : ""
            }
          />
          <PNFormInputBox
            placeholder="Government ID Number"
            onChangeText={(value) => handleChangeIdentityData("number", value)}
            value={identificationData[selectedID].number}
            onBlur={() =>
              validateValue(selectedID, identificationData[selectedID].number)
            }
            invalid={
              invalids[`number${selectedID}`]
                ? invalids[`number${selectedID}`][0]
                : ""
            }
          />
        </View>

        <ContainedButton
          label="Take a Photo"
          labelStyle={{ color: "#003d6f", fontFamily: "Gilroy_Bold" }}
          buttonStyle={{
            backgroundColor: "#FFF",
            width: "100%",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            marginBottom: 1,
          }}
          onPress={() => handleTakePhoto()}
        />
        <ContainedButton
          label="Choose from Gallery"
          labelStyle={{ color: "#003d6f", fontFamily: "Gilroy_Bold" }}
          buttonStyle={{
            backgroundColor: "#FFF",
            width: "100%",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
          }}
          onPress={() => handleSelectImageAsync()}
        />
      </MenuModal>
      <CameraModal
        isCameraModalOpen={isCameraModalOpen}
        setCameraModalState={setCameraModalState}
        onSave={handleSaveCaptured}
      />
    </View>
  );
};

export default UploadIdentity;
