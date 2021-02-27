// 参考: https://tegralsblog.com/react-native-calendars-custom-japanese/
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {formatJPDate} from '../../api/utils';
import {dateState} from '../../features/date-manager/data-manager.recoil';

export const HeaderRightDate = () => {
  const [date, setDate] = useRecoilState(dateState);

  // useEffect(() => {
  //   console.log('HeaderRightDate', date);
  // }, [date]);

  return (
    <TouchableOpacity onPress={() => setDate(new Date())}>
      <View style={Styles.view}>
        <Text style={Styles.text}>
          {formatJPDate(date) === formatJPDate(new Date())
            ? '今日'
            : formatJPDate(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  view: {
    margin: 10,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
});
