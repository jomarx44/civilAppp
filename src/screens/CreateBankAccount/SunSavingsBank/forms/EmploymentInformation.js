import React from 'react'
import PNContentWithTitle from "library/Layout/Content/PNContentWithTitle";
import PNDropDown from "../../../../library/components/PNDropDown";
import PNFormButton from "library/components/PNFormButton";
import FormButtonContainer from "library/Layout/Containers/FormButtonContainer";

export const EmploymentInformation = (props) => {
  const {
    handleEvent,
    invalids,
    data: { source_of_fund, job_title },
    lists,
    constraints
  } = props;
  
  return (
    <React.Fragment>
      <PNContentWithTitle title="Employment Information">
        <PNDropDown
          placeholder={{ label: "Select Source of Fund", value: null }}
          onValueChange={(value, index) => {
            handleEvent("onChange", {
              index: "source_of_fund",
              value: value,
            });
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "source_of_fund_desc",
                  value: lists.fundSources[index - 1].label,
                },
                {
                  index: "source_of_fund",
                  value: value,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "source_of_fund_desc",
                  value: null,
                },
                {
                  index: "source_of_fund",
                  value: value,
                },
              ]);
            }
          }}
          options={lists.fundSources}
          selectedValue={source_of_fund}
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "source_of_fund" })
          // }
          invalid={invalids.source_of_fund ? invalids.source_of_fund[0] : ""}
        />
        <PNDropDown
          placeholder={{ label: "Select Job Title", value: null }}
          onValueChange={(value, index) => {
            if (index != 0) {
              handleEvent("onChange", [
                {
                  index: "job_title_desc",
                  value: lists.jobTitles[index - 1].label,
                },
                {
                  index: "job_title",
                  value: value,
                },
              ]);
            } else {
              handleEvent("onChange", [
                {
                  index: "job_title_desc",
                  value: null,
                },
                {
                  index: "job_title",
                  value: value,
                },
              ]);
            }
          }}
          options={lists.jobTitles}
          selectedValue={job_title}
          // onBlur={() =>
          //   handleEvent("onBlur", { constraints, index: "job_title" })
          // }
          invalid={invalids.job_title ? invalids.job_title[0] : ""}
        />
      </PNContentWithTitle>
      <FormButtonContainer>
        <PNFormButton
          onPress={() => {
            handleEvent("onNext", {
              fields: { source_of_fund, job_title },
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

export default EmploymentInformation

