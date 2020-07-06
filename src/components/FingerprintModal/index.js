import React, { useEffect, useState } from "react";
import { Alert, Image, Platform, Text, View } from "react-native";
import PropTypes from 'prop-types';
import Modal from "react-native-modal";
import { ContainedButton } from "../Buttons";
import {
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import { styles } from "./styles";
import { icons } from "../../res/images/icons"
import { AUTHENTICATION_FAILED, TOO_FAST } from "../../constants/error";

export const FingerprintModal = ({
  isVisible,
  setVisibility,
  onScanError,
  onScanSuccess,
}) => {
  const [isVerified, setVerified] = useState(false);

  useEffect(() => {
    if (Platform.OS == "android" && isVerified) {
      // If the OS is Android, immediately scan fingerprint
      handleScan();
    }
  }, [isVerified]);

  /**
   * showError
   * @description Popup Error Message with Ok Button.
   * @param {String} error Error Message
   * @param {Function} onProceed Function that's called when the user pressed Ok Button
   */
  const showError = (error, onProceed) => {
    Alert.alert("Invalid Fingerprint", error, [
      {
        text: "Ok",
        onPress: () => onProceed && onProceed(),
      },
    ]);
  };

  /**
   * handleErrorScanning
   * @description used for handling fingerprint scanning errors
   * @param {String} error Error code
   */
  const handleErrorScanning = (error) => {
    if (onScanError) {
      onScanError(error);
    } else {
      switch (error) {
        case AUTHENTICATION_FAILED.value:
          showError(AUTHENTICATION_FAILED.message);
          break;
        case TOO_FAST.value:
          showError(TOO_FAST.message);
          break;
      }
    }
  };

  /**
   * handleScan
   * @description Used for scanning fingerprint
   * @async
   */
  const handleScan = async () => {
    const { success, error } = await authenticateAsync({ promptMessage: "" });

    if (success) {
      setVerified(true);
      onScanSuccess();
    } else if ([AUTHENTICATION_FAILED.value, TOO_FAST.value].includes(error)) {
      handleErrorScanning(error);
    } else {
      cancelAuthenticate();
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.defaultContainerStyle}
      onBackButtonPress={() => {}}
    >
      <View style={styles.defaultContentStyle}>
        <Image
          resizeMode="cover"
          style={styles.iconStyle}
          source={
            isVerified
              ? require("res/images/ic_fingerprint_confirmed.png")
              : require("res/images/ic_fingerprint.png")
          }
        />
        <Text
          style={[
            styles.textStyle,
            { color: isVerified ? "#f9A010" : "#5D646C" },
          ]}
        >
          {isVerified
            ? "Fingerprint Verified"
            : "Touch the fingerprint sensor to login."}
        </Text>
        <ContainedButton
          onPress={() => {
            setVisibility(false);
            cancelAuthenticate();
          }}
          label="Try login instead"
          buttonStyle={{ marginTop: 20 }}
          disabled={isVerified}
        />
      </View>
    </Modal>
  );
};

FingerprintModal.propTypes = {
  isVisible: PropTypes.bool,
  setVisibility: PropTypes.func,
  onScanError: PropTypes.func,
  onScanSuccess: PropTypes.func,
};

export default FingerprintModal;
