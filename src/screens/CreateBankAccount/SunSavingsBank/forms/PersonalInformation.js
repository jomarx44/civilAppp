import React, { useRef } from "react";
import PNContentWithTitle from "library/Layout/Content/PNContentWithTitle";
import PNFormContactInfo from "library/components/PNFormContactInfo";
import PNFormInputBox from "library/components/PNFormInputBox";
import PNFormRadio from "library/components/PNFormRadio";
import PNFormButton from "library/components/PNFormButton";
import FormButtonContainer from "library/Layout/Containers/FormButtonContainer";

export const PersonalInformation = (props) => {
  // Props
  const {
    handleEvent,
    invalids,
    data: {
      title,
      appellation,
      firstName,
      middleName,
      lastName,
      email,
      gender,
      phoneNumber,
    },
    constraints
  } = props;

  // Refs
  const input_title = useRef();
  const input_appellation = useRef();
  const input_firstName = useRef();
  const input_middleName = useRef();
  const input_lastName = useRef();
  const input_email = useRef();
  const input_phoneNumber = useRef();

  return (
    <React.Fragment>
      <PNContentWithTitle title="Personal Information">
        <PNFormInputBox
          placeholder="Title"
          ref={input_title}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "title",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_firstName.current.focus();
          }}
          value={title}
          onBlur={() => handleEvent("onBlur", { constraints, index: "title" })}
          invalid={invalids.title ? invalids.title[0] : ""}
        />
        <PNFormInputBox
          placeholder="First Name"
          ref={input_firstName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "firstName",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_middleName.current.focus();
          }}
          value={firstName}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "firstName" })
          }
          invalid={invalids.firstName ? invalids.firstName[0] : ""}
        />
        <PNFormInputBox
          placeholder="Middle Name"
          ref={input_middleName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "middleName",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_lastName.current.focus();
          }}
          value={middleName}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "middleName" })
          }
          invalid={invalids.middleName ? invalids.middleName[0] : ""}
        />
        <PNFormInputBox
          placeholder="Last Name"
          ref={input_lastName}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "lastName",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_appellation.current.focus();
          }}
          value={lastName}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "lastName" })
          }
          invalid={invalids.lastName ? invalids.lastName[0] : ""}
        />
        <PNFormInputBox
          placeholder="Appellation"
          ref={input_appellation}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "appellation",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_phoneNumber.current.focus();
          }}
          value={appellation}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "appellation" })
          }
          invalid={invalids.appellation ? invalids.appellation[0] : ""}
        />
        <PNFormContactInfo
          title="Phone Number"
          ref={input_phoneNumber}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "phoneNumber",
              value: text,
            })
          }
          onSubmitEditing={() => {
            input_email.current.focus();
          }}
          onBlur={() =>
            handleEvent("onBlur", { constraints, index: "phoneNumber" })
          }
          value={phoneNumber}
          invalid={invalids.phoneNumber ? invalids.phoneNumber[0] : ""}
        />
        <PNFormInputBox
          placeholder="Email Address"
          ref={input_email}
          onChangeText={(text) =>
            handleEvent("onChange", {
              index: "email",
              value: text,
            })
          }
          onSubmitEditing={() => {
            // Focus Gender???
          }}
          value={email}
          onBlur={() => handleEvent("onBlur", { constraints, index: "email" })}
          invalid={invalids.email ? invalids.email[0] : ""}
        />
        <PNFormRadio
          items={[
            {
              onPress: () => {
                handleEvent("onChange", {
                  index: "gender",
                  value: "1",
                });
                // handleEvent("onBlur", { constraints, index: "gender" });
              },
              selected: gender == "1",
              title: "Male",
            },
            {
              onPress: () => {
                handleEvent("onChange", {
                  index: "gender",
                  value: "2",
                });
                // handleEvent("onBlur", { constraints, index: "gender" });
              },
              selected: gender == "2",
              title: "Female",
            },
          ]}
          invalid={invalids.gender ? invalids.gender[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: {
                title,
                appellation,
                firstName,
                middleName,
                lastName,
                email,
                phoneNumber,
                gender,
              },
              constraints,
            });
          }}
          disabled={false}
          label="NEXT"
        />
      </FormButtonContainer>
    </React.Fragment>
  );
};

export default PersonalInformation;
