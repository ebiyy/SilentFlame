// 参考: https://tegralsblog.com/react-native-calendars-custom-japanese/
import React, {useEffect, useState} from 'react';
import {Calendar, DotMarking, LocaleConfig} from 'react-native-calendars';
import {useRecoilState} from 'recoil';
import {getFormatDate} from '../firebase/meal';
import {dateState} from '../screen/date.recoil';

LocaleConfig.locales.jp = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

const mockMarkedDates: {[date: string]: DotMarking} = {
  '2021-02-16': {marked: true, selectedColor: 'blue'},
  '2021-02-17': {marked: true, selected: false},
  '2021-02-18': {marked: true, dotColor: 'red', activeOpacity: 0},
  '2021-02-19': {disabled: true, disableTouchEvent: true},
};

const CustomCalendar = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [markedDate, setMarkedDate] = useState<{
    [date: string]: DotMarking;
  }>(mockMarkedDates);
  const [date, setDate] = useRecoilState(dateState);

  useEffect(() => {
    setMarkedDate((preState) =>
      changeMarkedDate(preState, getFormatDate(date)),
    );
    setSelectedDate(getFormatDate(date));
  }, [date]);

  const changeMarkedDate = (
    preState: {
      [date: string]: DotMarking;
    },
    dateString: string,
  ) => {
    let assignObj = {};
    if (selectedDate) {
      assignObj = {
        [selectedDate]: {
          selected: false,
          disableTouchEvent: false,
          selectedColor: 'transparent',
        },
      };
    }
    assignObj = Object.assign(assignObj, {
      [dateString]: {
        selected: true,
        disableTouchEvent: true,
        selectedColor: 'orange',
      },
    });
    return {...preState, ...assignObj};
  };

  return (
    <Calendar
      // 最初に表示される月。 デフォルト値 = Date()
      current={new Date()}
      // カレンダーで選択できる範囲の最初の日。この日以前の日付はグレーアウトします。 デフォルト値 = undefined
      minDate={'2021-02-01'}
      // カレンダーで選択できる範囲の最後の日。この日以前の日付はグレーアウトします。 デフォルト値 = undefined
      maxDate={'2021-12-31'}
      // 年月の表示フォーマット。
      monthFormat={'yyyy年 M月'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(dateObj) => {
        setMarkedDate((preState) =>
          changeMarkedDate(preState, dateObj.dateString),
        );
        setSelectedDate(dateObj.dateString);
        setDate(new Date(dateObj.dateString));
      }}
      // 年月を変更したときの挙動。
      onMonthChange={(dateObj) => {
        console.log('month changed', dateObj.dateString);
      }}
      // 初めの曜日設定。例えば、月曜日なら１、日曜日なら７
      firstDay={7}
      // スワイプでの年月変更の可否。 デフォルト値 = false
      enableSwipeMonths={false}
      markedDates={markedDate}
    />
  );
};

export default CustomCalendar;

// const dayViewStyle = (date: DateObject, currentDate: Date) =>
//   StyleSheet.create({
//     dayView: {
//       padding: 10,
//       height: 40,
//       borderRadius: 20,
//       backgroundColor:
//         date.dateString === getFormatDate(currentDate)
//           ? '#CCCCCC'
//           : 'transparent',
//     },
//   });

// const dayTextStyle = (date: DateObject, currentDate: Date) =>
//   StyleSheet.create({
//     dayText: {
//       fontSize: 16,
//       color:
//         date.month !== currentDate.getMonth() + 1
//           ? 'gray'
//           : new Date(date.dateString).getDay() === 0
//           ? 'red'
//           : new Date(date.dateString).getDay() === 6
//           ? 'blue'
//           : 'black',
//     },
//   });

// 日付のスタイリングをjsxで行える(休日の色付けなど)
// dayComponent={({date}) => {
//   return (
//     <TouchableOpacity
//       // 日付を選択したときの挙動。
//       onPress={() => {
//         setCurrentDate(new Date(date.dateString));
//         console.log('selected day', date);
//       }}>
//       <View style={dayViewStyle(date, currentDate).dayView}>
//         <Text style={dayTextStyle(date, currentDate).dayText}>
//           {date.day}
//         </Text>
//       </View>
//     </TouchableOpacity>
//   );
// }}
