import React, { useState } from "react";
import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import { ContainedButton } from "../../components/Buttons";
import { Card } from "../../components/Card";
import { CameraModal } from "../../components/Camera";
import { styles, itemStyles } from "./styles";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import MenuModal from "../../components/MenuModal";

const IdentityRemoveButton = (props) => {
  const { onRemove } = props;
  return (
    <TouchableOpacity style={itemStyles.remove} onPress={onRemove}>
      <AntDesign name="closecircle" size={20} color="#0061f3" />
    </TouchableOpacity>
  );
};

export const IdentityPhoto = (props) => {
  const { image } = props;
  return (
    <View style={itemStyles.imageContainer}>
      <Image style={itemStyles.image} source={{ uri: image.uri }} />
    </View>
  );
};

export const IdentityDetail = (props) => {
  const { title } = props;
  return (
    <View style={itemStyles.detailsContainer}>
      <Text style={itemStyles.title}>{title}</Text>
      <Text style={itemStyles.description}>For Verification</Text>
    </View>
  );
};

export const IdentityItem = (props) => {
  const { item, onRemove, onAdd } = props;

  if (!item) {
    return (
      <Card style={itemStyles.container} onPress={onAdd}>
        <Text>Add Item</Text>
      </Card>
    );
  }

  return (
    <Card style={itemStyles.container}>
      <IdentityPhoto {...item} />
      <IdentityDetail {...item} />
      <IdentityRemoveButton onRemove={onRemove} />
    </Card>
  );
};

export const UploadIdentity = (props) => {
  const [isMenuModalOpen, setMenuModalState] = useState(false);
  const [isCameraModalOpen, setCameraModalState] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [identificationData, setIdentificationData] = useState({
    id1: null,
    id2: null,
  });

  const { navigation, route } = props;
  const { onSave } = route.params;

  const handleAdd = (id) => {
    setSelectedId(id);
    setMenuModalState(true);
  };

  const handleRemove = (id) => {
    setIdentificationData({
      ...identificationData,
      [id]: null,
    });
  };

  const handleTakePhoto = () => {
    setMenuModalState(false);
    setCameraModalState(true);
  };

  const handleSelectImageAsync = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled) {
        setImage(selectedId, result);
        setMenuModalState(false);
      }
    } catch (error) {
      console.log("Error while selecting image: ", error);
    }
  };

  const setImage = (id, image) => {
    setIdentificationData({
      ...identificationData,
      [id]: {
        ...identificationData,
        image,
      },
    });
  };

  const handleSaveCaptured = (image) => {
    setCameraModalState(false);
    setImage(selectedId, image);
  };

  const handleSubmit = () => {
    onSave(identificationData);
    navigation.goBack();
  }

  return (
    <View style={{ flexGrow: 1, marginTop: 40 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <IdentityItem
          item={identificationData.id1}
          onRemove={() => {
            handleRemove("id1");
          }}
          onAdd={() => {
            handleAdd("id1");
          }}
        />
        <IdentityItem
          item={identificationData.id2}
          onRemove={() => {
            handleRemove("id2");
          }}
          onAdd={() => {
            handleAdd("id2");
          }}
        />
      </ScrollView>
      <View style={styles.buttonContainer}>
        <ContainedButton label="SUBMIT" onPress={() => handleSubmit()} />
      </View>
      <MenuModal isVisible={isMenuModalOpen} setVisibility={setMenuModalState}>
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
