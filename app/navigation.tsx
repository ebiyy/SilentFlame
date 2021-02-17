import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import SupplementScreen from './screen/supplement/supplement-screen';
import SupplementForm from './screen/supplement/supplement-form';
import NutrientFormController from './screen/supplement/nutrient-from-controller';
import MealsScreen from './screen/meals/meals-screen';
import HomeScreen from './screen/home/home';
import SearchMeals from './screen/meals/search-meals';
import {StyleSheet, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import WaterScreen from './screen/water/water-screen';
import FirebaseCustomEvent from './sample/sample-firebase-event';
import {winHeight} from './global-style';
import AnimateHeader from './screen/animate-header';
import CustomCalendar from './sample/calender';
import HeaderRightDate from './components/header-right-date';
import SettingScreen from './screen/setting/setting-screen';
import NutrientsScreen from './screen/meals/nutrients-screen';

// const getHeaderTitle = (route: Route<string, object | undefined>) => {
//   // If the focused route is not found, we need to assume it's the initial screen
//   // This can happen during if there hasn't been any navigation inside the screen
//   // In our case, it's "Feed" as that's the first screen inside the navigator
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Home';

//   switch (routeName) {
//     case 'Home':
//       return '今日';
//     case 'Suppl.':
//       return '今日のサプリ';
//     case 'Meals':
//       return '';
//     case 'Water':
//       return 'Water';
//     case 'SupplementForm':
//       return '新しいサプリを登録';
//   }
// };

const IconTypes = {
  MCi: 'MaterialCommunityIcons',
  Fa5i: 'FontAwesome5Icons',
  Ioni: 'Ionicons',
};

const materiaComIcon = (name: string, color: string, size: number) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

const fontAwesome5Icon = (name: string, color: string, size: number) => (
  <FontAwesome5Icons name={name} color={color} size={size} />
);

const ionicons = (name: string, color: string, size: number) => (
  <Ionicons name={name} color={color} size={size} />
);

const generateIcon = (
  iconType: string,
): ((name: string, color: string, size: number) => JSX.Element) => {
  switch (iconType) {
    case IconTypes.MCi:
      return materiaComIcon;
    case IconTypes.Fa5i:
      return fontAwesome5Icon;
    case IconTypes.Ioni:
      return ionicons;
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
    <>
      <Tab.Navigator
        initialRouteName="weeky"
        tabBarOptions={{
          activeTintColor: 'lightgreen',
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
            // borderRadius: 30,
            borderColor: 'lightgreen',
          },
        }}>
        {TabScreen('weeky', HomeScreen, IconTypes.MCi, 'home')}
        {TabScreen('Suppl.', SupplementScreen, IconTypes.Fa5i, 'tablets')}
        {TabScreen(
          'Meals',
          MealsScreen,
          IconTypes.MCi,
          'silverware-fork-knife',
        )}
        {TabScreen('Water', WaterScreen, IconTypes.MCi, 'cup-water')}
        {TabScreen('setting', SettingScreen, IconTypes.Ioni, 'settings')}
      </Tab.Navigator>
    </>
  );
};

const Stack = createStackNavigator();
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    border: 'white',
  },
};

const NavigationScreen = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={({navigation}) => ({
          // headerShown: false,
          headerTitle: () => (
            <View style={Styles.headerIconContainer}>
              <AntDesign
                onPress={() => navigation.navigate('CustomCalendar')}
                name="calendar"
                color="black"
                size={30}
              />
            </View>
          ),
          headerStyle: {
            // height: 170,
            // paddinTop: 50,
          },
          cardStyle: {marginTop: winHeight * 0.08},
          headerBackground: () => <AnimateHeader />,
          headerBackTitleStyle: {
            color: 'indigo',
          },
          headerRight: () => <HeaderRightDate />,
        })}>
        <Stack.Screen
          name="weeky"
          component={MyTabs}
          options={({navigation}) => ({
            // headerTitle: getHeaderTitle(route),
            // headerTitle: '',
            // headerStyle: {
            //   backgroundColor: 'white',
            //   borderWidth: 0,
            // },
            // headerRight: () => (
            //   <View style={Styles.headerIconContainer}>
            //     <AntDesign
            //       onPress={() => navigation.navigate('Settings')}
            //       name="calendar"
            //       color="gray"
            //       size={30}
            //     />
            //   </View>
            // ),
          })}
        />
        <Stack.Screen name="Settings" component={FirebaseCustomEvent} />
        <Stack.Screen name="SupplementForm" component={SupplementForm} />
        <Stack.Screen
          name="NutrientFormController"
          component={NutrientFormController}
        />
        <Stack.Screen name="NutrientsScreen" component={NutrientsScreen} />
        <Stack.Screen name="SearchMeals" component={SearchMeals} />
        <Stack.Screen name="CustomCalendar" component={CustomCalendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Styles = StyleSheet.create({
  headerIconContainer: {
    // marginRight: 10,
  },
});

export default NavigationScreen;
