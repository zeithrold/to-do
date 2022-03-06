import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  // Touchable,
  Pressable,
} from 'react-native';
import TODOView from '../components/TODOView';
// import {TODO} from '../models/TODO';
import {RootTabScreenProps} from '../types';
import store from '../models/Store';
import {observer} from 'mobx-react-lite';
import {reaction} from 'mobx';
import {Ionicons} from '@expo/vector-icons';
import * as Device from 'expo-device';


const styles = StyleSheet.create({
  todoList: {
    margin: 10,
  },
  updateCount: {
    fontSize: 1,
    textAlign: 'center',
  },
  todoSearch: {
    borderColor: '#c0c0c0',
    borderWidth: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    fontSize: 24,
    color: '#202020',
    paddingVertical: 8,
    paddingHorizontal: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
  todoNoItem: {
    // flex: 1,
    paddingVertical: 24,
    minHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  todoNoItemTitle: {
    color: '#808080',
    fontSize: 36,
    fontWeight: '600',
    marginVertical: 10,
  },
  todoNoItemContent: {
    color: '#808080',
    fontSize: 18,
    fontWeight: 'normal',
    marginVertical: 10,
    marginHorizontal: 5,
    alignSelf: 'center',
  },
  todoCompletedTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginVertical: 10,
  },
});

export default observer(function TODOListScreen(
    {navigation}: RootTabScreenProps<'TODOList'>) {
  const [searchTag, setSearchTag] = React.useState(store.searchTag);
  reaction(() => store.searchTag, () => {
    setSearchTag(store.searchTag);
  });
  return (
    <View>
      {store.TODOList.length > 0 ?
          <ScrollView style={{
            minHeight: '100%',
          }}>
            <View style={styles.todoList}>
              <TextInput
                onChangeText={(text) => {
                  store.setSearchTag(text);
                  setSearchTag(text);
                }}
                returnKeyType='search'
                style={styles.todoSearch}
                placeholder='Search tags here...'
                value={searchTag}
              >

              </TextInput>
              {
                store.TODOList.map((todo) => {
                  if (store.searchTag) {
                    if (todo.tags.findIndex(
                        (tag) => tag === store.searchTag) != -1) {
                      if (!todo.isCompleted) {
                        return (
                          <Pressable
                            onPress={() => {
                            // store.toggleEditTODO();
                              navigation.navigate('TODOEdit', {id: todo.id});
                            }}
                            key={todo.id}
                          >
                            <TODOView todo={todo} />
                          </Pressable>
                        );
                      }
                    }
                  } else {
                    if (!todo.isCompleted) {
                      return (
                        <Pressable
                          onPress={() => {
                          // store.toggleEditTODO();
                            navigation.navigate('TODOEdit', {id: todo.id});
                          }}
                          style={({pressed}) => {
                            return {
                              opacity: pressed? 0.4: 1,
                            };
                          }}
                          key={todo.id}
                        >
                          <TODOView todo={todo} />
                        </Pressable>
                      );
                    }
                  }
                  // if (todo.isCompleted) {
                  //   return;
                  // }
                  // return (
                  //   <TODOView key={todo.id} todo={todo} />
                  // );
                })
              }
              {store.TODOList.filter((todo) => todo.isCompleted).length > 0 ?
                <Text
                  style={styles.todoCompletedTitle}
                >Completed To-Dos</Text> : null
              }
              {
                store.TODOList.map((todo) => {
                  if (store.searchTag) {
                    if (todo.tags.findIndex(
                        (tag) => tag === store.searchTag) != -1) {
                      if (todo.isCompleted) {
                        return (
                          <Pressable
                            onPress={() => {
                            // store.toggleEditTODO();
                              navigation.navigate('TODOEdit', {id: todo.id});
                            }}
                            key={todo.id}
                          >
                            <TODOView todo={todo} />
                          </Pressable>
                        );
                      }
                    }
                  } else {
                    if (todo.isCompleted) {
                      return (
                        <Pressable
                          onPress={() => {
                          // store.toggleEditTODO();
                            navigation.navigate('TODOEdit', {id: todo.id});
                          }}
                          style={({pressed}) => {
                            return {
                              opacity: pressed? 0.4: 1,
                            };
                          }}
                          key={todo.id}
                        >
                          <TODOView todo={todo} />
                        </Pressable>
                      );
                    }
                  }
                  // if (todo.isCompleted) {
                  //   return;
                  // }
                  // return (
                  //   <TODOView key={todo.id} todo={todo} />
                  // );
                })
              }
            </View>
            <Text style={[styles.updateCount, {
              fontSize: Device.brand? 1 : 0,
            }]}>
              {store.count}
            </Text>
          </ScrollView>:
          <View style={styles.todoNoItem}>
            <Text style={styles.todoNoItemTitle}>
              No Item
            </Text>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignContent: 'center',
            }}>
              <Text style={styles.todoNoItemContent}>
                Press
              </Text>
              <Ionicons
                name='add'
                size={24}
                style={{alignSelf: 'center'}}
                color='#808080'/>
              <Text style={styles.todoNoItemContent}>
                icon to create a To-Do.
              </Text>
            </View>
          </View>}
    </View>
  );
});
