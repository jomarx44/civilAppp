import React from "react";
import { AsyncStorage, StyleSheet, View, Dimensions, TouchableOpacity,Image } from "react-native";
import { Container, Header, Title, Button, Text } from "native-base";

import { connect } from 'react-redux';

export default class PersonalDetails extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    first_name: '',
    middle_name: '',
    last_name: '',
    emp_id: '',
    mobile_number: '',
    email: '',
    sss: '',
    tin: '',
  }

  getUserProfile = async () => {
    let profile = await AsyncStorage.getItem('PROFILE_DATA');
    profile = JSON.parse(profile)
    if (profile) {
      this.setState({ 
        first_name: profile.first_name,
        middle_name: profile.middle_name,
        last_name: profile.last_name,
        emp_id: this.hashData(profile.emp_no),
        mobile_number: this.hashData(profile.mobile_number),
        email: profile.email,
        sss: this.hashData(profile.sss),
        tin: this.hashData(profile.tin),
      });
    }
  };

  hashData(data){
    let data_len = data.length;
    let minus_two = data_len - 2;
    let last_chars = data.substring(minus_two, data_len);
    let hashed = '';
    let return_data = ''
    for( let i = 0; i < minus_two; i++){
      hashed = hashed + '*'
    }
    return_data = hashed + last_chars;
    
    return return_data;
  }

  componentDidMount() {
    this.getUserProfile();
  }

  render(){
    let {height, width} = Dimensions.get('window');
    return(
      <Container>
        <View>
          <View>
            <Text allowFontScaling={false} style={styles.TitleText}>PERSONAL DETAILS</Text>
          </View>

          <View style={{ marginTop: 15 }}>
            <Text allowFontScaling={false} style={styles.Name}>{this.state.first_name} {this.state.middle_name ? this.state.middle_name : ""} {this.state.last_name}</Text>
          </View>

          <View style={{ marginTop: 25 }}>
            <TouchableOpacity style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: width * 0.1}}
                onPress={() => this.props.navigation.navigate('EmployeeID', { emp_id: this.state.emp_id })}>
              <View style={{ alignItems: 'center', width: 30 }}>
                <Image source={require('res/images/personal_details_icon/ic_info.png')} />
              </View>
              <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                <Text allowFontScaling={false} style={[ styles.Field, { marginBottom: 10 } ]}>Employee ID</Text>
              </View>
              <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text allowFontScaling={false} style={ [styles.Field, { color: '#FA8043', marginBottom: 10, fontSize: 35 }] }>&#x203A;</Text>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: width * 0.1, marginTop: 40}}>
              <View style={{ alignItems: 'center', width: 30 }}>
                <Image source={require('res/images/personal_details_icon/ic_phone.png')} />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Text allowFontScaling={false} style={[ styles.Field, { marginBottom: 10 } ]}>{this.state.mobile_number ? this.state.mobile_number : "-"}</Text>
              </View>
              <View style={{ flexGrow: 0.5, alignItems: 'center' }}>
                <Text allowFontScaling={false} style={ [styles.Field, { color: '#FA8043', fontWeight: 'bold',marginBottom: 10 }] }> </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: width * 0.1, marginTop: 40}}>
              <View style={{ alignItems: 'center', width: 30 }}>
                <Image source={require('res/images/personal_details_icon/ic_mail.png')} />
              </View>
              <View style={{ alignSelf: 'center' }}>
                <Text allowFontScaling={false} style={[ styles.Field, { marginBottom: 10 } ]}>{this.state.email ? this.state.email : "-"}</Text>
              </View>
              <View></View>
            </View>

            <TouchableOpacity style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: width * 0.1, marginTop: 40}}
                onPress={() => this.props.navigation.navigate('OtherInfo', { sss: this.state.sss, tin: this.state.tin })}>
              <View style={{ alignItems: 'center', width: 30 }}>
                <Image source={require('res/images/personal_details_icon/ic_id.png')} />
              </View>
              <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                <Text allowFontScaling={false} style={[ styles.Field, { marginBottom: 10 } ]}>Other Information</Text>
              </View>
              <View style={{ flexGrow: 0.5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text allowFontScaling={false} style={ [styles.Field, { color: '#FA8043', marginBottom: 10, fontSize: 35 }] }>&#x203A;</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ flexDirection: 'row', width: width * 0.8, height: 30, alignItems: 'center', marginLeft: width * 0.1, marginTop: 40}}
                onPress={() => this.props.navigation.navigate('ChangePass')}>
              <View style={{ alignItems: 'center', width: 30 }}>
                <Image source={require('res/images/personal_details_icon/ic_lock.png')} />
              </View>
              <View style={{ flexGrow: 1, alignSelf: 'center' }}>
                <Text allowFontScaling={false}style={[ styles.Field, { marginBottom: 10 } ]}>Change Password</Text>
              </View>
              <View style={{ flexGrow: 0.5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text allowFontScaling={false}style={ [styles.Field, { color: '#FA8043', marginBottom: 10, fontSize: 35 }] }>&#x203A;</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

      </Container>

    )
  }
}

let styles = StyleSheet.create({
  TitleText: {
    color: '#FA8043',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 40,
  },
  RowView: {

  },
  DetailText: {
    color: '#7d7d7d',
    fontSize: 14,
    marginTop: 10,
  },
  FieldText: {
    color: '#7d7d7d',
    fontSize: 14,
    marginTop: 10,
    marginLeft: 40,
  },
  Name: {
    color: '#7d7d7d',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 40,
  },
  Field: {
    color: '#7d7d7d',
    fontSize: 15,
    marginTop: 10,
    marginLeft: 25,
  },
  button: {
   backgroundColor: '#FA8043',
   justifyContent: 'center',
   alignItems: 'center',
   width: 14,
   height: 14,
   fontSize: 14,
   marginLeft: 5,
   marginTop: 22,
   borderRadius: 2
 }
});

