import * as React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import TODOView from '../components/TODOView';
// import {TODO} from '../models/TODO';
import {RootTabScreenProps} from '../types';
import store from '../models/Store';
import {observer} from 'mobx-react-lite';


const styles = StyleSheet.create({
  todoList: {
    margin: 10,
  },
  updateCount: {
    fontSize: 1,
    textAlign: 'center',
  },
});

export default observer(function TODOListScreen(
    {navigation}: RootTabScreenProps<'TODOList'>) {
  return (
    <ScrollView>
      <View style={styles.todoList}>
        {
          store.TODOList.map((todo) => {
            // if (todo.isCompleted) {
            //   return;
            // }
            return (
              <TODOView key={todo.id} todo={todo} />
            );
          })
        }
      </View>
      <Text style={styles.updateCount}>
        {store.count}
      </Text>
    </ScrollView>
  );
});
