// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view
import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {isAndroid, getStatusBarHeight} from '@freakycoder/react-native-helpers';
import {winWidth} from '../../../global/styles';

export const HeaderContent = () => {
  return (
    <SafeAreaView>
      <View style={Styles.container} />
    </SafeAreaView>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: winWidth,
    height: 35,
    flexDirection: 'row',
    marginTop: isAndroid
      ? getStatusBarHeight() !== undefined
        ? getStatusBarHeight() + 8
        : 8
      : 8,
  },
});
