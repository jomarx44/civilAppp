import { Image, Text, View } from "react-native";

import { Card } from "../../components/Card/index";
import React from "react";
import { icons } from "../../res/images/icons";
import { itemStyle } from "./styles";

export const ProofOfIdentityItem = ({
  title,
  description,
  logo,
  isDone,
  onPress,
}) => {
  return (
    <Card style={itemStyle.itemContainer} onPress={onPress}>
      <View style={itemStyle.itemTextContainer}>
        <Text style={itemStyle.itemTitle}>{title}</Text>
        <Text style={itemStyle.itemDescription}>{description}</Text>
      </View>
      <View style={itemStyle.itemLogoContainer}>
        <Image source={logo} style={itemStyle.itemLogo} resizeMode="contain" />
      </View>
      {isDone && <Image source={icons.ic_check} style={itemStyle.itemCheckLogo} />}
    </Card>
  );
};

export default ProofOfIdentityItem;
