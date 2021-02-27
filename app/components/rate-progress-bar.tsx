import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import * as Progress from 'react-native-progress';
import {RecoilValueReadOnly, useRecoilValue} from 'recoil';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

type Props = {
  title: string;
  rimit: number;
  unit: string;
  color: string;
  recoilSelector: RecoilValueReadOnly<any>;
};

export const RateProgressBar = (props: Props) => {
  const {title, rimit, unit, color, recoilSelector} = props;
  const sumValue = useRecoilValue(recoilSelector);

  return (
    <View style={styles.barContainer}>
      <View style={styles.barTextContainer}>
        <Text style={[styles.barText, {fontSize: 18}]}>{title}</Text>
        <Text style={styles.barText}>
          {sumValue ? sumValue : 0} / {rimit} {unit}
        </Text>
      </View>
      <Progress.Bar
        progress={sumValue / rimit}
        color={color}
        width={windowWidth * 0.8}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    marginHorizontal: 30,
    alignSelf: 'center',
    // marginTop: windowHeight * 0.015,
  },
  barTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barText: {
    // marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 2,
    fontSize: 15,
  },
});
