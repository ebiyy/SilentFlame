import React from 'react';

import {createBottomTabNavigator***REMOVED*** from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  Route,
  getFocusedRouteNameFromRoute,
***REMOVED*** from '@react-navigation/native';
import {createStackNavigator***REMOVED*** from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import SampleFatsecret from './sample/fatsecret.sample';
import SampleRealm from './sample/realm.sample';
import SupplementScreen from './screen/supplement/supplement-screen';
import SupplementForm from './screen/supplement/supplement-form';
import SampleCameraRoll from './sample/camera-roll.sample';
import SampleImagePicker from './sample/image-picker.sample';

const getHeaderTitle = (route: Route<string, object | undefined>) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Suppl.':
      return '今日のサプリ';
    case 'Meals':
      return 'Meals';
    case 'Water':
      return 'Water';
    case 'SupplementForm':
      return '新しいサプリを登録';
  ***REMOVED***
***REMOVED***

const IconTypes = {
  MCi: 'MaterialCommunityIcons',
  Fa5i: 'FontAwesome5Icons',
***REMOVED***

const materiaComIcon = (name: string, color: string, size: number) => (
  <MaterialCommunityIcons name={name***REMOVED*** color={color***REMOVED*** size={size***REMOVED*** />
);

const fontAwesome5Icon = (name: string, color: string, size: number) => (
  <FontAwesome5Icons name={name***REMOVED*** color={color***REMOVED*** size={size***REMOVED*** />
);

const generateIcon = (
  iconType: string,
): ((name: string, color: string, size: number) => JSX.Element) => {
  switch (iconType) {
    case IconTypes.MCi:
      return materiaComIcon;
    case IconTypes.Fa5i:
      return fontAwesome5Icon;
  ***REMOVED***
  return materiaComIcon;
***REMOVED***

const TabScreen = (
  name: string,
  component: () => JSX.Element,
  iconTypes: string,
  iconName: string,
) => (
  <Tab.Screen
    name={name***REMOVED***
    component={component***REMOVED***
    options={{
      tabBarLabel: name,
      tabBarIcon: ({color, size***REMOVED***) =>
        generateIcon(iconTypes)(iconName, color, size),
    ***REMOVED******REMOVED***
  />
);

const Tab = createBottomTabNavigator();

const MyTabs = () => {
***REMOVED***
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      ***REMOVED******REMOVED***>
      {TabScreen('Home', SampleImagePicker, IconTypes.MCi, 'home')***REMOVED***
      {TabScreen('Suppl.', SupplementScreen, IconTypes.Fa5i, 'tablets')***REMOVED***
      {TabScreen(
        'Meals',
        SampleFatsecret,
        IconTypes.MCi,
        'silverware-fork-knife',
      )***REMOVED***
      {TabScreen('Water', SampleRealm, IconTypes.MCi, 'cup-water')***REMOVED***
    </Tab.Navigator>
***REMOVED***
***REMOVED***

const Stack = createStackNavigator();

const NavigationScreen = () => {
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
        <Stack.Screen name="SupplementForm" component={SupplementForm***REMOVED*** />
      </Stack.Navigator>
    </NavigationContainer>
***REMOVED***
***REMOVED***

export default NavigationScreen;
