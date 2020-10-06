import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#309FE7",
    alignItems: "center",
    flex: 1,
  },
  header: {
    width: 300,
    marginBottom: 25,
  },
  inputsContainer: {
    flexDirection: "row",
    width: 300
  },
  inputContainer: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  input: {
    width: 30,
    borderBottomColor: "#FFF",
    color: "#FFF",
    fontFamily: "Avenir_Medium",
    fontSize: 29,
    textAlign: "center",
  },
  keypadContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    width: 300,
  },
  keypadRow: {
    flexDirection: "row",
  },
  keypadButton: {
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    width: 100,
  },
  keypadButtonText: {
    color: "#FFF",
    fontSize: 28,
    fontFamily: "Avenir_Medium",
    textAlign: "center",
  },
});

export default styles;
