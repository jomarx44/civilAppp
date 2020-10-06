import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  AsyncStorage,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Accordion, Container, Icon, Text } from "native-base";

// Others
import { getProfileData, getAccessData } from "store/profile";
import { connect } from "react-redux";
import { profile as profileAPI } from "../../API";
import { setProfileData } from "../../actions/actionCreators";
import API from "../../actions/api";

import { getProfileAsync } from "../../redux/profile/actions";
import { getBankAccountsAsync } from "../../redux/bankAccount/actions";
import {
  getBankAsync,
  getCivilStatusAsync,
  getHomeOwnershipAsync,
  getIdListAsync,
  getJobTitleAsync,
  getNationalityAsync,
  getSourceOfFundAsync,
} from "../../redux/list/actions";

export const AccountItemHeader = ({
  item,
  expanded,
  headerStyle,
  textStyle,
  textActiveStyle,
  iconStyle,
  iconActiveStyle,
}) => {
  const { title } = item;
  return (
    <View style={[styles.defaultHeaderStyle, headerStyle]}>
      <Text
        style={[
          expanded
            ? styles.defaultHeaderTextActiveStyle
            : styles.defaultHeaderTextStyle,
          expanded ? textActiveStyle : textStyle,
        ]}
      >
        {title}
      </Text>
      <Icon
        style={[
          expanded ? styles.defaultIconActiveStyle : styles.defaultIconStyle,
          expanded ? iconActiveStyle : iconStyle,
        ]}
        name={expanded ? "ios-arrow-up" : "ios-arrow-down"}
      />
    </View>
  );
};

export const AccountItemContainer = ({ containerStyle, children }) => {
  return (
    <View style={[styles.defaultItemContainer, containerStyle]}>
      {children}
    </View>
  );
};

