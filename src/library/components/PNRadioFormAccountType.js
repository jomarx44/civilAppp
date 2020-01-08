import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, Label, ListItem, Text, Radio, Right, Left } from 'native-base';


class PNRadioFormGender extends Component {
    constructor() {
        super();
        this.state = {
            savings: true,
            time_deposit: false,
            current_account: false
        }
    }

    toggleSavings() {
        this.setState({
            savings: true,
            time_deposit: false,
            current_account: false
        });
      }

      toggleTimeDeposit() {
        this.setState({
            savings: false,
            time_deposit: true,
            current_account: false
        });
      }

      toggleCurrentAccount() {
          this.setState({
              savings: false,
              time_deposit: false,
              current_account: true
          })
      }
      

    render() {
        const { title } = this.props;
        return (
            <View style = {styles.view}>
                <Label style = {styles.label}>{title}</Label>
                <ListItem
                    selected={this.state.savings}
                    onPress={() => this.toggleSavings()}
                    style={styles.radioStyle}
                >
                    <Left>
                        <Text>Savings</Text>
                    </Left>
                    <Right>
                        <Radio
                            selected={this.state.savings}
                            onPress={() => this.toggleSavings()}
                        />
                    </Right>
                </ListItem>
                <ListItem
                    selected={this.state.time_deposit}
                    onPress={() => this.toggleTimeDeposit()}
                    style={styles.radioStyle}
                >
                    <Left>
                        <Text>Time Deposit</Text>
                    </Left>
                    <Right>
                        <Radio
                            selected={this.state.time_deposit}
                            onPress={() => this.toggleTimeDeposit()}
                        />
                    </Right>
                </ListItem>
                <ListItem
                    selected={this.state.current_account}
                    onPress={() => this.toggleCurrentAccount()}
                    style={styles.radioStyle}
                >
                    <Left>
                        <Text>Current Account</Text>
                    </Left>
                    <Right>
                        <Radio
                            selected={this.state.current_account}
                            onPress={() => this.toggleCurrentAccount()}
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