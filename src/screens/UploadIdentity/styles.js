import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 8,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center", 
    flexDirection: "column",
    paddingHorizontal: 24
  },
  buttonContainer: {
    padding: 27
  }
});

export const itemStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    marginBottom: 14,
    paddingHorizontal: 10
  },
  imageContainer: {
    width: 130,
  },
  image: {
    height: 70,
    width: 105
  },
  detailsContainer: {
    flexGrow: 1
  },
  title: {
    color: "#003d6f",
    fontFamily: "Gilroy_Bold",
    fontSize: 14,
    letterSpacing: 0,
    marginBottom: 5
  },
  description: {
    color: "#0047cc",
    fontFamily: "Gilroy_Bold",
    fontSize: 11,
    letterSpacing: 0
  },
  remove:{
    backgroundColor: "transparent",
    height: 30,
    position: "absolute",
    right: 10,
    top: 20,
    width: 30,
  }
});

export default styles;
