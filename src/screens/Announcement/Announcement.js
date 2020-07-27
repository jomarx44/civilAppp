import React from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet, Text, View } from "react-native";

export const Announcement = (props) => {
  const { announcements } = props;
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {announcements.map((announcement, index) => {
        return (
          <View style={styles.announcementContainer} key={index}>
            <Text style={styles.annnouncementTitle}>{announcement.title}</Text>
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
};

Announcement.propTypes = {
  announcements: PropTypes.array,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#309fe7",
  },
  contentContainer: {
    backgroundColor: "#309fe7",
    flexDirection: "column",
    padding: 25,
  },
  announcementContainer: {
    borderRadius: 5,
    backgroundColor: "#ffffff",
    padding: 20,
    marginBottom: 20,
  },
  annnouncementTitle: {
    fontFamily: "Avenir_Medium",
    fontSize: 16,
    color: "#1a1a25",
    marginBottom: 8,
  },
  announcementDateTime: {
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#1a1a25",
    opacity: 0.5,
    marginBottom: 17,
  },
  announcementContent: {
    fontFamily: "Avenir_Book",
    color: "#444444",
    fontSize: 15,
  },
});

export default Announcement;
