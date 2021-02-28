import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  TouchableOpacity,
  Dimensions,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {screenThemeColor, shadowStyles} from '../../global/styles';

type Props = {
  btnText: string;
  toNavigate: string;
  navigatePrames?: Object;
  wideRate?: number;
  color?: string;
  height?: number;
};

export const WideBtn = (props: Props) => {
  const navigation = useNavigation();
  const {
    btnText,
    toNavigate,
    navigatePrames = {},
    wideRate = 2,
    color = screenThemeColor.meals, // shadowColorへ
    height = 75,
  } = props;
  return (
    <TouchableOpacity
      style={{width: Dimensions.get('window').width / wideRate}}
      onPress={() => navigation.navigate(toNavigate, navigatePrames)}>
      <View
        style={[
          Styles.registrationTimePeriodItems,
          shadowStyles(color).boxShadow,
          {height: height},
        ]}>
        <Text style={Styles.btnText}>{btnText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  registrationTimePeriodItems: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 150,
    // height: 80,
    borderRadius: 10,
    // backgroundColor: '#ddd',
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: screenThemeColor.meals,
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Hiragino Sans',
  },
});
