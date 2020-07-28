import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import PNElectronicSignature from "library/components/PNElectronicSignature";
import PNStackedButtons from "library/Layout/Content/PNStackedButtons";
import PNContainedButton from "library/components/Buttons/PNContainedButton";
import PNOutlineButton from "library/components/Buttons/PNOutlineButton";

export const ElectronicSignature = (props) => {
  const [isVisibile, setVisibility] = useState(false);
  const [imageData, setImageData] = useState("");
  const [isUploading, setUploading] = useState(false);
  const { handleEvent } = props;

  useEffect(() => {
    // Known Bug (Need to delay the loading of electronic signature)
    setTimeout(() => setVisibility(true), 10);
  }, [isVisibile]);

  const handleUploadSuccess = (imageURL) => {
    handleEvent("onChange", { index: "eSignatureId", value: imageURL})
  }

  const handleUploadError = (error) => {
    console.log("Uploading Error: ", error);
  }

  return (
    <View style={[styles.defaultContainerStyle]}>
      <View style={styles.signatureContainerStyle}>
        {isVisibile && (
          <PNElectronicSignature
            onChange={({ base64DataUrl }) => {
              setImageData(base64DataUrl);
            }}
            onError={() => {}}
          />
        )}
      </View>
      <View style={styles.contentContainerStyle}>
        <Text style={styles.contentTitle}>
          Please sign here if the customer is present
        </Text>
        <Text style={styles.contentSubtitle}>
          By signing above, you agree to authorize change and all the terms and
          conditions.
        </Text>
      </View>
      <PNStackedButtons
        containerStyle={{ flex: 1, justifyContent: "flex-end" }}
      >
        <PNContainedButton
          disabled={isUploading}
          loading={isUploading}
          label="Save"
          buttonStyle={{ width: "100%", height: 50, marginBottom: 20 }}
          onPress={() => {
            handleEvent("handleEvent", {
              fileName: "esignature.png",
              contentType: "image",
              data64: imageData,
              onUploadSuccess: handleUploadSuccess,
              onUploadError: handleUploadError
            });
          }}
        />
        <PNOutlineButton
          label="CLEAR SIGNATURE"
          buttonStyle={{ width: "100%", height: 50 }}
          onPress={() => {
            setVisibility(false);
            setImageData("");
          }}
        />
      </PNStackedButtons>
    </View>
  );
};

export default ElectronicSignature;

const styles = StyleSheet.create({
  defaultContainerStyle: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
  },
  signatureContainerStyle: {
    flex: 2,
  },
  contentContainerStyle: {
    alignItems: "center",
    borderTopColor: "#979797",
    borderTopWidth: 1,
    flex: 2,
    flexDirection: "column",
    padding: 15,
  },
  contentTitle: {
    color: "#444444",
    fontFamily: "Avenir_Medium",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
  contentSubtitle: {
    color: "#868686",
    fontFamily: "Avenir_Book",
    fontSize: 12,
    textAlign: "center",
  },
});
