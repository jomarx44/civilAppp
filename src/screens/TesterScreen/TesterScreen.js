import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

import { PNFormInputBox } from "../../library/components/PNFormInputBox";
import PNFormContactInfo from "../../library/components/PNFormContactInfo";
import PNFormDatePicker from "../../library/components/PNFormDatePicker";
import PNDropDown from "../../library/components/PNDropDown";

export default () => {
  const [value, setValue] = useState(""); 
  const [contact, setContact] = useState("");
  const [date, setDate] = useState(new Date());
  const [dropdownValue, setDropdownValue] = useState("")

  const inputDate = useRef();

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
        onSubmitEditing={() => {
          // console.log(inputDate.current);
          inputDate.current.focus()
        }}
      />
      <PNFormDatePicker 
        ref={inputDate}
        onDateChange={(date) => setDate(date)}
        title="Sample"
      />
      <PNDropDown
        options={[{label: "Sample", value: "Sample"}]}
        onValueChange={(value) => setDropdownValue(value)}
        placeholder={{label: "Select Dropdown", value: ""}}
        selectedValue={dropdownValue}
      />
    </View>
  );
}