import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import {RootTabScreenProps} from '../types';

const technologies: {name: string; content: string}[] =
[
  {
    name: 'Backend',
    content: 'React Native',
  },
  {
    name: 'Packager',
    content: 'Expo',
  },
  {
    name: 'Frontend',
    content: 'TypeScript',
  },
  {
    name: 'Linter',
    content: 'ESLint',
  },
  {
    name: 'State Manager',
    content: 'MobX',
  },
  {
    name: 'UI Support',
    content: 'react-navigation',
  },
];

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'white',
    minHeight: '100%',
    minWidth: '100%',
    padding: 36,
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    alignSelf: 'center',
  },
  text: {
    width: '100%',
    marginVertical: 8,
    textAlign: 'center',
    color: '#808080',
  },
  box: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 8,
    borderColor: '#a0a0a0',
    borderWidth: 1,
    backgroundColor: 'white',
  },
  boxChildren: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  boxText: {
    fontSize: 18,
  },
  boxTextMinor: {
    color: '#808080',
  },
});

export default function Setting(
    {navigation}: RootTabScreenProps<'TODOList'>) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do</Text>
      <Text style={[styles.text]}>
        A Project from DUT ELAB, written by Zeithrold.
      </Text>
      <View
        style={styles.box}
      >
        {
          technologies.map(({name, content}) => {
            return (
              <View style={styles.boxChildren} key={name}>
                <Text style={styles.boxText}>{name}</Text>
                <Text style={[styles.boxText, styles.boxTextMinor]}>
                  {content}
                </Text>
              </View>
            );
          })
        }
      </View>
      <Text style={[styles.text]}>
        Thanks for all of the open source project!
      </Text>
      <Button
        title='Open in GitHub'
        onPress={() => {
          WebBrowser.openBrowserAsync('https://github.com/zeithrold/to-do');
        }}
      />
    </View>
  );
}
