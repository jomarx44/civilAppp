import React, { useState } from "react";
import { View } from "react-native";
import { InputBox, constants } from "../../components/InputBox";

export const TesterScreen = () => {
  const [value, setValue] = useState();
  return (
    <View style={{ flex: 1, paddingTop: 100 }}>
      <InputBox
        // containerStyle={}
        // inputContainerStyle={}
        // inputStyle={}
        // labelStyle={}
        onChangeText={(value) => setValue(value)}
        label="Account Number"
        value={value}
      />
      <InputBox
        // containerStyle={}
        // inputContainerStyle={}
        // inputStyle={}
        // labelStyle={}
        onChangeText={(value) => setValue(value)}
        label="First Name"
        value={value}
      />
      <InputBox
        // containerStyle={}
        // inputContainerStyle={}
        inputStyle={{ fontFamily: "Avenir_Book" }}
        focusedInputContainerStyle={{
          borderBottomColor: constants.FONT_COLOR_ORANGE,
        }}
        filledInputContainerStyle={{ borderBottomWidth: 0 }}
        // labelStyle={}
        // label="First Name"
        onChangeText={(value) => setValue(value)}
        placeholder="City State"
        value={value}
      />
      <View style={{ backgroundColor: "#309fe7", padding: 30 }}>
        <InputBox
          containerStyle={{ borderRadius: 4 }}
          inputContainerStyle={{ borderBottomWidth: 0 }}
          inputStyle={{
            color: "#3e4a59",
            fontSize: 14,
            height: 48,
            paddingVertical: 0,
            paddingHorizontal: 16,
          }}
          filledInputStyle={{
            color: "#3e4a59",
            fontSize: 14,
            height: 48,
            paddingVertical: 0,
            paddingHorizontal: 16,
          }}
          onChangeText={(value) => setValue(value)}
          placeholder="Username"
          value={value}
        />
      </View>
    </View>
  );
};

export default TesterScreen;
