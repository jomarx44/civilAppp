import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { connect } from "react-redux";

import PNHeaderBlueSkip from "library/components/PNHeaderBlueSkip";

const data = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  },
  {
    title:
      "Lorem ipsum dolor sit amet consectetu adipiscing elit, sed do eiusmod ",
    datetime: "JANUARY 23, 2020 11:47",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. "
  }
];

export const AnnouncementScreen = ({announcements}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {announcements.map((announcement, index) => {
        return (
          <View style={styles.announcementContainer} key={index}>
            <Text style={styles.annnouncementTitle}>
              {announcement.title}
            </Text>
            <Text style={styles.announcementDateTime}>
              {announcement.datetime}
            </Text>
            <Text style={styles.announcementContent}>
              {announcement.content}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

AnnouncementScreen.navigationOptions = () => {
  return ({
    header: <PNHeaderBlueSkip title="Announcements" navid="Dashboard" />
  });
}

let styles = StyleSheet.create({
  container: {
    backgroundColor: "#309fe7"
  },
  contentContainer: {
    backgroundColor: "#309fe7",
    flexDirection: "column",
    padding: 25
  },
  announcementContainer: {
    borderRadius: 5,
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 20
  },
  annnouncementTitle: {
    fontFamily: "Avenir_Medium",
    fontSize: 16,
    color: "#1a1a25",
    marginBottom: 8
  },
  announcementDateTime: {
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#1a1a25",
    opacity: 0.5,
    marginBottom: 17
  },
  announcementContent: {
    fontFamily: "Avenir_Book",
    color: "#444444",
    fontSize: 15
  }
});

const mapStateToProps = (state, props) => {
  const announcements = data;
  return { announcements };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnnouncementScreen);
