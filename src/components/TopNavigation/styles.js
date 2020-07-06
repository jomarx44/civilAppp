import { DEFAULT_SECONDARY_COLOR } from "../../constants/colors";
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 30,
    backgroundColor: "transparent",
  },
  leftHeaderStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  middleHeaderStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 5
  },
  rightHeaderStyle: {
    alignItems: "center",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  titleStyle: {
    fontFamily: "Gilroy_Bold",
    fontSize: 21,
    textAlign: "center",
    color: DEFAULT_SECONDARY_COLOR,
  },
});

export default styles;