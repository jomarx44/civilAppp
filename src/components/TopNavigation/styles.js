<<<<<<< HEAD
import { DARK_BLUE } from "../../constants/colors";
=======
import { DEFAULT_SECONDARY_COLOR } from "../../constants/colors";
>>>>>>> AC/pnmobile-live
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  headerStyle: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
<<<<<<< HEAD
    // paddingTop: 25,
    paddingVertical: 10,
=======
    paddingTop: 25,
    paddingBottom: 10,
>>>>>>> AC/pnmobile-live
    paddingHorizontal: 30,
    backgroundColor: "transparent",
  },
  leftHeaderStyle: {
<<<<<<< HEAD
    alignItems: "flex-start",
=======
    alignItems: "center",
>>>>>>> AC/pnmobile-live
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
<<<<<<< HEAD
    alignItems: "flex-end",
=======
    alignItems: "center",
>>>>>>> AC/pnmobile-live
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
  },
  titleStyle: {
    fontFamily: "Gilroy_Bold",
    fontSize: 21,
    textAlign: "center",
<<<<<<< HEAD
    color: DARK_BLUE,
=======
    color: DEFAULT_SECONDARY_COLOR,
>>>>>>> AC/pnmobile-live
  },
});

export default styles;