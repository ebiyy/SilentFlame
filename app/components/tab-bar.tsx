import React from 'react';

import {createBottomTabNavigator***REMOVED*** from '@react-navigation/bottom-tabs';
import SampleFatsecret from '../sample/fatsecret.sample';
import SampleRealm from '../sample/realm.sample';
import {NavigationContainer, Route***REMOVED*** from '@react-navigation/native';
import {createStackNavigator***REMOVED*** from '@react-navigation/stack';

import {getFocusedRouteNameFromRoute***REMOVED*** from '@react-navigation/native';

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
  ***REMOVED***
***REMOVED***

const Tab = createBottomTabNavigator();

function MyTabs() {
***REMOVED***
    <Tab.Navigator>
      <Tab.Screen name="Feed" component={SampleFatsecret***REMOVED*** />
      <Tab.Screen name="Profile" component={SampleRealm***REMOVED*** />
    </Tab.Navigator>
***REMOVED***
***REMOVED***

const Stack = createStackNavigator();

export default function NavigationScreen() {
***REMOVED***
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MyTabs***REMOVED***
          options={({route***REMOVED***) => ({
            headerTitle: getHeaderTitle(route),
          ***REMOVED***)***REMOVED***
        />
        <Stack.Screen name="Settings" component={SampleRealm***REMOVED*** />
      </Stack.Navigator>
    </NavigationContainer>
***REMOVED***
***REMOVED***
