import React, { useEffect } from "react";
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  UPDATE_PROFILE_INITIALIZE,
  REQUEST_OTP_INITIALIZE,
  CHECK_OTP_INITIALIZE,
} from "../../../actions/types";

export const ProfileHeader = ({ containerStyle, name, email }) => {
  return (
    <View
      style={[
        styles.defaultContainerStyle,
        styles.headerContainer,
        containerStyle,
      ]}
    >
      <Text style={styles.headerTitle}>{name}</Text>
      <Text style={styles.headerSubtitle}>{email}</Text>
    </View>
  );
};

export const ProfileItem = ({
  containerStyle,
  disabledStyle,
  imagePath,
  text,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      disabled={disabled}
      activeOpacity={0.4}
      style={[
        styles.defaultContainerStyle,
        styles.itemContainer,
        containerStyle,
        disabled && styles.disabledContainerStyle,
        disabled && disabledStyle,
      ]}
    >
      <Image source={imagePath} resizeMode="center" style={styles.itemLogo} />
      <Text style={styles.itemText}>{text}</Text>
    </TouchableOpacity>
  );
};

export const ProfileScreen = ({ navigation, profile, otp, initializeReducers }) => {
  useEffect(() => {
    initializeReducers();
  }, []);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f7f7f7" }}
      contentContainerStyle={{ padding: 24 }}
    >
      <ProfileHeader
        name={profile.data.name.displayName}
        email={profile.data.emails[0].value}
      />
      <ProfileItem
        imagePath={require("res/images/icons/ic_lock.png")}
        text="Change Password"
        onPress={() => navigation.navigate("ChangePassword")}
      />
      <ProfileItem
        imagePath={require("res/images/icons/ic_mobileNumber.png")}
        text="Change Mobile Number"
        onPress={() => navigation.navigate("ChangeMobileNumber")}
      />
      {/* <ProfileItem
        disabled={true}
        imagePath={require("res/images/icons/ic_lock.png")}
        text="Activity Logs"
        onPress={() => navigation.navigate("")}
      />
      <ProfileItem
        disabled={true}
        imagePath={require("res/images/icons/ic_lock.png")}
        text="Notifications"
        onPress={() => navigation.navigate("")}
      /> */}
      <ProfileItem
        imagePath={require("res/images/icons/ic_lock.png")}
        text="Fingerprint"
        onPress={() => navigation.navigate("FingerprintScreen")}
      />
    </ScrollView>
  );
};

// ProfileScreen.PropTypes = {

// };

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeReducers: () => {
      dispatch({
        type: UPDATE_PROFILE_INITIALIZE,
      });
      dispatch({
        type: REQUEST_OTP_INITIALIZE,
      });
      dispatch({
        type: CHECK_OTP_INITIALIZE,
      });
    },
  };
};

const styles = StyleSheet.create({
  defaultContainerStyle: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    shadowColor: "#0d0000",
    shadowRadius: 20,
  },
  disabledContainerStyle: {
    backgroundColor: "#EEE",
  },
  headerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 105,
    marginBottom: 30,
  },
  headerTitle: {
    color: "#042c5c",
    fontFamily: "Avenir_Heavy",
    fontSize: 16,
    letterSpacing: 0.4,
    marginBottom: 5,
  },
  headerSubtitle: {
    color: "#77869e",
    fontFamily: "Avenir_Medium",
    fontSize: 13,
    letterSpacing: 0.11,
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 56,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  disabledItemContainer: {
    alignItems: "center",
    flexDirection: "row",
    height: 56,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  itemLogo: {
    height: 40,
    marginRight: 17,
    width: 40,
  },
  itemText: {
    color: "#042c5c",
    fontFamily: "Avenir_Medium",
    fontSize: 16,
    letterSpacing: 0.4,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
