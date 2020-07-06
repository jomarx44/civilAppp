import { ScrollView, View, Text } from "react-native";

// Custom Components
import KeyboardShift from "library/components/KeyboardShift";
import { Description, Title } from "../../components/Text";
import React from "react";
import { styles } from "./styles";

export const ScreenWithTitleAndDescription = ({
  title,
  description,
  children,
  containerStyle,
  headerStyle,
  bodyStyle,
  bodyContentStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <KeyboardShift>
        <View style={[styles.header, headerStyle]}>
          <Title>{title}</Title>
          <Description>{description}</Description>
        </View>
        <ScrollView
          persistentScrollbar={true}
          style={[styles.body, bodyStyle]}
          contentContainerStyle={[styles.bodyContent, bodyContentStyle]}
        >
          {children}
        </ScrollView>
      </KeyboardShift>
    </View>
  );
};

export default ScreenWithTitleAndDescription;
