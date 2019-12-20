import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Header, Content, Label, ListItem, Text, Radio, Right, Left } from 'native-base';


class PNRadioFormAddress extends Component {
    constructor() {
        super();
        this.state = {
            isChecked: false
        }
    }

    render() {
        const { onPress, selected } = this.props;
        return (
            <View style = {styles.view}>
                <ListItem
                    selected={selected}
                    onPress={onPress}
                    style={styles.radioStyle}
                >
                    <Left>
                        <Text>Same as Present Address</Text>
                    </Left>
                    <Right>
                        <Radio
                            selected={selected}
                            onPress={onPress}
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
        marginBottom: 0,
        width: '85%',
        textDecorationLine: 'none'
    }
});

export default PNRadioFormAddress;