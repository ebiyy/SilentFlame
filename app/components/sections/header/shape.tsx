// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view
import React from 'react';
import {Platform, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hasNotch, isIOS} from '@freakycoder/react-native-helpers';
import {winHeight, winWidth} from '../../../global/styles';

export const Shape = () => {
  const start = {x: 0, y: 0},
    end = {x: 1, y: 0},
    gradientColors = ['#a1ffce', '#faffd1'];

  return (
    <LinearGradient
      start={start}
      end={end}
      colors={gradientColors}
      style={[Styles.main, Styles.customShadowStyle, setPosition(undefined)]}
    />
  );
};

const setPosition = (position: PositionStyle | undefined) => {
  if (!position) {
    let top = hasNotch() ? winHeight * -0.17 : winHeight * -0.25;
    return {
      ...Platform.select({
        ios: {
          top,
        },
        android: {
          top: winHeight * -0.185,
        },
      }),
    };
  }
  return position;
};

const Styles = StyleSheet.create({
  main: {
    width: winWidth,
    height: isIOS ? winWidth : winHeight * 0.4 + winWidth * 0.1,
    alignSelf: 'center',
    position: 'absolute',
    alignContent: 'center',
    // borderRadius: width / 2,
    transform: [{scaleX: 2}, {scaleY: 0.45}],
  },
  customShadowStyle: {
    shadowRadius: 3,
    shadowOpacity: 0.3,
    shadowColor: '#595959',
    shadowOffset: {width: 0, height: 2},
  },
});
