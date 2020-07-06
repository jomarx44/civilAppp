import React, { useState } from "react";
import { connect } from 'react-redux'
import { ProofOfIdentity } from "./ProofOfIdentity"

export const ProofOfIdentityContainer = connect(mapStateToProps, mapDispatchToProps)((props) => {
  const [isCameraModalOpen, setCameraModalState] = useState(false);
  const [selfieData, setSelfieData] = useState(null);
  const [identificationData, setIdentificationData] = useState(null);
  const isUploadingIdentificationDone = identificationData && (identificationData.id1 && identificationData.id2);
  const { navigation } = props;

  const handleSelfie = () => {
    setCameraModalState(true);
  };

  const handleUploadIdentity = () => {
    navigation.navigate("UploadIdentity", {
      onSave: handleDoneUpload,
    })
  }

  const handleDoneSelfie = (image) => {
    setCameraModalState(false);
    setSelfieData(image);
  };

  const handleDoneUpload = (image) => {
    setIdentificationData(image);
  };

  return (
      <ProofOfIdentity 
        selfieData={selfieData}
        isUploadingIdentificationDone={isUploadingIdentificationDone}
        isCameraModalOpen={isCameraModalOpen}
        onSelfie={handleSelfie}
        onUploadIdentity={handleUploadIdentity}
        onDoneSelfie={handleDoneSelfie}
        setCameraModalState={setCameraModalState}
      />
  );
});

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => ({
  
});

export default ProofOfIdentityContainer;
