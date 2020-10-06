import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";

// Other Components
import { TransactionItemAmount } from "../ItemAmount";
import { TransactionItemContainer } from "../ItemContainer";
import { TransactionItemDescription } from "../ItemDescription";
import { TransactionItemRow } from "../ItemRow";
import { TransactionItemType } from "../ItemType";

export const TransactionItem = (props) => {
  const {
    data: {
      // id,
      amount,
      date,
      invoice,
      type,
    },
    onPress,
    containerStyle,
  } = props;

  return (
    <TransactionItemContainer style={containerStyle} onPress={onPress}>
      <TransactionItemRow>
        <TransactionItemType>{type}</TransactionItemType>
        <TransactionItemAmount isCredit={Math.sign(amount) !== 1}>
          {amount}
        </TransactionItemAmount>
      </TransactionItemRow>
      <TransactionItemRow>
        <TransactionItemDescription>{date}</TransactionItemDescription>
      </TransactionItemRow>
      <TransactionItemRow>
        <TransactionItemDescription>{invoice}</TransactionItemDescription>
      </TransactionItemRow>
    </TransactionItemContainer>
  );
};

TransactionItem.propTypes = {
  data: PropTypes.object,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
};

export default TransactionItem;
