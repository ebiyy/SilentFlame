// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view

import React from 'react';
import {View} from 'react-native';
import {HeaderContent} from './header-content';
import {Shape} from './shape';

export const GradientHeader = () => {
  return (
    <View>
      <Shape />
      <HeaderContent />
    </View>
  );
};
