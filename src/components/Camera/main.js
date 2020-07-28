import React, { useEffect, useState, useRef } from "react";
import { Dimensions, Text, TouchableOpacity, View, Image } from "react-native";
import { styles } from "./styles";
import { Camera as ExpoCamera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { ContainedButton } from "../Buttons";
import { Ionicons } from "@expo/vector-icons";

export const Camera = (props) => {
  const [hasPermission, setHasPermission] = useState(null);
<<<<<<< HEAD
  const [cameraType, setCameraType] = useState(ExpoCamera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [imageData, setImageData] = useState(null);
=======
  const [cameraType, setCameraType] = useState(ExpoCamera.Constants.Type[props.cameraType ? props.cameraType : "back"]);
  const [cameraReady, setCameraReady] = useState(false);
  const [imageData, setImageData] = useState(props.selfieData);
>>>>>>> AC/pnmobile-live
  const { onSave } = props;

  const { width } = Dimensions.get("window");
  const contentWidth = width * 0.85;

  let camera = useRef();

  useEffect(() => {
    const askPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setHasPermission(status === "granted");
    };

    askPermission();
  }, []);

  const snap = async () => {
    if (camera && cameraReady) {
      const options = {
<<<<<<< HEAD
        quality: 1,
=======
        quality: 0.5,
>>>>>>> AC/pnmobile-live
        base64: true,
        onPictureSaved: (response) => {
          setImageData(response);
        },
      };
      camera.takePictureAsync(options);
    }
  };

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View
        style={{ flex: 10, justifyContent: "center", alignItems: "center" }}
      >
        {!imageData ? (
          <ExpoCamera
            ratio="1:1"
            style={{ width: contentWidth, height: contentWidth }}
            type={cameraType}
            ref={(ref) => {
              camera = ref;
            }}
            onCameraReady={() => {
              setCameraReady(true);
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: "transparent",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <TouchableOpacity
                style={{
                  height: 40,
                  width: 40,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  setCameraType(
                    cameraType === ExpoCamera.Constants.Type.back
                      ? ExpoCamera.Constants.Type.front
                      : ExpoCamera.Constants.Type.back
                  );
                }}
              >
                <Ionicons name="md-reverse-camera" size={24} color="#FFF" />
              </TouchableOpacity>
            </View>
          </ExpoCamera>
        ) : (
          <Image
            style={{ width: contentWidth, height: contentWidth }}
            source={{ uri: imageData ? imageData.uri : null }}
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
          paddingHorizontal: (width - contentWidth) / 2,
          paddingVertical: 27,
        }}
      >
        <ContainedButton
          disabled={imageData ? false : true}
          buttonStyle={{ flex: 1, marginRight: 20, backgroundColor: "#264f8f" }}
          label="RETAKE"
          onPress={() => {
            setImageData(null);
          }}
        />
        <ContainedButton
          buttonStyle={{ flex: 1 }}
          label={imageData ? "SAVE" : "SNAP"}
          onPress={() => (imageData ? onSave(imageData) : snap())}
        />
      </View>
    </View>
  );
};

export default Camera;
