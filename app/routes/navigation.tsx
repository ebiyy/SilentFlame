import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {winHeight} from '../global/styles';
import {CustomCalendar} from '../features/date-manager/calender';
import {MealsSearchScreen} from '../features/meal/meals-search-screen';
import {NutrientsScreen} from '../features/meal/nutrients-screen';
import {NutrientForm} from '../features/suppli/nutrient-from';
import {NutrientFormController} from '../features/suppli/nutrient-from-controller';
import {SupplFormScreen} from '../features/suppli/suppl-form-screen';
import {SuppliArchiveScreen} from '../features/suppli/suppli-archive-screen';
import {RouteTabs} from './components/bottom-tabs';
import {CustomHeaderBackground} from './components/header-buckground';
import {HeaderRightDate} from './components/header-right-date';
import {CustomHeaderTitle} from './components/header-title';
import {MyTheme} from './counstants';
import {CalendarScreen} from '../features/date-manager/calender-controller';
import {WaterArchiveScreen} from '../features/water/water-archive-screen';

const Stack = createStackNavigator();

export const NavigationScreen = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={() => ({
          headerTitle: () => <CustomHeaderTitle />,
          headerBackground: () => <CustomHeaderBackground />,
          headerRight: () => <HeaderRightDate />,
          cardStyle: {marginTop: winHeight * 0.08},
          headerBackTitle: 'Back',
        })}>
        {/* main screen */}
        <Stack.Screen name="weekly" component={RouteTabs} />

        {/* Transition screen */}
        <Stack.Screen name="SupplFormScreen" component={SupplFormScreen} />
        <Stack.Screen
          name="NutrientFormController"
          component={NutrientFormController}
        />
        <Stack.Screen name="NutrientsScreen" component={NutrientsScreen} />
        <Stack.Screen name="MealsSearchScreen" component={MealsSearchScreen} />
        <Stack.Screen name="CalendarScreen" component={CalendarScreen} />
        <Stack.Screen name="NutrientForm" component={NutrientForm} />
        <Stack.Screen
          name="SuppliArchiveScreen"
          component={SuppliArchiveScreen}
        />
        <Stack.Screen
          name="WaterArchiveScreen"
          component={WaterArchiveScreen}
        />
        {/* <Stack.Screen name="Settings" component={FirebaseCustomEvent} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
