import React from 'react';
import {
  BottomTabBarOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import {screenThemeColor} from '../../global/styles';
import {SCREEN_NAME} from '../counstants';
import {Fa5i, IconElm, Ioni, MCi} from '../../components/common/icons';
import {WeeklyScreen} from '../../features/weekly/weekly-screen';
import {MealsScreen} from '../../features/meal/meals-screen';
import {SettingScreen} from '../../features/setting/setting-screen';
import {SupplementScreen} from '../../features/suppli/supplement-screen';
import {WaterScreen} from '../../features/water/water-screen';
import {ActiveColor, FeatureName} from '../route';

const activeColor: ActiveColor = {
  weekly: screenThemeColor.weekly,
  suppli: screenThemeColor.suppli,
  meal: screenThemeColor.meals,
  water: screenThemeColor.water,
  setting: screenThemeColor.setting,
};

const Tab = createBottomTabNavigator();

const tabScreen = (
  name: string,
  component: () => JSX.Element,
  iconElm: IconElm,
  iconName: string,
  i: number,
) => (
  <Tab.Screen
    key={i}
    name={name}
    component={component}
    options={{
      tabBarLabel: name,
      tabBarIcon: ({color, size}) => iconElm(iconName, color, size),
    }}
  />
);

const setTabItem = (
  name: string,
  component: () => JSX.Element,
  iconElm: IconElm,
  iconName: string,
) => {
  return {
    name: name,
    component: component,
    iconElm: iconElm,
    iconName: iconName,
  };
};

const tabItems = [
  setTabItem(SCREEN_NAME.weekly, WeeklyScreen, MCi, 'home'),
  setTabItem(SCREEN_NAME.suppli, SupplementScreen, Fa5i, 'tablets'),
  setTabItem(SCREEN_NAME.meal, MealsScreen, MCi, 'silverware-fork-knife'),
  setTabItem(SCREEN_NAME.water, WaterScreen, MCi, 'cup-water'),
  setTabItem(SCREEN_NAME.setting, SettingScreen, Ioni, 'settings'),
];

const tabBarOptions = (
  routeName: FeatureName | undefined,
): BottomTabBarOptions => {
  return {
    activeTintColor: routeName ? activeColor[routeName] : activeColor.weekly,
    style: {
      height: 80,
      shadowColor: '#ddd',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'lightgreen',
    },
    showLabel: false,
  };
};

export const RouteTabs = () => {
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route) as
    | FeatureName
    | undefined;
  return (
    <>
      <Tab.Navigator
        initialRouteName={SCREEN_NAME.weekly}
        tabBarOptions={tabBarOptions(routeName)}>
        {tabItems.map((item, i) =>
          tabScreen(item.name, item.component, item.iconElm, item.iconName, i),
        )}
      </Tab.Navigator>
    </>
  );
};

// type TabScreenProps = {
//   name: string;
//   component: () => JSX.Element;
//   iconTypes: string;
//   iconName: string;
// };

// Error: A navigator can only contain 'Screen' components as its direct children (found 'TabScreen' for the screen 'weekly'). To render this component in the navigator, pass it in the 'component' prop to 'Screen'.
// const TabScreen = ({name, component, iconTypes, iconName}: TabScreenProps) => (
//   <Tab.Screen
//     name={name}
//     component={component}
//     options={{
//       tabBarLabel: name,
//       tabBarIcon: ({color, size}) =>
//         generateIcon(iconTypes)(iconName, color, size),
//     }}
//   />
// );

// <TabScreen
//         name={SCREEN_NAME.weekly}
//         component={WeeklyScreen}
//         iconTypes={IconTypes.MCi}
//         iconName={'home'}
//       />
