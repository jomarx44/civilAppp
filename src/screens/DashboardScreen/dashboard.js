import React from "react";
import PNHeaderNoLogo from "library/components/PNHeaderNoLogo.js"
import { StatusBar, Image, Dimensions, StyleSheet, ImageBackground, TextInput, View, BackHandler, PixelRatio, AsyncStorage} from "react-native";
import { Accordion, Container, Header, Title, Left, Center, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";

import KeyboardShift from "library/components/CDKeyboardShift.js"
import NavigationService from "navigation/NavigationService.js";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { isPinAuthenticated, isLoggedIn, getLoggedState, getToken } from "store/auth";
import { getProfileData, getAccessData } from "store/profile";
import { connect } from 'react-redux';
import API from 'actions/api';


const dataArray = [
  { title: "Debit Accounts (2)", content: "Lorem ipsum dolor sit amet", 
    data: [
     { key: 1, title: "Savings Account" , acctno : "0300 4563 3535", balance: "Php 10,340.10"},
     { key: 2, title: "Savings Account2" , acctno : "0300 0652 6675", balance: "Php 8,010.00"},
      ]  },
  { title: "Time Deposit", content: "Lorem ipsum dolor sit amet", data: [] },
  { title: "Savings Account", content: "Lorem ipsum dolor sit amet", data: [] },
  { title: "Credit Card", content: "Lorem ipsum dolor sit amet", data: [] }
];

class DashboardScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  checkStorage = async () => {
    var tt1 = await AsyncStorage.getItem('cis1');
    var tt2 = await AsyncStorage.getItem('cis2');
    var tt3 = await AsyncStorage.getItem('cis3');
    var tt4 = await AsyncStorage.getItem('cis4');
    var tt5 = await AsyncStorage.getItem('cis5');
    var tt6 = await AsyncStorage.getItem('cis6');
    var tt7 = await AsyncStorage.getItem('cis7');
    console.log("TT1: ", tt1);
    console.log("TT2: ", tt2);
    console.log("TT3: ", tt3);
    console.log("TT4: ", tt4);
    console.log("TT5: ", tt5);
    console.log("TT6: ", tt6);
    console.log("TT7: ", tt7);
  }

  state = {
    modalVisible: false,
    profileDetails: {}
  }

  async componentDidMount() {
    let authData = await getAccessData();
    let profileDetails = await getProfileData();
    this.setState({profileDetails});
    this.checkStorage();
  }

  static navigationOptions = {
    header: (
      <PNHeaderNoLogo title="My Accounts" />
    )
  };


  _renderHeader = (section, expanded)  => {
    return (
      <View style={styles.header}>
        <View style={{flex: 3}}>
          {expanded
           ? <Text style={styles.headerTextActive}>{section.title}</Text> 
           : <Text style={styles.headerText}>{section.title}</Text>}
        </View>
        <View style={{flex: 1, flexDirection: 'row-reverse'}}>
          {expanded
          ? <Icon style={styles.iconActive} name="ios-arrow-down" />
          : <Icon style={styles.icon} name="ios-arrow-forward" />}
        </View>
      </View>
    );
  };




  _renderContent = section => {
    console.log(section);
    let viewdata = [];
   
    if (section.data && section.data.length > 0 ) {
      console.log(section.data[0].title);
      viewdata = section.data.map((data) => {
        return(
          <View key={data.key} style={styles.card}>
            <View style={{flex:1}}>
             <Text style={styles.cardTitle}>{data.title}</Text>
             <Text style={styles.cardSubTitle}>{data.acctno}</Text>
            </View>

            <View style={{flex:1}}>
                <Text style={styles.cardTextBalanceValue}>{data.balance}</Text>
                <Text style={styles.cardTextBalance}>Current Balance</Text>
            </View>
          </View>
        )
      });
    }

    return (
      <View style={styles.content}>
        {viewdata}
        <View style={[styles.card, { flex: 1, flexDirection: 'row'}]}>
          <View style={{flex:3, flexDirection: 'row'}}>
            <Text style={[styles.cardTitle, {marginBottom: 10}]}>Add Account</Text>
          </View>
          <View style={{flex:1, flexDirection: 'row-reverse'}}>
            <Icon style={styles.iconArrow} name="ios-arrow-forward" />
          </View>
        </View>
 
      </View>
    );
  };


  render() {
    let {height, width} = Dimensions.get('window');
    let profileFullName = "NA";
    let profileEmail = "NA";
    if (this.state.profileDetails ) {
        profileFullName = this.state.profileDetails.name;
        profileEmail = this.state.profileDetails.email;
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
            dataArray={dataArray}
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
    backgroundColor: '#309fe7' 
  },
  content: {
    marginBottom: 10,
  },
  card: {
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5eced',
    borderLeftWidth: 1,
    borderLeftColor: '#e5eced',
    borderRightWidth: 1,
    borderRightColor: '#e5eced',
    borderLeftColor: '#f9a010',
    borderLeftWidth: 2,
  },

  cardTitle: {
    marginTop: 10,
    marginLeft: 10,
    color: '#042c5c',
    fontSize: RFValue(15),
  },

  cardSubTitle: {
    marginLeft: 10,
    color: '#5d646c',
    fontSize: RFValue(11),
  },
  
  cardTextBalanceValue: {
    marginTop: -10,
    marginRight: 20,
    textAlign: 'right',
    fontSize: RFValue(15),
  },

  cardTextBalance: {
    marginRight: 20,
    textAlign: 'right',
    fontSize: RFValue(9),
    marginBottom: 20,
  },



  header: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#cbcdd0',
  },
  headerText: {
    marginTop: 20,
    marginBottom: 14,
    marginLeft: 20,
    color : '#5d646c',
    fontSize: 16,
    fontWeight: '400',
  },
  headerTextActive: {
    marginTop: 20,
    marginBottom: 14,
    marginLeft: 20,
    color : '#309fe7',
    fontSize: 16,
    fontWeight: '400',
  },
 
  icon: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
    color : '#5d646c',
  },
 
  iconArrow: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 32,
    color : '#5d646c',
  },

  iconActive: {
    marginTop: 16,
    marginBottom: 16,
    marginRight: 32,
    color : '#309fe7',
  },
 
  title: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 15,
    color : '#ffffff',
    fontSize: 18,
    fontWeight: '400',
  },
  subtitle: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 4,
    color : '#c4ffffff',
    fontSize: 12,
    fontWeight: '400',
  },
 
  viewAccounts: {
    flex: 7,
    backgroundColor: '#f2f4f5' 
  }

});


export default DashboardScreen;
