import {Ionicons} from '@expo/vector-icons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import TODOEditScreen from '../screens/TODOEditScreen';
import {Alert, ColorSchemeName, Pressable} from 'react-native';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import TODOListScreen from '../screens/TODOListScreen';
import SettingScreen from '../screens/SettingScreen';
import LinkingConfiguration from './LinkingConfiguration';
import {secureStore} from '../libs';
// import {observer} from 'mobx-react-lite';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import store from '../models/Store';
import themeColors from '../constants/themeColors';
import useColorScheme from '../hooks/useColorScheme';


export default function Navigation(
    {colorScheme}: {colorScheme: ColorSchemeName},
) {
  React.useEffect(() => {
    async function initialRun() {
      const isFirstRun = await secureStore.getIsFirstRun();
      if (isFirstRun) {
        Alert.alert('It\'s the first run.', 'hello, world!');
        await secureStore.setIsFirstRun(false);
      }
    }
    initialRun();
  }, []);
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme: DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{headerShown: false}}/>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="TODOEdit" component={TODOEditScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();


function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName='TODOList'
    >
      <BottomTab.Screen
        name="TODOList"
        component={TODOListScreen}
        options={({navigation}: RootTabScreenProps<'TODOList'>) => ({
          title: 'List',
          tabBarIcon: ({color}) => <TabBarIcon name='ios-list' color={color}/>,
          headerRight: () => (
            <Pressable
              onPress={() => {
                // store.createTODO();
                store.createTODOFromRawData({
                  id: uuidv4(),
                  name: 'DB Doll',
                  createdAt: new Date(),
                  modifiedAt: new Date(),
                  tags: ['AT 12'],
                  description: '',
                  isCompleted: false,
                });
                store.createTODOFromRawData({
                  id: uuidv4(),
                  name: 'Rrhar\'il',
                  createdAt: new Date(),
                  modifiedAt: new Date(),
                  tags: ['AT 16', 'IN 15'],
                  description: '',
                  isCompleted: false,
                });
              }}>
              <Ionicons name='add' size={30}
                color={themeColors[colorScheme].text}
                style={{marginRight: 15}}/>
            </Pressable>
          ),
        })
        }
      />
      <BottomTab.Screen
        name='Settings'
        component={SettingScreen}
        options={{
          title: 'Settings',
          tabBarIcon: ({color}) =>
            <TabBarIcon name='ios-settings' color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={24} style={{marginBottom: -3}} {...props} />;
}

