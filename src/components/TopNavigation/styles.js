import { DEFAULT_SECONDARY_COLOR } from "../../constants/colors";
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    height: 56,
    paddingTop: 12,
    marginBottom: 18,
    backgroundColor: "transparent",
  },
  leftHeaderStyle: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 30,
  },
  middleHeaderStyle: {
    backgroundColor: "transparent",
    flex: 5
  },
  rightHeaderStyle: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "flex-end",
    marginRight: 30
  },
  titleStyle: {
    fontFamily: "Gilroy_Bold",
    fontSize: 21,
    textAlign: "center",
    color: DEFAULT_SECONDARY_COLOR,
  },
});

export default styles;