import React from "react";
import {
  Alert,
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
import PNHeaderNoLogo from "library/components/PNHeaderNoLogo.js";
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
    profileDetails: {
      name: "",
      email: ""
    },
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
    NavigationService.navigate("Announcement");
  }

  static navigationOptions = {
    header: <PNHeaderNoLogo title="My Accounts" />
  };

  checkCiS14 = async () => {
    return await AsyncStorage.getItem("cis14");
  };

  onPressCard = async (navid, acctno = "") => {
    const cis14 = await this.checkCiS14();
    if (cis14 && cis14.initial_deposit) {
      navid = "CIS14";
    }
    // this.props.getAccountDetails(acctno);
    this.props.navigation.navigate(navid, { acctno });
  };

  onAddAccount = (navid) => {
    this.props.navigation.navigate(navid);
  }

  _renderHeader = (section, expanded) => {
    return (
      <View style={styles.header}>
        <Text style={expanded ? styles.headerTextActive : styles.headerText}>
          {section.title}
        </Text>
        <Icon
          style={expanded ? styles.iconActive : styles.icon}
          name={expanded ? "ios-arrow-up" : "ios-arrow-down"}
        />
      </View>
    );
  };

  _renderContent = section => {
    let viewdata = [];

    if (section.data && section.data.length > 0) {
      viewdata = section.data.map(data => {
        return (
          <TouchableOpacity
            onPress={() =>
              this.onPressCard("AccountHistory", data.acctno)
            }
            key={data.key}
            style={{ paddingHorizontal: 20, paddingVertical: 5 }}
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
          onPress={() => this.onAddAccount("ConnectCreateAccount")}
          style={{ paddingHorizontal: 20, paddingVertical: 5 }}
        >
          <View
            style={[
              styles.card,
              { flex: 1, flexDirection: "row", justifyContent: "space-between" }
            ]}
          >
            <View
              style={{ flex: 3, flexDirection: "row", alignItems: "center" }}
            >
              <Text style={styles.cardTitle}>Add Account</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <Icon style={styles.iconArrow} name="ios-arrow-forward" />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    
    if(this.props.appAttribute) {
      console.log('APPATTRIBUTE: ', this.props.appAttribute);
    }

    if(this.props.accounts.error) {
      Alert.alert("Sun Savings Bank", "Ooops! There's something wrong connecting to the server. Please try again.");
    }
    
    if(!this.props.accounts.is_fetching) {
      const {profileDetails: {
        name = 'NA',
        email = 'NA'
      }} = this.state;
      console.log(this.state.profileDetails)
      return (
        <Container>
          <View style={styles.viewHeader}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{email}</Text>
          </View>
          <View style={styles.viewAccounts}>
            <Accordion
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              animation={true}
              dataArray={this.props.accounts.list}
              contentStyle={{ backgroundColor: "#ddecf8" }}
            />
          </View>
        </Container>
      );
    }

    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <ActivityIndicator size="large" color="#f9a010" />
      </View>
    );
  }
}

let styles = StyleSheet.create({
  viewHeader: {
    flex: 1,
    backgroundColor: "#309fe7",
    padding: 20,
    flexDirection: "column",
    justifyContent: "center"
  },
  content: {
    marginVertical: 20
  },
  card: {
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
    borderRadius: 5
  },
  cardTitle: {
    color: "#444444",
    fontSize: 15,
    fontFamily: "Avenir_Heavy"
  },
  cardSubTitle: {
    color: "#5d646c",
    fontSize: 11,
    fontFamily: "Avenir_Book"
  },
  cardTextBalanceValue: {
    textAlign: "right",
    color: '#3e4a59',
    fontSize: 17,
    fontFamily: "Avenir_Heavy"
  },
  cardTextBalance: {
    textAlign: "right",
    fontSize: 9,
    color: '#5d646c',
    fontFamily: "Avenir_Book"
  },
  header: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: -1,
    borderWidth: 1,
    borderColor: "#cbcdd0"
  },
  headerText: {
    fontFamily: "Avenir_Medium",
    marginLeft: 20,
    color: "#5d646c",
    fontSize: 16
  },
  headerTextActive: {
    fontFamily: "Avenir_Medium",
    marginLeft: 20,
    color: "#f5ac14",
    fontSize: 16
  },
  icon: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
    color: "#5d646c"
  },
  iconArrow: {
    color: "#5d646c"
  },
  iconActive: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 30,
    color: "#309fe7"
  },
  title: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "Avenir_Heavy",
    marginBottom: 3
  },
  subtitle: {
    color: '#ffffff',
    opacity: 0.7,
    fontSize: 12,
    fontFamily: "Avenir_Medium"
  },
  viewAccounts: {
    flex: 7,
    backgroundColor: "#f2f4f5"
  }
});

const mapStateToProps = (state, props) => {
  const { accounts, appAttribute, auth } = state;
  return { accounts,appAttribute, auth };
};

const mapDispatchToProps = dispatch => {
  return {
    getAccounts: (cisno = "1590000062") => {
      dispatch(API.getAccounts(cisno));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardScreen);
