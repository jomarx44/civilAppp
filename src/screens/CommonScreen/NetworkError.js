import React from 'react';
import {
  Button,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  StyleSheet
} from 'react-native';
import NavigationService from "../../navigation/NavigationService";

const NetworkError = ({callerNav}) => {

  const handlePress = () => {
    NavigationService.navigate(callerNav);
  }

  const styles = StyleSheet.create({
    container: {
      width: width,
      height: height,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    imageContainer: {
      flex:1
    },
    image: {
      
    },
    contentContainer: {
      flex: 1,
      padding: width * 0.15,
    },
    contentText: {
      fontFamily: 'Avenir_Heavy',
      fontSize: 24,
    },
    contentButton: {
      backgroundColor: '#309FE7',
      height: 50,
      width: 100
    },
    contentButtonText: {
      fontFamily: 'Avenir_Medium',
      color: '#FFF',
      fontSize: 18,
    }
  });

  const {
    height,
    width
  } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>

      </View>
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.contentText}>
            Ooops! There's something wrong connecting to the server.
          </Text>
          <Button
            style={styles.contentButton}
            onPress={handlePress}
          >
            <Text>Try Again</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}

export default NetworkError;