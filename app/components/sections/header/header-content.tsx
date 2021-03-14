// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view
import React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {isAndroid, getStatusBarHeight} from '@freakycoder/react-native-helpers';
import {winHeight, winWidth} from '../../../global/styles';

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
    height: winHeight * 0.02 + winWidth * 0.03,
    flexDirection: 'row',
    marginTop: isAndroid ? winHeight * 0.02 + winWidth * 0.01 : 8,
  },
});
