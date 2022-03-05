import * as React from 'react';
import {StatusBar} from 'expo-status-bar';
// import {StyleSheet, Text, View} from 'react-native';
// import {NavigationContainer} from '@react-navigation/native';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider as MobXProvider} from 'mobx-react';
import Navigation from './navigation';
import useStoredTODOList from './hooks/useStoredTODOList';
import store from './models/Store';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

const stores = {
  store,
};

export default function App() {
  const isLoadingComplete = useCachedResources();
  const isStoredTODOLoaded = useStoredTODOList();
  const colorScheme = useColorScheme();

  if (!(isLoadingComplete && isStoredTODOLoaded)) {
    return null;
  } else {
    return (
      <MobXProvider {...stores}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </MobXProvider>
    );
  }
}
