// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view
import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {hasNotch} from '@freakycoder/react-native-helpers';

type Props = {
  end: PositionIndex | undefined;
  start: PositionIndex | undefined;
  gradient: boolean | undefined;
  shapeColor: string | undefined;
  gradientColors: string[] | undefined;
  position: PositionStyle | undefined;
};

const Shape = (props: Props) => {
  const {
    start = {x: 0, y: 0},
    end = {x: 1, y: 0},
    gradient = true,
    position,
    shapeColor = '#ba75df',
    gradientColors = ['#12c2e9', '#c471ed', '#f64f59'],
  } = props;

  function renderGradient() {
    return (
      <LinearGradient
        start={start}
        end={end}
        colors={gradientColors}
        style={[Styles.main, Styles.customShadowStyle, setPosition(position)]}
      />
    );
  }

  function renderSolidBG() {
    return (
      <View
        style={[
          Styles.main,
          setPosition(position),
          solidColor(shapeColor),
          Styles.customShadowStyle,
        ]}
      />
    );
  }

  return gradient ? renderGradient() : renderSolidBG();
};

const {width, height} = Dimensions.get('window');

const solidColor = (shapeColor: string | undefined) => {
  return {
    backgroundColor: shapeColor || '#ba75df',
  };
};

const setPosition = (position: PositionStyle | undefined) => {
  if (!position) {
    let top = hasNotch() ? height * -0.17 : height * -0.25;
    return {
      ...Platform.select({
        ios: {
          top,
        },
        android: {
          top: height * -0.185,
        },
      }),
    };
  }
  return position;
};

const Styles = StyleSheet.create({
  main: {
    width: width,
    height: width,
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

export default Shape;
