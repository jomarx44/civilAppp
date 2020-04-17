import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import UserInactivity from 'react-native-user-inactivity';
 
export default () => {
  const [active, setActive] = useState(true);
  const [timer, setTimer] = useState(2000);
 
  return (
    <View style={{ flex: 1,  }}>
      <UserInactivity
        isActive={active}
        timeForInactivity={timer}
        onAction={isActive => { setActive(isActive); }}
        style={{ flex: 1, paddingTop: '10%' }}
      >
        <Button id="btn-1" title="1 Press this to simulate activity" />
        <Button id="btn-2" title="2 Press this to simulate activity" />
        <Text id="text-1" style={{ textAlign: 'center' }}>Type below to simulate activity</Text>
        <TextInput
          id="text-input-1"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChange={() => { setActive(true); }}
          textContentType="creditCardNumber"
          value={timer.toString(10)}
          onChangeText={text => setTimer(Number.parseInt(text || 0, 10))}
        />
      </UserInactivity>
      <View style={{ flex: 1, backgroundColor: '#fcfcaa', }}>
        <Text style={{ textAlign: 'center' }}>{active ? 'ACTIVE' : 'NOT ACTIVE'}</Text>
        <Button title="Manually set to Active" onPress={() => { setActive(true); }} />
      </View>
    </View>
  );
}