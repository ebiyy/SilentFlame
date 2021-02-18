// 参考:https://tegralsblog.com/react-native-calendars-custom-japanese/
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue, useResetRecoilState} from 'recoil';
import {dateState, useDate} from '../screen/date.recoil';

const options = {
  month: 'short',
  day: 'numeric',
  weekday: 'short',
};

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('ja-JP', options).format(date);

const HeaderRightDate = () => {
  const [date, setDate] = useRecoilState(dateState);

  useEffect(() => {
    console.log('HeaderRightDate', date);
  }, [date]);

  return (
    <TouchableOpacity onPress={() => setDate(new Date())}>
      <View style={{margin: 10, marginRight: 15}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>
          {formatDate(date) === formatDate(new Date())
            ? '今日'
            : formatDate(date)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default HeaderRightDate;
