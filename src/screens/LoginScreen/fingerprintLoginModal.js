import React from "react";
import { Image, Pl } from "react-native";
import Modal from "react-native-modal";
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";

export const ModalLoginFingerprint = ({
  isVisible,
  isFingerprintSuccess,
  setModalVisibility,
}) => {
  return (
    <Modal
      isVisible={isVisible}
      style={modalStyle.defaultContainerStyle}
      onBackButtonPress={() => {}}
    >
      <View style={modalStyle.defaultContentStyle}>
        <Image
          style={modalStyle.fingerprintIconStyle}
          source={
            isFingerprintSuccess
              ? require("res/images/ic_fingerprint_confirmed.png")
              : require("res/images/ic_fingerprint.png")
          }
          resizeMode="cover"
        />
        <Text
          style={[
            modalStyle.fingerprintTextStyle,
            { color: isFingerprintSuccess ? "#f9A010" : "#5D646C" },
          ]}
        >
          {isFingerprintSuccess
            ? "Fingerprint Verified"
            : "Touch the fingerprint sensor to login."}
        </Text>
        <PNContainedButton
          onPress={() => {
            setModalVisibility(false);
            cancelAuthenticate();
          }}
          label="Try login instead"
          buttonStyle={{ marginTop: 20 }}
          disabled={isFingerprintSuccess}
        />
      </View>
    </Modal>
  );
};

export default fingerprintLoginModal;

const modalStyle = StyleSheet.create({
  
});