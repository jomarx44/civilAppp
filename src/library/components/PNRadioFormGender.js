import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, Label, ListItem, Text, Radio, Right, Left } from 'native-base';


class PNRadioFormGender extends Component {
    constructor() {
        super();
        this.state = {
            male: true,
            female: false
        }
    }

    toggleRadio1() {
        this.setState({
          male: true,
          female: false,
        });
      }

      toggleRadio2() {
        this.setState({
          male: false,
          female: true
        });
      }
      

    render() {
        const { title } = this.props;
        return (
            <View style = {styles.view}>
                <Label style = {styles.label}>{title}</Label>
                <ListItem
                    selected={this.state.male}
                    onPress={() => this.toggleRadio1()}
                    style={styles.radioStyle}
                >
                    <Left>
                        <Text>Male</Text>
                    </Left>
                    <Right>
                        <Radio
                            selected={this.state.male}
                            onPress={() => this.toggleRadio1()}
                        />
                    </Right>
                </ListItem>
                <ListItem
                    selected={this.state.radio2}
                    onPress={() => this.toggleRadio2()}
                    style={styles.radioStyle}
                >
                    <Left>
                        <Text>Female</Text>
                    </Left>
                    <Right>
                        <Radio
                            selected={this.state.female}
                            onPress={() => this.toggleRadio2()}
                        />
                    </Right>
                </ListItem>
            </View>
        )
    }
}

let styles = StyleSheet.create({
    view: {
        marginTop: 30,
        marginBottom: 10
    },
    label: {
        marginLeft: 30,
        marginRight: 30,
        marginBottom: 20,
        fontSize: 18,
        fontWeight: '400',
        color: '#5d646c'
    },
    radioStyle: {
        marginLeft: 30,
        marginBottom: 30,
        width: '85%',
    }
});

export default PNRadioFormGender;