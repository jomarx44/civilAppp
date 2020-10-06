import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";

// Others
import moment from "moment";
import { Transaction } from "./Transaction";
import { getBankAccountHistoryAsync } from "../../redux/bankAccount/actions";

export const TransactionContainer = (props) => {
  const [isAllShown, setIsAllShown] = useState(false);
  const {
    route: {
      params: { accountNumber },
    },
    bankAccount: { list, listByIds, historyList, status },
    getBankAccountHistory,
  } = props;

  const arrayedHistoryList = historyList[accountNumber]
    ? Object.values(historyList[accountNumber])
    : [];

  let formattedHistoryList = {};

  arrayedHistoryList.map((history) => {
    // Today
    if (moment().format("MMMM DD, YYYY") === history.date) {
      formattedHistoryList.today = {
        title: "Today",
        data:
          formattedHistoryList.today && formattedHistoryList.today.data
            ? [...formattedHistoryList.today.data, history]
            : [history],
      };

      return;
    }

    // Yesterday
    if (moment().subtract(1, "day").format("MMMM DD, YYYY") === history.date) {
      formattedHistoryList.yesterday = {
        title: "Yesterday",
        data:
          formattedHistoryList.yesterday && formattedHistoryList.yesterday.data
            ? [...formattedHistoryList.yesterday.data, history]
            : [history],
      };

      return;
    }

    // Other

    formattedHistoryList[history.date] = {
      title: history.date,
      data:
        formattedHistoryList[history.date] &&
        formattedHistoryList[history.date].data
          ? [...formattedHistoryList[history.date].data, history]
          : [history],
    };

    return;
  });

  useEffect(() => {
    if (!historyList[accountNumber]) {
      console.log("Called main");
      handleGetTransactions();
    }
  }, [accountNumber]);

  useEffect(() => {
    handleGetTransactions();
  }, [isAllShown]);

  const handleFilter = () => {
    setIsAllShown((currentFilterState) => !currentFilterState);
  };

  const handleGetTransactions = () => {
    getBankAccountHistory(accountNumber, isAllShown ? 50 : 10);
  };

  return (
    <Transaction
      data={Object.values(formattedHistoryList)}
      onFilter={handleFilter}
      onRefresh={handleGetTransactions}
      isRefreshing={status.isFetching}
      isAllShown={isAllShown}
    />
  );
};

const mapStateToProps = (state) => {
  const { bankAccount } = state;
  return { bankAccount };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBankAccountHistory: (accountNumber, count) => {
      dispatch(getBankAccountHistoryAsync(accountNumber, count));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionContainer);
