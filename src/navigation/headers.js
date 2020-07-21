import React from "react";
import PropTypes from 'prop-types'
import { TopNavigation } from "../components/TopNavigation";
import { NavigationButtons } from "../components/NavigationButtons";
import { icons } from "../res/images/icons";

export const BackHeader = (props) => {
  const { goBack } = props;
  return (
    <TopNavigation
      leftLogo={
        <NavigationButtons
          logo={icons.ic_back_blue}
          onPress={() => {
            goBack();
          }}
        />
      }
    />
  );
}

export const BackHeaderBlue = (props) => {
  const { goBack } = props;
  return (
    <TopNavigation
      headerStyle={{backgroundColor: "#309FE7"}}
      leftLogo={
        <NavigationButtons
          logo={icons.ic_back_white}
          onPress={() => {
            goBack();
          }}
        />
      }
    />
  );
}

BackHeader.propTypes = {
  goBack: PropTypes.func.isRequired
}

export default BackHeader;
