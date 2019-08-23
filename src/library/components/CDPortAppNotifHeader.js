import React from "react";
import { Alert, View, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native"
import { Container, Text } from "native-base";
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import API from 'actions/api';
import moment from 'moment';


class CDPortAppNotifHeader extends React.Component {

  constructor(props){
    super(props);
    this.state = { screenName: 'Portfolio', token:''}
  }

  componentDidMount() {
    this.checkUserToken();
  }

  checkUserToken = async () => {
    const token = await AsyncStorage.getItem('USER_TOKEN');
    if (token) {
      this.setState({ token: token});
    }
  };


  getPortfolio = () => {
    console.log("napasok dto..")
    this.props.getPortfolio(this.state.token)
    this.props.navigation.navigate("Portfolio")
    console.log("this.propsP: ",this.props)
  }

  getNotification = () => {
    this.props.getNotification(this.state.token)
    this.props.navigation.navigate("Notifications")
    console.log("this.propsN: ",this.props)
  }

  getApplication = () => {
    this.props.getApplication(this.state.token)
    this.props.navigation.navigate("Applications")
    console.log("this.propsN: ",this.props)
  }


  render() {
    let isPortfolio = false
    let isApplications = false
    let isNotifications = false

    if(this.props.propScreenName == "Portfolio"){
      isPortfolio = true
    } else if (this.props.propScreenName == "Applications")  {
      isApplications = true
    } else if (this.props.propScreenName == "Notifications"){
      isNotifications = true
    }

    return (

        <View style={styles.viewDirection}>

          { isPortfolio? 
              <TouchableOpacity style={[styles.flex1]}>
                <Text allowFontScaling={false} style={[styles.chosenText]} >PORTFOLIO</Text>
              </TouchableOpacity>
            : 
              <TouchableOpacity style={[styles.flex1]} onPress={() => this.getPortfolio()}>
                <Text allowFontScaling={false} style={[styles.baseText]}>PORTFOLIO</Text>
              </TouchableOpacity>
          }

          { isApplications? 
              <TouchableOpacity style={[styles.flex2]}>
                <Text allowFontScaling={false} style={[styles.chosenText]} >APPLICATIONS</Text>
              </TouchableOpacity>
            : 
              <TouchableOpacity style={[styles.flex2]} onPress={() => this.getApplication()}>
                <Text allowFontScaling={false} style={[styles.baseText]}>APPLICATIONS</Text>
              </TouchableOpacity>
          }

          { isNotifications? 
              <TouchableOpacity style={[styles.flex2]}>
                <Text allowFontScaling={false} style={[styles.chosenText]} >NOTIFICATIONS</Text>
              </TouchableOpacity>
            : 
              <TouchableOpacity style={[styles.flex2]} onPress={() => this.getNotification()}>
                <Text allowFontScaling={false} style={[styles.baseText]}>NOTIFICATIONS</Text>
              </TouchableOpacity>
          }

        </View>

    );
  }
}

const styles = StyleSheet.create({
  chosenText: {
    textAlign: 'center',
    fontSize: 14,
    color: "#FA8043",
    fontFamily: "Poppins"
  },
  baseText:{
    textAlign: 'center',
    fontSize: 14,
    color: "#cacaca",
    fontFamily: "Poppins"
  },
  flex1:{
    flex:1.5
  },
  flex2:{
    flex:2
  },
  viewDirection:{
    flex:1,
    flexDirection:'row',
    paddingLeft:30,
    paddingRight:30,
  },

})

//export default withNavigation(CDPortAppNotifHeader);

const mapStateToProps = (state, props) => {
  let response = state.common ? state.common.portfolios : []
  let res = {data: response}
  if(response && response.portfolios){
    response.map(x=>{
      x.createdAt = moment(x.createdAt).format('MMMM DD, YYYY');
    })
    res = {portf_data: response}
  }
  if(response && response.notifications){
    response.map(x=>{
      x.value.createdAt = moment(x.value.createdAt).format('MMMM DD, YYYY');
    })
    res = {notif_data: response}
  }
  if(response && response.applications){
    response.map(x=>{
      x.createdAt = moment(x.createdAt).format('MMMM DD, YYYY');
    })
    res = {app_data: response}
  }
  return res;
}
const mapDispatchToProps = dispatch => {
  return {
    getPortfolio: (token) => {
      dispatch(API.getPortfolios(token));
    },
    getNotification: (token) => {
      dispatch(API.getNotifications(token));
    },
    getApplication: (token) => {
      dispatch(API.getApplications(token));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withNavigation(CDPortAppNotifHeader));