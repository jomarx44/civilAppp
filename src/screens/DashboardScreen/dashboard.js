import React from "react";
import PNHeaderNoLogo from "library/components/PNHeaderNoLogo.js";
import {
  Dimensions,
  StyleSheet,
  View,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { Accordion, Container, Icon, Text } from "native-base";

import KeyboardShift from "library/components/CDKeyboardShift.js";
import NavigationService from "navigation/NavigationService.js";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import {
  isPinAuthenticated,
  isLoggedIn,
  getLoggedState,
  getToken
} from "store/auth";
import { getProfileData, getAccessData } from "store/profile";
import { connect } from "react-redux";
import API from "actions/api";

class DashboardScreen extends React.Component {
  state = {
    modalVisible: false,
    profileDetails: {},
    loanAccounts: {
      title: "Loan Accounts",
      data: []
    },
    timeDeposit: {
      title: "Time Deposit",
      data: []
    },
    savingsAccount: {
      title: "Savings Account",
      data: []
    }
  };

  constructor(props) {
    super(props);
  }

  async componentDidMount() {
    let authData = await getAccessData();
    let profileDetails = await getProfileData();
    this.props.getAccounts();
    this.setState({ profileDetails });
  }

  static navigationOptions = {
    header: <PNHeaderNoLogo title="My Accounts" />
  };

  checkCiS14 = async () => {
    return await AsyncStorage.getItem("cis14");
  };

  onPressCard = async (navid, acctno = "") => {
    const cis14 = await this.checkCiS14();
    console.log(`CIS14: ${cis14}`);
    if (cis14 && cis14.initial_deposit) {
      navid = "CIS14";
    }
    NavigationService.navigate(navid, { acctno });
  };

  _renderHeader = (section, expanded) => {
    return (
      <View style={styles.header}>
        <View style={{ flex: 3 }}>
          {expanded ? (
            <Text style={styles.headerTextActive}>{section.title}</Text>
          ) : (
            <Text style={styles.headerText}>{section.title}</Text>
          )}
        </View>
        <View style={{ flex: 1, flexDirection: "row-reverse" }}>
          {expanded ? (
            <Icon style={styles.iconActive} name="ios-arrow-down" />
          ) : (
            <Icon style={styles.icon} name="ios-arrow-forward" />
          )}
        </View>
      </View>
    );
  };

  _renderContent = section => {
    console.log(section);
    let viewdata = [];

    if (section.data && section.data.length > 0) {
      console.log(section.data[0].title);
      viewdata = section.data.map(data => {
        return (
          <TouchableOpacity
            onPress={() =>
              this.onPressCard("AccountHistoryScreen", data.acctno)
            }
            key={data.key}
          >
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{data.title}</Text>
                <Text style={styles.cardSubTitle}>{data.acctno}</Text>
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.cardTextBalanceValue}>{data.balance}</Text>
                <Text style={styles.cardTextBalance}>Current Balance</Text>
              </View>
            </View>
          </TouchableOpacity>
        );
      });
    }

    return (
      <View style={styles.content}>
        {viewdata}
        <TouchableOpacity
          onPress={() => this.onPressCard("ConnectCreateAccountScreen")}
        >
          <View style={[styles.card, { flex: 1, flexDirection: "row" }]}>
            <View style={{ flex: 3, flexDirection: "row" }}>
              <Text style={[styles.cardTitle, { marginBottom: 10 }]}>
                Add Account
              </Text>
            </View>
            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
              <Icon style={styles.iconArrow} name="ios-arrow-forward" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    let profileFullName = "NA";
    let profileEmail = "NA";
    if (this.state.profileDetails) {
      profileFullName = this.state.profileDetails.name;
      profileEmail = this.state.profileDetails.email;
    }

    if (this.props.account.is_fetching) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }

    return (
      <Container>
        <View style={styles.viewHeader}>
          <Text style={styles.title}>{profileFullName}</Text>
          <Text style={styles.subtitle}>{profileEmail}</Text>
        </View>
        <View style={styles.viewAccounts}>
          <Accordion
            renderHeader={this._renderHeader}
            renderContent={this._renderContent}
            animation={true}
            dataArray={this.props.account.data}
            contentStyle={{ backgroundColor: "#ddecf8" }}
          />
        </View>
      </Container>
    );
  }
}

let styles = StyleSheet.create({
  viewHeader: {
    flex: 1,
    backgroundColor: "#309fe7"
  },
  content: {
    marginBottom: 10
  },
  card: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e5eced",
    borderLeftWidth: 1,
    borderLeftColor: "#e5eced",
    borderRightWidth: 1,
    borderRightColor: "#e5eced",
    borderLeftColor: "#f9a010",
    borderLeftWidth: 2
  },

  cardTitle: {
    marginTop: 10,
    marginLeft: 10,
    color: "#042c5c",
    fontSize: RFValue(15)
  },

  cardSubTitle: {
    marginLeft: 10,
    color: "#5d646c",
    fontSize: RFValue(11)
  },

  cardTextBalanceValue: {
    marginTop: -10,
    marginRight: 20,
    textAlign: "right",
    fontSize: RFValue(15)
  },

  cardTextBalance: {
    marginRight: 20,
    textAlign: "right",
    fontSize: RFValue(9),
    marginBottom: 20
  },

  header: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#cbcdd0"
  },
  headerText: {
    marginTop: 20,
    marginBottom: 14,
    marginLeft: 20,
    color: "#5d646c",
    fontSize: 16,
    fontWeight: "400"
  },
  headerTextActive: {
    marginTop: 20,
    marginBottom: 14,
    marginLeft: 20,
    color: "#309fe7",
    fontSize: 16,
    fontWeight: "400"
  },

  icon: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
    color: "#5d646c"
  },

  iconArrow: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 32,
    color: "#5d646c"
  },

  iconActive: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
    color: "#309fe7"
  },

  title: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "400"
  },
  subtitle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
    color: "#c4ffffff",
    fontSize: 12,
    fontWeight: "400"
  },

  viewAccounts: {
    flex: 7,
    backgroundColor: "#f2f4f5"
  }
});

const mapStateToProps = (state, props) => {
  const { account } = state;
  console.log("Accounts: ", account);
  return { account };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccounts: (cisno = "1590000062") => {
      dispatch(API.getAccounts(cisno));
    },
    getAccountHistory: (acctno = "001-01-00027-7", count = "10") => {
      dispatch(API.getAccountHistory(acctno, count));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
