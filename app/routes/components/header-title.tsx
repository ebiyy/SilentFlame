import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Anti} from '../../components/common/icons';

export const CustomHeaderTitle = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('CustomCalendar')}>
      {Anti('calendar', 'black', 30)}
    </TouchableOpacity>
  );
};
