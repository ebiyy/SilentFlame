// 参考: https://tegralsblog.com/react-native-calendars-custom-japanese/
import React from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {useRecoilValue} from 'recoil';
import {LOCALES} from './constants';
import {DotMarkingData} from './date-manager';
import {userInfoState} from '../init-app/init-app.recoil';
import {convToLocalDate, dateToStr} from '../../api/utils';

LocaleConfig.locales.jp = LOCALES;
LocaleConfig.defaultLocale = 'jp';

type Props = {
  markedDate: DotMarkingData;
  date: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
};

export const CustomCalendar = (props: Props) => {
  const {date, markedDate, setSelectedDate} = props;
  // const [selectedDate, setSelectedDate] = useState('');
  // const [date, setDate] = useRecoilState(dateState);
  const userInfo = useRecoilValue(userInfoState);

  // useEffect(() => {
  //   // ex. '2021-02-16'
  //   const strDate = dateToStr(date);
  //   setMarkedDate((preState) =>
  //     changeMarkedDate(preState, strDate, selectedDate),
  //   );
  //   setSelectedDate(strDate);
  // }, [date, selectedDate]);

  return (
    <Calendar
      // 最初に表示される月。 デフォルト値 = Date()
      current={new Date(date)}
      // カレンダーで選択できる範囲の最初の日。この日以前の日付はグレーアウトします。 デフォルト値 = undefined
      // minDate={'2021-01-01'}
      minDate={dateToStr(userInfo.createdAt)}
      // カレンダーで選択できる範囲の最後の日。この日以前の日付はグレーアウトします。 デフォルト値 = undefined
      maxDate={new Date()}
      // 年月の表示フォーマット。
      monthFormat={'yyyy年 M月'}
      // Handler which gets executed on day press. Default = undefined
      onDayPress={(dateObj) => {
        // setMarkedDate((preState) =>
        //   changeMarkedDate(preState, dateObj.dateString, selectedDate),
        // );
        setSelectedDate(dateObj.dateString);
        // setDate(new Date(dateObj.dateString));
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
      markingType={'multi-dot'}
    />
  );
};

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
