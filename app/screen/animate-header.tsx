import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import TestAdmod from '../admob';
import GradientHeader from '../components/header/header';

type Props = {};

const AnimateHeader = (props: Props) => {
  return (
    <View>
      <GradientHeader />
      <TestAdmod />
    </View>
  );
};

const Styles = StyleSheet.create({});

export default AnimateHeader;
