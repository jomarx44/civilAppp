import React from "react";
import PNFormTextBox from "../../../library/components/PNFormTextBox";

export const Form1 = ({onChangeText}) => {
  let input_first_number = React.createRef();
  let input_middle_name = React.createRef();
  let input_last_name = React.createRef();

  return (
    <>
      <PNFormTextBox
        title="First Name"
        ref={input => {
          input_first_number = input;
        }}
        onChangeText={text => onChangeText(text, "first_name")}
        onSubmitEditing={() => input_middlename.current.focus()}
      />
      <PNFormTextBox
        title="Middle Name"
        ref={input => {
          input_middle_name = input;
        }}
        onChangeText={text => onChangeText(text, "middle_name")}
        onSubmitEditing={() => input_last_name.current.focus()}
      />
      <PNFormTextBox
        title="Last Name"
        ref={input => {
          input_last_name = input;
        }}
        onChangeText={text => onChangeText(text, "last_name")}
      />
    </>
  );
};

export const Form2 = props => {};

export const Form3 = props => {};

export const Form4 = props => {};

export const Form5 = props => {};

export const Form6 = props => {};

export const Form7 = props => {};

export const Form8 = props => {};

export const Form9 = props => {};

export const Form10 = props => {};

export const Form11 = props => {};

export const Form12 = props => {};

export const Form13 = props => {};

export const Form14 = props => {};
