import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  AsyncStorage,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from "react-native";

// Others
import {
  hasHardwareAsync,
  isEnrolledAsync,
  authenticateAsync,
  cancelAuthenticate,
} from "expo-local-authentication";
import { ContainedButton } from "../../components/Buttons";

export const FingerprintScreen = ({ auth, navigation }) => {
  const [isCompatible, setIsCompatible] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [fingerprintToken, setFingerprintToken] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("fingerprintToken").then((token) => {
      setFingerprintToken(token);
      checkDeviceHardware();
      checkEnrolledFingerprints();
    });
  }, []);

  useEffect(() => {
    if (!fingerprintToken && isCompatible && isEnrolled) {
      
      scan();
    }
  }, [isCompatible, isEnrolled, fingerprintToken]);

  const checkDeviceHardware = async () => {
    const isHardwareSupported = await hasHardwareAsync();
    setIsCompatible(isHardwareSupported);
    if (!isHardwareSupported) {
      Alert.alert(
        "Fingerprint Compatibilty",
        "Your phone doesn't support Fingerprint Login.",
        [
          {
            text: "Ok",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const checkEnrolledFingerprints = async () => {
    const hasEnrolledFingerprint = await isEnrolledAsync();
    setIsEnrolled(hasEnrolledFingerprint);
    if (!hasEnrolledFingerprint) {
      Alert.alert(
        "No Fingerprints found",
        "It seems that you haven't enrolled fingerprint to your device yet. Please register a fingerprint to your device.",
        [
          {
            text: "Ok",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    }
  };

  const scan = async () => {
    const { success, error } = await authenticateAsync({ promptMessage: "" });
    if (success) {
      AsyncStorage.setItem("fingerprintToken", auth.refresh_token);
      setFingerprintToken(auth.refresh_token);
    } else if (error == "authentication_failed" || error == "too_fast") {
      Alert.alert(
        "Invalid Fingerprint",
        "Please try touching the fingerprint sensor again.",
        [
          {
            text: "Ok",
            onPress: () => scan(),
          },
        ]
      );
    } else {
      cancelAuthenticate();
    }
  };

  const disableFingerprint = () => {
    AsyncStorage.removeItem("fingerprintToken");
    setFingerprintToken(null);
  };

  return (
    <View style={styles.defaultContainerStyle}>
      <View style={styles.defaultHeaderStyle}>
        <Text style={styles.titleStyle}>Allow Fingerprint</Text>
        <Text style={styles.descriptionStyle}>
          In order to use the fingerprint sensor we need your authorization
          first.
        </Text>
      </View>
      <View style={styles.defaultContentStyle}>
        <Image
          style={styles.fingerprintIconStyle}
          source={
            fingerprintToken
              ? require("res/images/ic_fingerprint_confirmed.png")
              : require("res/images/ic_fingerprint.png")
          }
          resizeMode="cover"
        />
        <Text
          style={[
            styles.fingerprintTextStyle,
            { color: fingerprintToken ? "#f9A010" : "#5D646C" },
          ]}
        >
          {fingerprintToken
            ? "Fingerprint Verified"
            : "Touch the fingerprint sensor to login."}
        </Text>
      </View>
      <View>
        {fingerprintToken && (
          <ContainedButton
            label="Disable Fingerprint"
            onPress={() => {
              disableFingerprint();
            }}
          />
        )}
      </View>
    </View>
  );
};

export default FingerprintScreen;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
    padding: 35,
    justifyContent: "space-between",
    alignItems: "center",
  },
  defaultHeaderStyle: {
    justifyContent: "flex-end",
  },
  defaultContentStyle: {
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  titleStyle: {
    color: "#042C5C",
    fontFamily: "Gilroy_Bold",
    fontSize: 32,
    marginBottom: 10,
  },
  descriptionStyle: {
    color: "#5D646C",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    lineHeight: 24,
  },
  fingerprintIconStyle: {
    height: 128,
    marginBottom: 40,
    width: 128,
  },
  fingerprintTextStyle: {
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
    lineHeight: 24,
    textAlign: "center",
  },
});
