import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { PNFormInputBox } from "../../library/components/PNFormInputBox";
import PNFormContactInfo from "../../library/components/PNFormContactInfo";
import PNFormDatePicker from "../../library/components/PNFormDatePicker";
 
export default () => {
  const [value, setValue] = useState(""); 
  const [contact, setContact] = useState("");
 
  return (
    <View style={{marginTop: 50}}>
      <PNFormInputBox 
        value={value}
        onChangeText={(text) => setValue(text)}
        placeholder="Sample"
      />
      <PNFormContactInfo 
        value={contact}
        onChangeText={(text) => setContact(text)}
      />
    </View>
  );
}