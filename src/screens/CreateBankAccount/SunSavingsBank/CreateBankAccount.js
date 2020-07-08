import React, { useState, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import ViewPager from "@react-native-community/viewpager";
import { config } from "./config";
import { PersonalInformation } from "./forms/PersonalInformation";
import { AdditionalInformation } from "./forms/AdditionalInformation";
import { HomeInformation } from "./forms/HomeInformation";
import { EmploymentInformation } from "./forms/EmploymentInformation";
import { IDs } from "./forms/IDs";
import { ElectronicSignature } from "./forms/ElectronicSignature";

export const CreateBankAccount = (props) => {
  const [page, setPage] = useState(0);
  const { lists, handleEvent, invalids, data } = props;
  const refViewPager = useRef();

  const goToPage = (page) => {
    refViewPager.current.setPage(page);
  };

  const nextPage = () => {
    const newPage = page + 1;
    setPage(newPage);
    goToPage(newPage);
  };

  const prevPage = () => {
    if (page > 0) {
      const newPage = page - 1;
      setPage(newPage);
      goToPage(newPage);
    }
  };

  const handleBackPress = () => {
    if (page !== 0) {
      prevPage();
      return true;
    }

    return false;
  };

  return (
    <AndroidBackHandler onBackPress={handleBackPress}>
      <View style={styles.containerStyle}>
        <ViewPager
          style={styles.viewPagerStyle}
          initialPage={0}
          scrollEnabled={false}
          ref={refViewPager}
        >
          <View key="1">
            <PersonalInformation
              constraints={config.personalInformation.constraints}
              handleEvent={handleEvent}
              invalids={invalids}
              data={data}
              lists={lists}
              nextPage={nextPage}
            />
          </View>
          <View key="2">
            <AdditionalInformation
              constraints={config.additionalInformation.constraints}
              handleEvent={handleEvent}
              invalids={invalids}
              data={data}
              lists={lists}
              nextPage={nextPage}
            />
          </View>
          <View key="3">
            <HomeInformation
              constraints={config.homeInformation.constraints}
              handleEvent={handleEvent}
              invalids={invalids}
              data={data}
              lists={lists}
              nextPage={nextPage}
            />
          </View>
          <View key="4">
            <EmploymentInformation
              constraints={config.employmentInformation.constraints}
              handleEvent={handleEvent}
              invalids={invalids}
              data={data}
              lists={lists}
              nextPage={nextPage}
            />
          </View>
          <View key="5">
            <IDs
              constraints={config.proofOfIdentity.constraints}
              handleEvent={handleEvent}
              invalids={invalids}
              data={data}
              lists={lists}
              nextPage={nextPage}
            />
          </View>
          <View key="6">
            <ElectronicSignature handleEvent={handleEvent} />
          </View>
        </ViewPager>
      </View>
    </AndroidBackHandler>
  );
};

export default CreateBankAccount;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  viewPagerStyle: {
    flex: 1,
  },
});
