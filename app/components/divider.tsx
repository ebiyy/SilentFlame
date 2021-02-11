// from https://github.com/SilenYang/react-native-divider/blob/master/index.js
// component -> functional

import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  dashed?: boolean;
  color?: string;
  borderColor?: string;
  orientation?: 'left' | 'center' | 'right';
  children?: string;
  index?: number;
};

// borderColor: '#e8e8e8',
const DEFAULT_PROPS = {
  dashed: false,
  orientation: 'center',
  color: 'rgba(0,0,0,.85)',
  borderColor: 'black',
  children: '',
};

export const Divider = (props: Props) => {
  const {
    dashed = DEFAULT_PROPS.dashed,
    color = DEFAULT_PROPS.color,
    borderColor = DEFAULT_PROPS.borderColor,
    orientation = DEFAULT_PROPS.orientation,
    children = DEFAULT_PROPS.children,
    index,
  } = props;
  // useEffect(() => {
  //   Object.keys(props).forEach((key) => {
  //     if (props[key] === undefined) {
  //       props[key] = DEFAULT_PROPS[key];
  //     }
  //   });
  // }, [props]);

  return (
    <View style={[styles.container, {marginTop: index === 0 ? 0 : 3}]}>
      <View
        style={[
          styles.line,
          {borderColor: borderColor},
          dashed && styles.dashed,
          orientation === 'left' ? styles.shortWidth : {flex: 1},
        ]}
      />
      <Text style={[styles.text, {color: color}]}>{children}</Text>
      <View
        style={[
          styles.line,
          {borderColor: borderColor},
          dashed && styles.dashed,
          orientation === 'right' ? styles.shortWidth : {flex: 1},
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 24,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 6,
  },
  line: {
    height: 24,
    borderBottomWidth: 1,
    transform: [{translateY: -12}],
  },
  shortWidth: {
    width: 20,
  },
  dashed: {
    borderStyle: 'dashed',
  },
  text: {
    paddingHorizontal: 24,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Divider;
