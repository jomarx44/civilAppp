import React, { useEffect } from "react";
import { Text, View } from "react-native";
import {
  getBankAsync,
  getCivilStatusAsync,
  getHomeOwnershipAsync,
  getIdListAsync,
  getJobTitleAsync,
  getNationalityAsync,
  getSourceOfFundAsync,
} from "../../redux/list/actions";

import PropTypes from "prop-types";
import { connect } from "react-redux";

export const TesterContainer = (props) => {
  const {
    getBank,
    getCivilStatus,
    getHomeOwnership,
    getIdList,
    getJobTitle,
    getNationality,
    getSourceOfFund,
  } = props;

  useEffect(() => {
    getBank();
    // getCivilStatus();
    // getHomeOwnership();
    // getIdList();
    // getJobTitle();
    // getNationality();
    // getSourceOfFund();
  }, [])

  return <View></View>;
};

const mapStateToProps = (state) => {
  return {
    list: state.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBank: () => {
      dispatch(getBankAsync());
    },
    getCivilStatus: () => {
      dispatch(getCivilStatusAsync());
    },
    getHomeOwnership: () => {
      dispatch(getHomeOwnershipAsync());
    },
    getIdList: () => {
      dispatch(getIdListAsync());
    },
    getJobTitle: () => {
      dispatch(getJobTitleAsync());
    },
    getNationality: () => {
      dispatch(getNationalityAsync());
    },
    getSourceOfFund: () => {
      dispatch(getSourceOfFundAsync());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TesterContainer);
