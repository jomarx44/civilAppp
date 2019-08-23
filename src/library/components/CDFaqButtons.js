import React, { Component } from "react";
import { AppRegistry, StyleSheet, View, Dimensions} from "react-native";
import { Button, Text } from "native-base";
import { withNavigation } from 'react-navigation';

class CDFaqButtons extends Component {

  setParams(buttonInfo){
    if (this.props.goToScreen == 'FAQSections') {
      this.props.navigation.navigate('FAQSections',
      { 
        sections: buttonInfo.sections,
        categoryPath: buttonInfo.name + '  〉  '
      })
    } else if (this.props.goToScreen == 'FAQTopics') {
      this.props.navigation.navigate('FAQTopics',
      {
        topics: buttonInfo.topics,
        categoryPath: this.props.categoryPath + buttonInfo.name + '  〉  '
      })
    } else if (this.props.goToScreen == 'Topic') {
      this.props.navigation.navigate(this.props.goToScreen,
      { 
        topic_name: buttonInfo.name,
        topic_desc: buttonInfo.desc,
        categoryPath: this.props.categoryPath + buttonInfo.name
      })
    }
  }

  renderButtons(buttonArray){
    return buttonArray.map(buttonInfo => (
      <Button full rounded primary
        key={buttonInfo.id}
        style={styles.button}
        onPress={() => (this.setParams(buttonInfo))}>
        <Text>{buttonInfo.name}</Text>
      </Button>
    ));
  }

  render() {
    return (
        <View>{this.renderButtons(this.props.buttonArray)}</View>
    );
  }
}

let styles = StyleSheet.create({
  button: {
   marginTop: 20,
   marginLeft: 60,
   marginRight: 60,
   justifyContent: 'center',
   alignItems: 'center',
 }
});

export default withNavigation(CDFaqButtons);