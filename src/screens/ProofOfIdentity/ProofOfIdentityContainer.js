import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import { ProofOfIdentity } from "./ProofOfIdentity";

const ProofOfIdentityContainer = (props) => {
  const [isCameraModalOpen, setCameraModalState] = useState(false);
  const [selfieData, setSelfieData] = useState(props.data.selfieImageData);

  const {
    navigation,
    data,
    items,
    handleEvent,
    constraints,
    invalids,
    handleOnUploadSelfie,
    handleOnUploadIDs,
    id1Status,
    id2Status,
    selfieStatus,
    onNext
  } = props;

  const handleSelfie = () => {
    setCameraModalState(true);
  };

  const handleUploadIdentity = () => {
    navigation.push("UploadIdentity", {
      onSave: handleDoneUpload,
      items,
      handleEvent,
      data,
      invalids,
      constraints,
    });
  };

  const handleDoneSelfie = (image) => {
    setCameraModalState(false);
    setSelfieData(image);
    handleOnUploadSelfie(image);
  };

  const handleDoneUpload = (identityData) => {
    handleOnUploadIDs(identityData)
    // handleOnUploadIDs(identity[0].image, identity[1].image);
  };

  return (
    <ProofOfIdentity
      selfieData={selfieData}
      isCameraModalOpen={isCameraModalOpen}
      onSelfie={handleSelfie}
      onUploadIdentity={handleUploadIdentity}
      onDoneSelfie={handleDoneSelfie}
      setCameraModalState={setCameraModalState}
      id1Status={id1Status}
      id2Status={id2Status}
      selfieStatus={selfieStatus}
      onNext={onNext}
    />
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export const ProofOfIdentityScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProofOfIdentityContainer);

export default ProofOfIdentityScreen;
