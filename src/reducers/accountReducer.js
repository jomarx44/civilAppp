import * as TYPE from "../actions/types";

const initialState = {
  is_fetching: true,
  data: {}
};

export default function accountReducer(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case TYPE.FETCH_ACCOUNTS:
      return state;
    case TYPE.FETCH_ACCOUNTS_SUCCESS:
      let accountListFormatted = [
        {
          title: "Loan Accounts",
          data: []
        },
        {
          title: "Time Deposit",
          data: []
        },
        {
          title: "Savings Account",
          data: []
        },
      ];

      const accountList = action.payload.data["Account.Info"].accts.a;
      accountList.map((account, index) => {
        let idx = 0;
        switch (account.accttype) {
          case "LN":
            idx = 0;
            break;
          case "TD":
            idx = 1;
            break;
          case "SA":
            idx = 2;
            break;
        }
        
        accountListFormatted[idx].data.push({
          key: index,
          title: account.Name1,
          acctno: account.AcctNoFormatted,
          balance: `PHP ${account.LedgerFormatted}`
        });
      });

      const output = {
        is_fetching: false,
        data: accountListFormatted
      };

      console.log("OUTPUT: ", output);
      return output;
    case TYPE.FETCH_ACCOUNTS_ERROR:
      action.payload.is_fetching = false;
      return action.payload;
    case TYPE.FETCH_ACCOUNTSHISTORY:
      return state;
    case TYPE.FETCH_ACCOUNTSHISTORY_SUCCESS:
      action.payload.is_fetching = false;
      console.log("FETCH ACCOUNTSHISTORY SUCCESS: ", action);
      return action.payload;
    case TYPE.FETCH_ACCOUNTSHISTORY_ERROR:
      action.payload.is_fetching = false;
      return action.payload;
    default:
      return state;
  }
}
