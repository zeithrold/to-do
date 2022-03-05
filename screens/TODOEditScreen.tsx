import {reaction} from 'mobx';
import * as React from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';
import {secureStore} from '../libs';
import store from '../models/Store';
import {RootStackScreenProps} from '../types';

const styles = StyleSheet.create({
  todoEditRoot: {
    padding: 20,
  },
  todoEditNotFound: {
    fontSize: 30,
  },
  todoEditTitle: {
    fontSize: 48,
    fontWeight: '900',
    borderBottomWidth: 1,
    borderColor: '#808080',
  },
  todoEditDescription: {
    // borderRadius: 4,
    borderBottomWidth: 1,
    borderColor: '#d0d0d0',
    minHeight: 70,
    padding: 4,
    marginVertical: 10,
    fontSize: 18,
    // alignContent: 'flex-start',
  },
  todoEditTags: {
    marginVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#d0d0d0',
    fontSize: 18,
  },
});

export default function TODOEditScreen(
    {navigation, route}: RootStackScreenProps<'TODOEdit'>) {
  let id = '';
  if (!route.params) {
    return (
      <View style={styles.todoEditRoot}>
        <Text style={styles.todoEditNotFound}>
          Internal Error: ID not found.
        </Text>
      </View>
    );
  }
  id = route.params.id;
  const index = store.TODOList.findIndex((todo) => {
    return todo.id === id;
  });
  const tempTODO = store.TODOList[index];
  const [name, setName] = React.useState(tempTODO.name);
  const [description, setDescription] = React.useState(tempTODO.description);
  const [tags, setTags] = React.useState(tempTODO.tags.join(','));
  reaction(() => (store.isEditTODO == true), () => {
    tempTODO.name = name;
    tempTODO.description = description;
    tempTODO.tags = tags.length > 0? tags.split(',') : [];
    tempTODO.modifiedAt = new Date();
    store.setTODO(tempTODO.id, tempTODO);
    secureStore.setTODOList(store.TODOList);
  });
  return (
    <View style={styles.todoEditRoot}>
      <TextInput
        onChangeText={setName}
        value={name}
        style={styles.todoEditTitle}
        placeholder="Input Name..."
      />
      <TextInput
        multiline
        onChangeText={setDescription}
        value={description}
        style={styles.todoEditDescription}
        placeholder="Input Description..."
      />
      <TextInput
        value={tags}
        onChangeText={setTags}
        style={styles.todoEditTags}
        placeholder="Input tags, splited by comma"
      />
      {/* <Text>Hello, world! from TODOEditScreen</Text> */}
      <Button
        title='Delete To-Do'
        color='red'
        onPress={() => {
          store.deleteTODO(id);
          secureStore.setTODOList(store.TODOList);
          navigation.goBack();
        }}
      />
    </View>
  );
}
