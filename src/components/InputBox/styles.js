import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    backgroundColor: "#FFF",
    // borderColor: "#53ab32",
    // borderWidth: 1,
    flexDirection: "column",
    marginBottom: 20
  },
  label: {
    backgroundColor: "transparent",
    color: "#5d646c",
    fontSize: 18,
    fontFamily: "Gilroy_Medium",
    marginBottom: 4,
  },
  inputContainer: {
    backgroundColor: "transparent",
    borderBottomColor: "#e1e1e5",
    borderBottomWidth: 1,
  },
  input: {
    backgroundColor: "transparent",
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
    height: 40,
    paddingVertical: 6,
  },
  invalid: {
    marginTop: 5,
    fontFamily: "Avenir_Medium",
    fontSize: 12,
    color: "#DC6061"
  }
});

export default styles;