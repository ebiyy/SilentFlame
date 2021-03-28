import React from 'react';
import {View} from 'react-native';
import TestAdmod from '../../features/admob/admob';
import {GradientHeader} from '../../components/sections/header/gradient-header';

export const CustomHeaderBackground = () => {
  return (
    <View>
      <GradientHeader />
      <TestAdmod />
    </View>
  );
};
