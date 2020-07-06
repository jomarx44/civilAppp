import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { icons } from "../../res/images/icons";
import { FormButtonContainer } from "../../library/Layout/Containers/FormButtonContainer";
import ScreenWithTitleAndDescription from "../../layouts/ScreenWithTitleAndDescription";
import { ProofOfIdentityItem } from "./ProofOfIdentityItem";
import { ContainedButton } from "../../components/Buttons/";
import { CameraModal } from "../../components/Camera";

export const ProofOfIdentity = (props) => {
  const {
    selfieData,
    isUploadingIdentificationDone,
    isCameraModalOpen,
    onSelfie,
    onUploadIdentity,
    onDoneSelfie,
    setCameraModalState,
  } = props;
  return (
    <React.Fragment>
      <ScreenWithTitleAndDescription
        title="Proof of Identity"
        description="In order to complete the process please upload a copy of your id and a
        clear selfie photo to proof the document holder."
      >
        <ProofOfIdentityItem
          title={selfieData ? "Retake your selfie" : "Take a selfie"}
          description="Please, make sure take a clear selfie photo."
          logo={icons.ic_selfie}
          isDone={selfieData ? true : false}
          onPress={onSelfie}
        />
        <ProofOfIdentityItem
          title={
            isUploadingIdentificationDone
              ? "View uploaded Identity"
              : "Upload 2 valid Identity"
          }
          description="We accept only Driving license, Passport, UMID..."
          logo={icons.ic_id}
          isDone={isUploadingIdentificationDone ? true : false}
          onPress={onUploadIdentity}
        />
      </ScreenWithTitleAndDescription>
      <FormButtonContainer>
        <ContainedButton
          // onPress={() => handleSubmit()}
          // disabled={isLoading}
          label="NEXT"
          // loading={isLoading}
        />
      </FormButtonContainer>
      <CameraModal
        isCameraModalOpen={isCameraModalOpen}
        setCameraModalState={setCameraModalState}
        onSave={onDoneSelfie}
      />
    </React.Fragment>
  );
};

export default ProofOfIdentity;
