import * as React from 'react';
import {View, StyleSheet} from 'react-native';
// import {observer} from 'mobx-react-lite';
import store from '../models/Store';
import {Ionicons} from '@expo/vector-icons';
// import {TODO} from '../models/TODO';

const styles = StyleSheet.create({
  todoCheckBox: {
    padding: 5,
    borderRadius: 18,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function TODOCheckBox({id}:
    { id: string }) {
  // const iconName = isChecked? 'checkmark' : 'ellipse';
  const index = store.TODOList.findIndex((_todo) => {
    return _todo.id === id;
  });
  return (
    <View style={[styles.todoCheckBox,
      {backgroundColor:
        store.TODOList[index].isCompleted? '#009933': '#cccccc'}]}>
      {
        store.TODOList[index].isCompleted? <CheckedIcon /> : <UnCheckedIcon />
      }
    </View>
  );
};

function CheckedIcon() {
  return (
    <Ionicons name='checkmark' size={20} color='#ffffff'/>
  );
}

function UnCheckedIcon() {
  return (
    <View style={{
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: '#808080',
    }}/>
  );
}
