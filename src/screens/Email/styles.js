import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#FFF",
    flex: 1,
    justifyContent: "center",
  },
  logo: {
    height: 230,
    width: 230,
    marginBottom: 15,
  },
  title: {
    color: "#444444",
    fontFamily: "Gilroy_Medium",
    fontSize: 32,
    marginBottom: 24,
  },
  description: {
    color: "#444444",
    fontFamily: "Gilroy_Medium",
    fontSize: 16,
    lineHeight: 22,
    textAlign: "center",
    marginBottom: 10,
    width: "80%",
    maxWidth: 400,
  },
});
