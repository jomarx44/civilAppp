import React from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import PropTypes from "prop-types";
import { chunkSubstr } from "../../library/helpers";

export const AccountCard = ({
  data: { id, balance, name, currency },
  style,
  logo,
  logoStyle,
  ...props
}) => {
  return (
    <TouchableOpacity {...props} style={[styles.containerStyle, style]}>
      <Image style={[styles.logoStyle, logoStyle]} source={logo} />
      <View style={styles.headerStyle}>
        <Text style={styles.labelAvailableBalance}>Available Balance</Text>
        <Text styles={styles.balanceStyle}>{`${currency} ${balance}`}</Text>
      </View>
      <View style={styles.footerStyle}>
        <View style={styles.idContainerStyle}>
          {chunkSubstr(id, 4).map((item, index) => {
            return (
              <Text key={index.toString()} style={}>
                {item}
              </Text>
            );
          })}
        </View>
        <Text style={styles.labelCardHolder}>CARD HOLDER</Text>
        <Text style={styles.nameStyle}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export const AccountSavingsCard = (props) => {
  return <AccountCard {...props} />;
};

AccountCard.defaultVa;

AccountCard.propTypes = {
  data: PropTypes.object,
  style: PropTypes.any,
  logo: PropTypes.any,
  logoStyle: PropTypes.any,
};

export default AccountCard;

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 5,
    height: 200,
    padding: 30,
    width: 300,
  },
  headerStyle: {
    alignSelf: "flex-start"
  },
  footerStyle: {
    alignSelf: "flex-end"
  },
  labelAvailableBalance: {
    color: "#d3dde5",
    fontFamily: "Gilroy_Medium",
    fontSize: 11,
    marginBottom: 5,
  },
  balanceStyle: {
    color: "#FFFFFF",
    fontFamily: "Gilroy_Medium",
    fontSize: 30,
  },
  logoStyle: {
    height: 21,
    position: "absolute",
    right: 0,
    top: 0,
    width: 125,
  },
  idContainerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 9,
  }, 
  idStyle: {
    color: "#FFFFFF",
    fontFamily: "Gilroy_Medium",
    fontSize: 20,
    marginBottom: 5,
  },
  labelCardHolder: {
    color: "#FFFFFF",
    fontFamily: "Gilroy_Medium",
    fontSize: 11,
    marginBottom: 4,
  },
  nameStyle: {
    color: "#FFFFFF",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
  },
});
