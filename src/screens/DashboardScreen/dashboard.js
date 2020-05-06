import React from "react";
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
import { setProfileData } from "../../actions/actionCreators";
import API from "../../actions/api";

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

export const AccountItem = ({ onPress, item: { acctno, title, balance } }) => {
  return (
    <TouchableOpacity onPress={onPress} style={itemStyles.defaultButton}>
      <View style={itemStyles.defaultItem}>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubTitle}>{acctno}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTextBalanceValue}>{balance}</Text>
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

class DashboardScreen extends React.Component {
  state = {
    modalVisible: false,
    loanAccounts: {
      title: "Loan Accounts",
      data: [],
    },
    timeDeposit: {
      title: "Time Deposit",
      data: [],
    },
    savingsAccount: {
      title: "Savings Account",
      data: [],
    },
  };

  async componentDidMount() {
    let profile = await getProfileData();
    const { setProfileData, navigation } = this.props;

    if (!this.props.profile.data) {
      const { sub } = profile;
      const {
        displayName,
        emails,
        id,
        name: { givenName, middleName, familyName },
        phoneNumbers,
      } = profile.identities[0].idpUserInfo;
      this.props.getProfile(sub);
      // setProfileData({
      //   id,
      //   sub,
      //   emails,
      //   phoneNumbers,
      //   displayName,
      //   givenName,
      //   middleName,
      //   familyName
      // });
    }
    
    this.props.getAccounts(this.props.appAttribute.attributes.cis_no);

    // this.props.getAccounts("1590000062");
    navigation.navigate("Announcement");
  }

  onRefresh = () => {
    this.props.getAccounts(this.props.appAttribute.attributes.cis_no);
  }

  onPress = (navid, accountNumber) => {
    this.props.navigation.navigate(
      navid,
      accountNumber ? { accountNumber } : null
    );
  };

  onAddAccount = (navid) => {
    this.props.navigation.navigate(navid);
  };

  render() {
    const {
      accounts,
      profile: { data, ...profile },
    } = this.props;

    if (profile.isFetching || accounts.is_fetching) {
      return (
        <Container
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color="#f9a010" />
        </Container>
      );
    }
    return (
      <Container>
        <View style={styles.viewHeader}>
          <Text style={styles.title}>{data.name.displayName}</Text>
          <Text style={styles.subtitle}>{data.emails[0].value}</Text>
        </View>
        <View style={styles.viewAccounts}>
          <Accordion
            refreshControl={<RefreshControl refreshing={accounts.is_fetching} onRefresh={() => this.onRefresh()} />}
            renderHeader={(item, expanded) => (
              <AccountItemHeader item={item} expanded={expanded} />
            )}
            renderContent={(items) => {
              return (
                <AccountItemContainer>
                  {items.accountsById &&
                    items.accountsById.map((itemId, id) => {
                      
                      return (
                        <AccountItem
                          key={id}
                          item={items.accounts[itemId]}
                          onPress={() =>
                            this.onPress(
                              "AccountHistory",
                              items.accounts[itemId].acctno
                            )
                          }
                        />
                      );
                    })}
                  <AccountAddButton
                    onPress={() => this.onPress("ConnectCreateAccount")}
                  />
                </AccountItemContainer>
              );
            }}
            dataArray={Object.values(accounts.list)}
            contentStyle={{ backgroundColor: "#ddecf8" }}
          />
        </View>
      </Container>
    );
  }
}

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
    borderLeftWidth: 1,
    borderLeftColor: "#e5eced",
    borderRightWidth: 1,
    borderRightColor: "#e5eced",
    borderLeftColor: "#f9a010",
    borderLeftWidth: 3,
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

const mapStateToProps = (state, props) => {
  const { profile, accounts, appAttribute, auth, token } = state;
  return { profile, accounts, appAttribute, auth, token };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (id) => {
      dispatch(API.getProfile({ id }));
    },
    getAccounts: (cisno) => {
      dispatch(API.getAccounts(cisno));
    },
    setProfileData: (data) => {
      dispatch(setProfileData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
