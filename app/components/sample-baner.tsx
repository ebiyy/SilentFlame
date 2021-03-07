import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {winWidth} from '../global/styles';

type Props = {
  type: 'top' | 'bottom';
};

const style = {
  top: {
    top: '25%',
    left: winWidth * 0.08,
    rotate: '28deg',
    fontSize: winWidth * 0.24,
  },
  bottom: {
    top: '40%',
    left: winWidth * 0.03,
    rotate: '28deg',
    fontSize: winWidth * 0.26,
  },
};

export const SampleBaner = ({type}: Props) => (
  <View style={typeStyles(type).container}>
    <View style={typeStyles(type).rotate}>
      <Text style={typeStyles(type).text}>SAMPLE</Text>
    </View>
  </View>
);

const typeStyles = (type: 'top' | 'bottom') =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      top: style[type].top,
      left: style[type].left,
      opacity: 0.2,
    },
    rotate: {
      backgroundColor: 'lightgray',
      transform: [{rotate: '28deg'}],
    },
    text: {
      fontSize: style[type].fontSize,
      color: 'white',
    },
  });
