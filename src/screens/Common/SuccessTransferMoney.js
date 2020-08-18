import React, { useCallback } from "react";
import { StyleSheet, Text, View, BackHandler } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { LIGHT_BLUE, WHITE } from "../../constants/colors";
import { ContainedButton } from "../../components";
import { StackButtonView } from "../../layouts";
import { useFocusEffect } from "@react-navigation/native";

export const SuccessTransferMoney = (props) => {
  const {
    navigation,
    route: { params },
  } = props;

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("Dashboard");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  return (
    <View style={[styles.container]}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Interbank Funds Transfer request is being processed
        </Text>
      </View>
      <View style={styles.detailsContainer}>
        {/* <View> */}
          
        {/* </View> */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>
            You have successfully submitted your Interbank Funds Transfer request
            with the following details:
          </Text>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Bank Name</Text>
            <Text style={styles.value}>
              {params?.formData?.recipientBankName}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>{params?.formData?.amount}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Recipient Account Name</Text>
            <Text style={styles.value}>
              {params?.formData?.recipientAccountName}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.label}>Recipient Account Number</Text>
            <Text style={styles.value}>
              {params?.formData?.recipientAccountNumber}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={{fontFamily: "Avenir_Light", fontSize: 12}}>You may now check the status of your transaction with your receiver</Text>
          </View>
        </View>
        <AntDesign name="checkcircleo" size={50} color="#00ad64" style={styles.logo} />
      </View>
      <StackButtonView>
        <ContainedButton
          label="DONE"
          onPress={() => navigation.popToTop()}
        />
      </StackButtonView>
    </View>
  );
};

export default SuccessTransferMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00ad64",
    alignItems: "stretch",
    justifyContent: "center"
  },
  header: {
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    backgroundColor: "#FFF",
    borderRadius: 28,
    position: "absolute",
    top: -25
  },
  content: {
    backgroundColor: "#FFF",
    height: "80%",
    paddingHorizontal: 10,
    paddingVertical: 30
  },
  title: {
    color: "#FFF",
    fontFamily: "Gilroy_Medium",
    fontSize: 20,
    width: "90%",
    maxWidth: 300,
    textAlign: "center"
  },
  subtitle: {
    color: "#5d646c",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    lineHeight: 22,
    width: "90%",
    maxWidth: 300,
    textAlign: "center"
  },
  detailsContainer: {
    height: "60%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  detailItem: {
    width: "90%",
    maxWidth: 300,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  label: {
    color: "#444",
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
    width: 200,
  },
  value: {
    color: "#003d6f",
    fontFamily: "Gilroy_Medium",
    fontSize: 14,
    textAlign: "right",
    width: 100
  },
});
