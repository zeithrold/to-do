import * as React from 'react';
import {View, StyleSheet, Text, Pressable} from 'react-native';
import {TODO} from '../models/TODO';
import TODOCheckBox from './TODOCheckBox';
import store from '../models/Store';
import TODOTag from './TODOTag';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

const styles = StyleSheet.create({
  todoViewRoot: {
    flexDirection: 'row',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e6e6e6',
    width: '100%',
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ffffff',
  },
  todoView: {
    flexDirection: 'column',
    marginHorizontal: 10,
  },
  todoViewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  todoViewTags: {
    flexDirection: 'row',
  },
});

export default function TODOView({todo}: {todo: TODO}) {
  return (
    <View style={styles.todoViewRoot} >
      <Pressable
        onPress={() => {
          store.reverseCheckedTODO(todo.id);
          // store.createTODOFromRawData({
          //   id: uuidv4();
          //   name
          // });
          store.update();
        }}
      >
        <TODOCheckBox
          id={todo.id}/>
      </Pressable>
      <View style={styles.todoView} >
        <Text style={[styles.todoViewTitle,
          {marginBottom: 2}]}>{todo.name}</Text>
        <View style={[styles.todoViewTags, {marginTop: 2}]}>
          {
            todo.tags.map((tag) => {
              return (
                <TODOTag
                  key={tag}
                  color={store.tagsColors[tag]}
                  tag={tag} />
              );
            })
          }
        </View>
      </View>
    </View>
  );
}
