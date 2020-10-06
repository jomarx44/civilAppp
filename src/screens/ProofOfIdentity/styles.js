import { StyleSheet } from "react-native";

export const itemStyle = StyleSheet.create({
  itemsContainer: {
    flex: 2,
  },
  itemsContentContainer: {
    padding: 24,
  },
  itemContainer: {
    borderStyle: "dashed",
    borderColor: "#979797",
    borderWidth: 2,
    height: 100,
    marginBottom: 25,
    maxWidth: 800,
    paddingHorizontal: 23,
    paddingVertical: 26,
  },
  itemTextContainer: {
    flex: 2,
    // alignItems: "center",
  },
  itemTitle: {
    color: "#0047cc",
    fontFamily: "Gilroy_Bold",
    fontSize: 15,
    letterSpacing: 0,
  },
  itemDescription: {
    color: "#444444",
    fontFamily: "Gilroy_Medium",
    fontSize: 12,
    letterSpacing: 0,
    lineHeight: 14,
  },
  itemLogoContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  itemLogo: {
    height: "100%",
    width: "100%",
  },
  itemCheckLogo: {
    height: 20,
    position: "absolute",
    right: 12,
    top: 12,
    width: 20,
  },
});
