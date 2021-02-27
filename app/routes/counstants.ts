import {DefaultTheme} from '@react-navigation/native';

export const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
    border: 'white',
  },
};

export const SCREEN_NAME: ScreenName = {
  weekly: 'weekly',
  suppli: 'suppli',
  meal: 'meal',
  water: 'water',
  setting: 'setting',
};