export const AccountItem = ({
  onPress,
  item: {
    accountNumberFormatted,
    accountMainName,
    accountCurrencyCode,
    accountLedgerFormatted,
  },
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={itemStyles.defaultButton}>
      <View style={itemStyles.defaultItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{accountMainName}</Text>
          <Text style={styles.cardSubTitle}>{accountNumberFormatted}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text
            style={styles.cardTextBalanceValue}
          >{`${accountCurrencyCode} ${accountLedgerFormatted}`}</Text>
          <Text style={styles.cardTextBalance}>Current Balance</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const AccountAddButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={itemStyles.defaultButton}>
      <View
        style={[
          itemStyles.defaultItem,
          { flexDirection: "row", justifyContent: "space-between" },
        ]}
      >
        <View style={{ flex: 3, flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.cardTitle}>Add Account</Text>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <Icon style={styles.iconArrow} name="ios-arrow-forward" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export const Dashboard = (props) => {
  const {
    auth,
    bankAccount,
    profile,
    user,
    getBankAccounts,
    getBank,
    getCivilStatus,
    getHomeOwnership,
    getIdList,
    getJobTitle,
    getNationality,
    getSourceOfFund,
    getProfile,
    navigation,
  } = props;

  const [accounts, setAccounts] = useState({
    LN: {
      title: "Loan Accounts",
      data: [],
    },
    TD: {
      title: "Time Deposit",
      data: [],
    },
    SA: {
      title: "Savings Account",
      data: [],
    },
  });

  useEffect(() => {
    getProfile(user.info.sub);
    getBank();
    getCivilStatus();
    getHomeOwnership();
    getIdList();
    getJobTitle();
    getNationality();
    getSourceOfFund();
    navigation.navigate("Announcement");
  }, []);

  useEffect(() => {
    const { firstName, middleName, lastName, emails, phoneNumbers } = user.info;
    if (profile.data?.attributes?.cis_no) {
      // getBankAccounts(profile.data?.attributes?.CISNumber)
      getBankAccounts(profile.data?.attributes?.cis_no);
    }

    if (!profile.data?.attributes?.name) {
      handleAddNameAtttribute(auth.accessToken, { firstName, middleName, lastName })
    }

    if (!profile.data?.attributes?.email) {
      handleAddEmailAtttribute(auth.accessToken, { email: emails[0].value })
    }

    if (!profile.data?.attributes?.phoneNumber) {
      handleAddPhoneNumberAtttribute(auth.accessToken, { phoneNumber: phoneNumbers[0].value })
    }
  }, [profile.data?.attributes]);

  // Fetch Bank List
  useEffect(() => {
    if (!bankAccount.status.isFetching) {
      if (bankAccount.list !== {} || !bankAccount.error) {
        const arrayedAccounts = Object.values(bankAccount.list);
        setAccounts((currentAccount) => ({
          ...currentAccount,
          LN: {
            ...currentAccount.LN,
            data: arrayedAccounts.filter(
              (account) => account.accountType === "LN"
            ),
          },
          SA: {
            ...currentAccount.SA,
            data: arrayedAccounts.filter(
              (account) => account.accountType === "SA"
            ),
          },
          TD: {
            ...currentAccount.TD,
            data: arrayedAccounts.filter(
              (account) => account.accountType === "TD"
            ),
          },
        }));
      }
    }
  }, [bankAccount.error, bankAccount.list]);

  // Add Default Name Attribute
  const handleAddNameAtttribute = (accessToken, {firstName, middleName, lastName}) => {
    profileAPI.addAttribute({
      accessToken: accessToken,
      attributeName: "name",
      attributeValue: {
        firstName,
        middleName,
        lastName,
      },
    });
  };

  // Add Default Email Attribute
  const handleAddEmailAtttribute = (accessToken, {email}) => {
    profileAPI.addAttribute({
      accessToken: accessToken,
      attributeName: "email",
      attributeValue: email,
    });
  };

  // Add Default PHone Number Attribute
  const handleAddPhoneNumberAtttribute = (accessToken, {phoneNumber}) => {
    profileAPI.addAttribute({
      accessToken: accessToken,
      attributeName: "phoneNumber",
      attributeValue: phoneNumber,
    });
  };

  const handleRefresh = () => {
    console.log("Attributes: ", profile.data?.attributes)
    if (profile.data?.attributes?.cis_no) {
      getBankAccounts(profile.data?.attributes?.cis_no);
    }
  };

  const handleCardPress = (accountNumber) => {
    navigation.navigate(
      "AccountHistory",
      accountNumber ? { accountNumber: accountNumber } : null
    );
  };

  const handleAdd = () => {
    navigation.navigate("ConnectCreateAccount");
  };

  return (
    <Container>
      <View style={styles.viewHeader}>
        {!profile.status.isFetching && (
          <React.Fragment>
            <Text style={styles.title}>
              {profile.data?.attributes?.name
                ? `${profile.data?.attributes?.name.firstName} ${profile.data?.attributes.name.lastName}`
                : `${user.info.firstName} ${user.info.lastName}`}
            </Text>
            <Text style={styles.subtitle}>
              {profile.data?.attributes?.email
                ? profile.data?.attributes.email
                : user.info.emails[0].value
              }
            </Text>
          </React.Fragment>
        )}
      </View>
      <View style={styles.viewAccounts}>
        <Accordion
          refreshControl={
            <RefreshControl
              refreshing={bankAccount.status.isFetching}
              onRefresh={handleRefresh}
            />
          }
          renderHeader={(item, expanded) => (
            <AccountItemHeader item={item} expanded={expanded} />
          )}
          renderContent={(items) => {
            return (
              <AccountItemContainer>
                {items.data &&
                  items.data.map((account, id) => {
                    return (
                      <AccountItem
                        key={id}
                        item={account}
                        onPress={() =>
                          handleCardPress(account.accountNumberFormatted)
                        }
                      />
                    );
                  })}
                <AccountAddButton onPress={handleAdd} />
              </AccountItemContainer>
            );
          }}
          dataArray={Object.values(accounts)}
          contentStyle={{ backgroundColor: "#ddecf8" }}
        />
      </View>
    </Container>
  );
};

const mapStateToProps = (state) => {
  const { auth, bankAccount, profile, user } = state;
  return { auth, bankAccount, profile, user };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (subId) => {
      dispatch(getProfileAsync(subId));
    },
    getBankAccounts: (CISNumber) => {
      dispatch(getBankAccountsAsync(CISNumber));
    },
    getAccounts: (cisno) => {
      dispatch(API.getAccounts(cisno));
    },
    setProfileData: (data) => {
      dispatch(setProfileData(data));
    },
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

const itemStyles = StyleSheet.create({
  defaultContainer: {
    marginVertical: 20,
  },
  defaultButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  defaultItem: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5eced",
    borderLeftWidth: 3,
    borderLeftColor: "#f9a010",
    borderRightWidth: 1,
    borderRightColor: "#e5eced",
    borderRadius: 5,
  },
});

const styles = StyleSheet.create({
  viewHeader: {
    flex: 1,
    backgroundColor: "#309fe7",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center",
  },
  defaultItemContainer: {
    marginVertical: 20,
  },
  card: {},
  cardTitle: {
    color: "#444444",
    fontSize: 15,
    fontFamily: "Avenir_Heavy",
  },
  cardSubTitle: {
    color: "#5d646c",
    fontSize: 11,
    fontFamily: "Avenir_Book",
  },
  cardTextBalanceValue: {
    textAlign: "right",
    color: "#3e4a59",
    fontSize: 17,
    fontFamily: "Avenir_Heavy",
  },
  cardTextBalance: {
    textAlign: "right",
    fontSize: 9,
    color: "#5d646c",
    fontFamily: "Avenir_Book",
  },
  defaultHeaderStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -1,
    borderWidth: 1,
    borderColor: "#cbcdd0",
  },
  defaultHeaderTextStyle: {
    fontFamily: "Avenir_Medium",
    marginLeft: 20,
    color: "#5d646c",
    fontSize: 16,
  },
  defaultHeaderTextActiveStyle: {
    fontFamily: "Avenir_Medium",
    marginLeft: 20,
    color: "#f5ac14",
    fontSize: 16,
  },
  defaultIconStyle: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
    color: "#5d646c",
  },
  defaultIconActiveStyle: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 30,
    color: "#309fe7",
  },
  iconArrow: {
    color: "#5d646c",
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Avenir_Heavy",
    marginBottom: 3,
  },
  subtitle: {
    color: "#ffffff",
    opacity: 0.7,
    fontSize: 12,
    fontFamily: "Avenir_Medium",
  },
  viewAccounts: {
    flex: 7,
    backgroundColor: "#f2f4f5",
  },
});
