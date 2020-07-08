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
import { Ionicons } from "@expo/vector-icons";

export const IdentityItem = (props) => {
  const { item, onRemove, onAdd } = props;

  if (!item.image || item.code != "" || item.type != "" || item.number != "") {
    return (
      <Card style={itemStyles.container} onPress={onAdd}>
        <View style={itemStyles.imageContainer}>
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
    <Card style={itemStyles.container} onPress={onAdd}>
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

  const handleSaveCaptured = (image) => {
    setCameraModalState(false);
    handleChangeIdentityData("image", image);
  };

  const handleSubmit = () => {
    onSave(identificationData);
    navigation.goBack();
  };

  return (
    <View style={{ flexGrow: 1, marginTop: 40 }}>
      <FlatList
        data={identificationData}
        renderItem={({ item, index }) => {
          return (
            <IdentityItem
              item={item}
              onRemove={() => handleRemove(index)}
              onAdd={() => handleAdd(index)}
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
            padding: 20,
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
            height: 200,
          }}
        >
          <DropDownPicker
            disabled={false}
            items={items}
            defaultValue={identificationData[selectedID].code}
            placeholder="Select Government ID"
            onChangeItem={({ label, value }) => {
              handleMultipleChangeIdentityData({
                code: value,
                type: label,
              });
            }}
            style={{
              backgroundColor: "#fff",
              width: "100%",
              borderRightWidth: 0,
              borderLeftWidth: 0,
              borderTopWidth: 0,
              paddingLeft: 0,
            }}
            containerStyle={{ height: 40, marginBottom: 40, marginTop: 20 }}
            dropDownStyle={{ backgroundColor: "#fff" }}
            itemStyle={{
              justifyContent: "flex-start",
            }}
            labelStyle={{
              color: "#444",
              fontFamily: "Avenir_Book",
              fontSize: 20,
            }}
            selectedLabelStyle={{
              fontFamily: "Avenir_Book",
              fontSize: 20,
              color: "#F9A010",
            }}
          />
          <PNFormInputBox
            placeholder="Government ID Number"
            // ref={input_homePhone}
            onChangeText={(value) => handleChangeIdentityData("number", value)}
            // onSubmitEditing={() => {
            //   input_homeMobile.current.focus();
            // }}
            value={identificationData[selectedID].number}
            // onBlur={() =>
            //   handleEvent("onBlur", { constraints, index: "government_id_1" })
            // }
            // invalid={invalids.government_id_1 ? invalids.government_id_1[0] : ""}
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
