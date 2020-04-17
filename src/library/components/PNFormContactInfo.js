import React, { useRef, useImperativeHandle, forwardRef } from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { Item, Label } from "native-base";

export function PNFormContactInfo ({invalid = "", value, editable = true, ...props}, ref) {
  const input = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => {
      input.current.focus();
    }
  }));

  return (
    <View style={styles.view}>
      <Item style={styles.text}>
        <Text style={styles.prefix_number}>+63</Text>
        <TextInput 
          {...props}
          editable={editable}
          keyboardType='number-pad'
          ref={input}
          style={[styles.input, !editable && styles.input_disabled]}
          value={value ? value.replace(/^0+/, '') : ''}
          maxLength={10}
        />
      </Item>
      <Text style={[styles.invalidText]}>{ invalid }</Text>
    </View>
  )
}

PNFormContactInfo = forwardRef(PNFormContactInfo);

PNFormContactInfo.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  autoCompleteType: PropTypes.string,
  reference: PropTypes.func,
  onSubmitEditing: PropTypes.func
};

let styles = StyleSheet.create({
  text: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  prefix_number: {
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010',
    width:'20%',
    marginRight: 5
  },
  input: {
    fontFamily: "Avenir_Book",
    fontSize: 20,
    color: '#F9A010',
    width:'80%'
  },
  input_disabled: {
    backgroundColor: "#EEEEEE"
  },
  view: {
    marginBottom: 25
  },
  invalidText: {
    marginTop: 5,
    fontFamily: 'Avenir_Medium',
    fontSize: 12,
    color: '#DC6061'
  }
});

export default PNFormContactInfo;
