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
import {Alert, ColorSchemeName} from 'react-native';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from '../types';
import TODOListScreen from '../screens/TODOListScreen';
import SettingScreen from '../screens/SettingScreen';
import LinkingConfiguration from './LinkingConfiguration';
import {secureStore} from '../libs';


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
        })}
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

