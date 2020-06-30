import { ContainedButton, TextButton } from "../../components/Buttons/";
import { FormButtonContainer } from "../../library/Layout/Containers/FormButtonContainer";
import * as ImagePicker from "expo-image-picker";
import PNContentWithTitleAndDescription from "../../library/Layout/Content/PNContentWithTitleAndDescription";
import { ProofOfIdentityItem } from "./item";
import React, { useState } from "react";
import { View } from "react-native";
import { icons } from "../../res/images/icons";
import { modalStyles } from "./styles";
import Modal from "react-native-modal";
import { Image } from "react-native";

export const ProofOfIdentity = (props) => {
  const [isModalOpen, setModalState] = useState(false);
  const [imageURI, setImageURI] = useState(null);
  const {} = props;

  const onSelectImage = () => {};

  const onSelectImageAsync = async () => {
    try {
      const options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      };

      const result = await ImagePicker.launchImageLibraryAsync(options);

      if (!result.cancelled) {
        console.log(result.uri);
        setImageURI(result.uri);
        setModalState(false);
      }
    } catch (error) {
      console.log("Error while selecting image: ", error);
    }
  };

  const onSelfie = () => {};

  return (
    <React.Fragment>
      <PNContentWithTitleAndDescription
        title="Proof of Identity"
        desc="In order to complete the process please upload a copy of your id and a
        clear selfie photo to proof the document holder."
      >
        <ProofOfIdentityItem
          title="Take a selfie"
          description="Please, make sure take a clear selfie photo."
          logo={icons.ic_selfie}
          isDone
          onPress={() => setModalState(true)}
        />
        <ProofOfIdentityItem
          title="Upload 2 valid Identity"
          description="We accept only Driving license, Passport, UMID..."
          logo={icons.ic_id}
          onPress={() => setModalState(true)}
        />
        <Image
          source={imageURI && { uri: imageURI }}
          style={{ width: 100, height: 100 }}
        />
      </PNContentWithTitleAndDescription>
      <FormButtonContainer>
        <ContainedButton
          // onPress={() => handleSubmit()}
          // disabled={isLoading}
          label="NEXT"
          // loading={isLoading}
        />
      </FormButtonContainer>
      <Modal
        isVisible={isModalOpen}
        onBackButtonPress={() => {
          setModalState(false);
        }}
        onBackdropPress={() => {
          setModalState(false)
        }}
        style={modalStyles.container}
      >
        <View style={modalStyles.contentContainer}>
          <TextButton
            label="Take a Photo"
            labelStyle={{ color: "#003d6f", fontFamily: "Gilroy_Bold" }}
            buttonStyle={{ width: "100%" }}
          />
          <TextButton
            label="Choose from Gallery"
            labelStyle={{ color: "#003d6f", fontFamily: "Gilroy_Bold" }}
            buttonStyle={{ width: "100%" }}
            onPress={() => onSelectImageAsync()}
          />
        </View>
      </Modal>
    </React.Fragment>
  );
};

export default ProofOfIdentity;
