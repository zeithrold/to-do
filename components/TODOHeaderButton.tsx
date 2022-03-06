import * as React from 'react';
import * as Device from 'expo-device';
import {Button, ButtonProps, Pressable, StyleSheet, Text} from 'react-native';

const styles = StyleSheet.create({
  otherPlatformButton: {
    marginHorizontal: 10,
  },
  otherPlatformButtonText: {
    fontWeight: '500',
  },
});

export default function TODOHeaderButton(props: ButtonProps) {
  if (Device.brand === 'Apple') {
    return <Button {...props}/>;
  } else {
    return (
      <Pressable
        onPress={props.onPress}
        style={styles.otherPlatformButton}
      >
        <Text style={styles.otherPlatformButtonText}>{props.title}</Text>
      </Pressable>
    );
  }
}
