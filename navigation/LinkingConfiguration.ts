import {LinkingOptions} from '@react-navigation/native';
import * as Linking from 'expo-linking';

import {RootStackParamList} from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  // Example uses Linking.makeURL(), it's deprecated.
  // Use Linking.createURL
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          TODOList: {
            screens: {
              TODOListScreen: 'todolist',
            },
          },
          Settings: {
            screens: {
              SettingScreen: 'settings',
            },
          },
        },
      },
      TODOEdit: 'todoedit',
    },
  },
};

export default linking;
