import React from 'react'; // need
import {Dimensions, StyleSheet} from 'react-native';

const {width, height} = Dimensions.get('window');
export const [winWidth, winHeight] = [width, height];

export const screenThemeColor = {
  weeky: 'black',
  suppli: '#ffba3b',
  meals: 'lightgreen',
  water: '#86C5DA',
  setting: 'black',
};

export const ComStyles = StyleSheet.create({
  centeringContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenBoxShadow: {
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
});

export const shadowStyles = (color: string) =>
  StyleSheet.create({
    boxShadow: {
      shadowColor: '#ddd',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 1,
      shadowRadius: 4,
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: color,
    },
  });
