import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SampleFatsecret from '../sample/fatsecret.sample';
import SampleRealm from '../sample/realm.sample';
import {NavigationContainer, Route} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

function getHeaderTitle(route: Route<'Home', object | undefined>) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';

  switch (routeName) {
    case 'Feed':
      return 'News feed';
    case 'Profile':
      return 'My profile';
    case 'Account':
      return 'My account';
  }
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={SampleFatsecret} />
      <Tab.Screen name="Profile" component={SampleRealm} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();

export default function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs}
          options={({route}) => ({
            headerTitle: getHeaderTitle(route),
          })}
        />
        <Stack.Screen name="Settings" component={SampleRealm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
