import { 
  DARK_BLUE,
  WHITE
} from "../constants/colors"

export const headerOptions = ({
  headerLeft,
  headerTitleColor = DARK_BLUE,
  cardStyle = { backgroundColor: WHITE },
  title = "",
}) => {
  return {
    headerTitle: title,
    headerTitleAlign: "center",
    headerLeft: headerLeft,
    headerLeftContainerStyle: {
      marginLeft: 19,
      paddingHorizontal: 4,
    },
    headerStyle: {
      backgroundColor: "transparent",
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0, // remove shadow on iOS
    },
    headerTitleStyle: {
      color: headerTitleColor,
      fontFamily: "Gilroy_Bold",
      fontSize: 21,
    },
    cardStyle: cardStyle,
  };
};
