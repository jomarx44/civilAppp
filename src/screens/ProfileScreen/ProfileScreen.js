import {
  CHECK_OTP_INITIALIZE,
  REQUEST_OTP_INITIALIZE,
  UPDATE_PROFILE_INITIALIZE,
} from "../../actions/types";
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect } from "react";

import API from "../../actions/api"
import { DrawerActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
// Others
import { config } from "../../config";
import { useSafeArea } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { getProfileAsync } from "../../redux/profile/actions"
import { profile } from "../../API";

const { height, width } = Dimensions.get("window");

export const ProfileNavigationBar = ({
  onPressLeftButton,
  onPressRightButton,
}) => {
  return (
    <View style={styles.defaultNavigationBarContainer}>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity onPress={() => onPressLeftButton()}>
          {/* <MaterialIcons
            color="#FFF"
            name="menu"
            size={30}
          /> */}
          <Image
            style={{ height: 24, width: 24 }}
            source={config.icons.drawer}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 3, alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: "#FFF",
            fontFamily: "Gilroy_Bold",
            fontSize: 23,
            textAlign: "center",
          }}
        >
          Settings
        </Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <TouchableOpacity onPress={() => onPressRightButton()}>
          <MaterialIcons color="#FFF" name="edit" size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const ProfileHeader = ({ containerStyle, name, email, phoneNumber }) => {
  return (
    <View
      style={[
        styles.defaultContainerStyle,
        styles.headerContainer,
        containerStyle,
      ]}
    >
      {/* <Image style={styles.headerImage} /> */}
      <Text style={styles.headerTitle}>{name}</Text>
      <Text style={styles.headerSubtitle}>{email}</Text>
      <Text style={styles.headerSubtitle}>{phoneNumber}</Text>
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
      <View style={styles.itemLogoContainer}>
        <Image source={imagePath} resizeMode="cover" style={styles.itemLogo} />
      </View>
      <Text style={styles.itemText}>{text}</Text>
      <MaterialIcons color="#dddddd" name="chevron-right" size={25} />
    </TouchableOpacity>
  );
};

export const ProfileScreen = (props) => {
  const inset = useSafeArea();
  const {
    navigation,
    profile: {
      data,
      status: { isFetching }
    },
    getProfile,
    user,
    route: { params }
  } = props

  useEffect(() => {
    if(params?.reload) {
      handleRefresh()
    }
  }, [params?.reload])

  const handleRefresh = () => {
    getProfile(user.info.sub)
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#f7f7f7",
      }}
    >
      <View
        style={{
          backgroundColor: "#1e73be",
          borderBottomRightRadius: 32,
          height: "40%",
          width: "100%",
          top: 0,
          left: 0,
        }}
      />
      <View
        style={{
          backgroundColor: "#309fe7",
          borderBottomLeftRadius: height * 0.25,
          height: height * 0.25,
          width: height * 0.25,
          opacity: 0.68,
          position: "absolute",
          top: 0,
          right: 0,
        }}
      />
      <View
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          paddingTop: inset.top,
          backgroundColor: "transparent",
        }}
      >
        <ProfileNavigationBar
          onPressLeftButton={() =>
            navigation.dispatch(DrawerActions.openDrawer())
          }
          onPressRightButton={() => navigation.navigate("EditProfile", { formData: {
            firstName: data?.attributes?.name.firstName,
            middleName: data?.attributes?.name.middleName,
            lastName: data?.attributes?.name.lastName
          } })}
        />
        <ScrollView
          contentContainerStyle={{ padding: 24 }}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => handleRefresh()}
            />
          }
        >
          <ProfileHeader
            name={data?.attributes?.name ? `${data?.attributes?.name?.firstName} ${data?.attributes?.name?.middleName} ${data?.attributes?.name?.lastName}` : `${user.info.firstName} ${user.info.middleName} ${user.info.lastName}`}
            email={data?.attributes?.email ? data?.attributes?.email: user.info.emails[0].value}
            phoneNumber={data?.attributes.phoneNumber ? data?.attributes.phoneNumber : user.info.phoneNumbers[0].value}
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
            imagePath={require("res/images/icons/ic_finger.png")}
            text="Fingerprint"
            onPress={() => navigation.navigate("FingerprintScreen")}
          />
        </ScrollView>
      </View>
    </View>
  );
};

// ProfileScreen.PropTypes = {

// };

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (subID) => {
      dispatch(getProfileAsync(subID));
    },
  };
};

const styles = StyleSheet.create({
  defaultNavigationBarContainer: {
    backgroundColor: "transparent",
    height: 50,
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
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
    marginBottom: 30,
    paddingVertical: 24,
  },
  headerImage: {
    borderRadius: 8,
    borderWidth: 4,
    borderColor: "#f7f7f7",
    height: 80,
    marginBottom: 10,
    width: 80,
  },
  headerTitle: {
    color: "#042c5c",
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
    letterSpacing: 0.4,
    marginBottom: 10,
  },
  headerSubtitle: {
    color: "#77869e",
    fontFamily: "Gilroy_Medium",
    fontSize: 13,
    letterSpacing: 0.11,
    marginBottom: 10,
  },
  itemContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  itemLogoContainer: {
    flex: 1,
  },
  itemLogo: {
    height: 40,
    width: 40,
  },
  itemText: {
    flex: 5,
    color: "#042c5c",
    fontFamily: "Gilroy_Bold",
    fontSize: 16,
    letterSpacing: 0.4,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);
