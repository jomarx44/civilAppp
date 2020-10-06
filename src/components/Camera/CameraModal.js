import React from "react";
import { modalStyles } from "./styles";
import Modal from "react-native-modal";
import { TopNavigation } from "../TopNavigation"
import { NavigationButtons } from "../NavigationButtons"
import { icons } from "../../res/images/icons"
import { Camera } from "./main"

export const CameraModal = (props) => {
  const {isCameraModalOpen, setCameraModalState, onSave, cameraType, selfieData} = props;
  return (
    <Modal
      isVisible={isCameraModalOpen}
      onBackButtonPress={() => {
        setCameraModalState(false);
      }}
      onBackdropPress={() => {
        setCameraModalState(false);
      }}
      style={modalStyles.cameraContainer}
    >
      <TopNavigation
        headerStyle={{ backgroundColor: "#122f5b", marginTop: 0 }}
        leftLogo={
          <NavigationButtons
            logo={icons.ic_back_white}
            onPress={() => {
              setCameraModalState(false)
            }}
          />
        }
        titleStyle={{ color: "#ffffff" }}
      >
        Take a Photo
      </TopNavigation>
      <Camera onSave={onSave} cameraType={cameraType} selfieData={selfieData} />
    </Modal>
  )
}

export default CameraModal;
