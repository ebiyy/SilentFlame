import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  NavigationContainer,
  Route,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import SampleFatsecret from './sample/fatsecret.sample';
import SampleRealm from './sample/realm.sample';
import SupplementScreen from './screen/supplement/supplement-screen';
import SupplementForm from './screen/supplement/supplement-form';
import SampleCameraRoll from './sample/camera-roll.sample';
import SampleImagePicker from './sample/image-picker.sample';
import NutrientForm from './screen/supplement/nutrient-from';
import NutrientFormController from './screen/supplement/nutrient-from-controller';
import MealsScreen from './screen/meals/meals-screen';
import HomeScreen from './screen/home/home';
import NutrientsList from './screen/meals/nutrients-list';

const getHeaderTitle = (route: Route<string, object | undefined>) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In our case, it's "Feed" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

  switch (routeName) {
    case 'Home':
      return '今日';
    case 'Suppl.':
      return '今日のサプリ';
    case 'Meals':
      return '食事登録';
    case 'Water':
      return 'Water';
    case 'SupplementForm':
      return '新しいサプリを登録';
  }
};

const IconTypes = {
  MCi: 'MaterialCommunityIcons',
  Fa5i: 'FontAwesome5Icons',
};

const materiaComIcon = (name: string, color: string, size: number) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

const fontAwesome5Icon = (name: string, color: string, size: number) => (
  <FontAwesome5Icons name={name} color={color} size={size} />
);

const generateIcon = (
  iconType: string,
): ((name: string, color: string, size: number) => JSX.Element) => {
  switch (iconType) {
    case IconTypes.MCi:
      return materiaComIcon;
    case IconTypes.Fa5i:
      return fontAwesome5Icon;
  }
  return materiaComIcon;
};

const TabScreen = (
  name: string,
  component: () => JSX.Element,
  iconTypes: string,
  iconName: string,
) => (
  <Tab.Screen
    name={name}
    component={component}
    options={{
      tabBarLabel: name,
      tabBarIcon: ({color, size}) =>
        generateIcon(iconTypes)(iconName, color, size),
    }}
  />
);

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      {TabScreen('Home', HomeScreen, IconTypes.MCi, 'home')}
      {TabScreen('Suppl.', SupplementScreen, IconTypes.Fa5i, 'tablets')}
      {TabScreen('Meals', MealsScreen, IconTypes.MCi, 'silverware-fork-knife')}
      {TabScreen('Water', MealsScreen, IconTypes.MCi, 'cup-water')}
    </Tab.Navigator>
  );
};

const Stack = createStackNavigator();

const NavigationScreen = () => {
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
        <Stack.Screen name="SupplementForm" component={SupplementForm} />
        <Stack.Screen
          name="NutrientFormController"
          component={NutrientFormController}
        />
        <Stack.Screen name="NutrientsList" component={NutrientsList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationScreen;
