import React, { useRef } from 'react'
import PNContentWithTitle from "library/Layout/Content/PNContentWithTitle";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormDatePicker from "library/components/PNFormDatePicker";
import PNDropDown from "library/components/PNDropDown";
import PNFormButton from "library/components/PNFormButton";
import FormButtonContainer from "library/Layout/Containers/FormButtonContainer";

export const AdditionalInformation = (props) => {
  const {
    handleEvent,
    invalids,
    data: {
      birth_date,
      place_of_birth,
      mothers_maiden_name,
      civil_status,
      nationality,
    },
    lists,
    constraints
  } = props;

  const input_birthPlace = useRef();
  const input_motherMaidenName = useRef();

  return (
    <React.Fragment>
      <PNContentWithTitle title="Additional Information">
        <PNFormDatePicker
          title="Date of Birth"
          placeHolderText="Select Date of Birth"
          onDateChange={(date) => {
            handleEvent("onDateChange", {
              index: "birth_date",
              value: date,
            });
            // handleEvent("onBlur", { constraints, index: "birth_date" });
          }}
          maximumDate={new Date()}
          invalid={invalids.birth_date ? invalids.birth_date[0] : ""}
        />
        <PNFormInputBox
          placeholder="Place of Birth"
          ref={input_birthPlace}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "place_of_birth",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_motherMaidenName.current.focus();
          }}
          value={place_of_birth}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "place_of_birth" })
          }
          invalid={invalids.place_of_birth ? invalids.place_of_birth[0] : ""}
        />
        <PNFormInputBox
          placeholder="Mother's Maiden Name"
          ref={input_motherMaidenName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "mothers_maiden_name",
              value: text,
            })
          }
          // onSubmitEditing={() => {
          //   
          //   this.input_middle_name.current.focus();
          // }}
          value={mothers_maiden_name}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "mothers_maiden_name" })
          }
          invalid={
            invalids.mothers_maiden_name ? invalids.mothers_maiden_name[0] : ""
          }
        />
        <PNDropDown
          placeholder={{ label: "Select Civil Status", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "civil_status",
                  value: value,
                },
                {
                  index: "civil_status_desc",
                  value: lists.civilStatus[index - 1].label,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "civil_status",
                  value: value,
                },
                {
                  index: "civil_status_desc",
                  value: null,
                },
              ]);
            }
            // handleEvent("onBlur", { constraints, index: "civil_status" });
          }}
          options={lists.civilStatus}
          selectedValue={civil_status}
          title="Civil Status"
          // onBlur={() => 
          //   handleEvent("onBlur", { constraints, index: "civil_status" })
          // }
          invalid={invalids.civil_status ? invalids.civil_status[0] : ""}
        />
        <PNDropDown
          placeholder={{ label: "Select Nationality", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "nationality",
                  value: value,
                },
                {
                  index: "nationality_desc",
                  value: lists.nationality[index - 1].label,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "nationality",
                  value: value,
                },
                {
                  index: "nationality_desc",
                  value: null,
                },
              ]);
            }
          }}
          options={lists.nationality}
          selectedValue={nationality}
          title="Nationality"
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "nationality" })
          // }
          invalid={invalids.nationality ? invalids.nationality[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: {
                birth_date,
                place_of_birth,
                mothers_maiden_name,
                civil_status,
                nationality,
              },
              constraints,
            });
          }}
          disabled={false}
          label="NEXT"
        />
      </FormButtonContainer>
    </React.Fragment>
  )
}

export default AdditionalInformation
