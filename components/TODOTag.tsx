import * as React from 'react';
// import store from '../models/Store';
import {
  StyleSheet,
  ViewProps,
  // View,
  Text,
  Pressable,
} from 'react-native';
import Color from '../models/Color';
import store from '../models/Store';

const styles = StyleSheet.create({
  todoTag: {
    height: 24,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    marginHorizontal: 2,
  },
});

interface TODOTagProps extends ViewProps {
  color: Color;
  tag: string
}

export default function TODOTag({children, color, tag}: TODOTagProps) {
  return (
    <Pressable
      onPress={() => {
        store.setSearchTag(tag);
      }}
      style={[styles.todoTag, {
        backgroundColor: color.background,
      }]}
    >
      <Text style={{color: color.font}}>{tag}</Text>
    </Pressable>
  );
}
