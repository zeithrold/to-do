import * as React from 'react';
import {View, Text} from 'react-native';
import {RootTabScreenProps} from '../types';

export default function TODOEditScreen(
    {navigation}: RootTabScreenProps<'TODOList'>) {
  return (
    <View>
      <Text>Hello, world! from TODOEditScreen</Text>
    </View>
  );
}
