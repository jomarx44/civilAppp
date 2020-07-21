import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  formScrollStyle: {
    flexGrow: 1,    
  },
  formScrollContentStyle: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 30,
  },
  formContentStyle: {
    width: "80%",
    maxWidth: 300,
    paddingBottom: 50
  },  
  formHeaderStyle: {
    backgroundColor: "transparent",
    paddingVertical: 19
  }
});

export default styles;