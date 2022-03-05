import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {secureStore} from '../libs';
import store from '../models/Store';
import {RootTabScreenProps} from '../types';

export default function Setting(
    {navigation}: RootTabScreenProps<'TODOList'>) {
  return (
    <View>
      <Text>Hello, world! from SettingScreen</Text>
      <Button
        title='Test'
        onPress={() => {
          navigation.navigate('TODOEdit', {
            id: 'nice',
          });
          secureStore.setIsFirstRun(true);
        }}
      />
      <Text>
        {store.count}
      </Text>
    </View>
  );
}
