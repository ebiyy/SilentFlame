import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {storage, storageRemove} from '../../api/storage.helper';
import {comparisonDate, dateToStr} from '../../api/utils';
import {FadeInView} from '../../components/fade-in-view';
import {screenThemeColor, shadowStyles, winWidth} from '../../global/styles';
import {useDataManager} from '../init-app/data-manager.hook';
import {userInfoState} from '../init-app/init-app.recoil';
import {CustomCalendar} from './calender';
import {mockMarkedDates} from './constants';
import {dateState} from './data-manager.recoil';
import {DotMarkingData} from './date-manager';
import {changeMarkedDate} from './functions';

const DOT = {
  meals: {key: 'meals', color: screenThemeColor.meals},
  suppliToMeal: {key: 'suppli', color: screenThemeColor.suppli},
  waterToMeal: {key: 'water', color: screenThemeColor.water},
};

export const CalendarScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useRecoilState(dateState);
  const [selectedDate, setSelectedDate] = useState(dateToStr(date));
  const [markedDate, setMarkedDate] = useState<DotMarkingData>();
  const [beforeDate, setBeforeDate] = useState(dateToStr(date));
  const [dots, setDots] = useState();
  const setCurrentDate = useDataManager();
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    if (dots && Object.keys(dots).length === 3) {
      let getMarked = {};
      Object.keys(dots).forEach((key) => {
        dots[key].forEach((id) => {
          const mark = {dots: [DOT[key]]};
          getMarked[id] = getMarked[id]
            ? {dots: [...getMarked[id]['dots'], DOT[key]]}
            : mark;
        });
      });
      const select = {
        selected: true,
        disableTouchEvent: true,
        selectedColor: '#ddd',
      };
      if (userInfo && userInfo.time) {
        const hour = Number(userInfo.time.split(':')[0]);
        const minuts = Number(userInfo.time.split(':')[1]);
        const toDay = dateToStr(comparisonDate(new Date(), hour, minuts));
        console.log('getMarked', toDay);
        getMarked[toDay] = getMarked[toDay]
          ? {...getMarked[toDay], ...select}
          : select;
      } else {
        getMarked[toDay] = select;
      }

      setMarkedDate(getMarked);
    }
  }, [dots]);

  useEffect(() => {
    ['meals', 'suppliToMeal', 'waterToMeal'].forEach((key) => {
      storage.getIdsForKey(key).then((ids) => {
        setDots((preState) => {
          return {...preState, [key]: ids};
        });
      });
    });
  }, []);

  useEffect(() => {
    console.log('CalendarScreen::date', date, dateToStr(date));
    setSelectedDate(dateToStr(date));
  }, [date]);

  useEffect(() => {
    // ex. '2021-02-16'
    setMarkedDate((preState) =>
      changeMarkedDate(preState, selectedDate, beforeDate),
    );
    setBeforeDate(selectedDate);
  }, [beforeDate, selectedDate]);

  const selectPress = () => {
    setCurrentDate(new Date(selectedDate));
    // setEditable(selectedDate === dateToStr(new Date()));
    // setDate(new Date(selectedDate));

    // navigation.navigate('weekly');
    navigation.reset({
      index: 0,
      routes: [{name: 'weekly'}],
    });
  };

  return (
    <View style={Styles.container}>
      {markedDate && (
        <CustomCalendar
          date={date}
          markedDate={markedDate}
          setSelectedDate={setSelectedDate}
        />
      )}

      {selectedDate !== dateToStr(date) &&
        markedDate[selectedDate] &&
        markedDate[selectedDate]['dots'].length > 0 && (
          <FadeInView>
            <View style={Styles.btnContainer}>
              <TouchableOpacity style={Styles.btnContent} onPress={selectPress}>
                <View style={[Styles.btn, shadowStyles('black').boxShadow]}>
                  <Text style={Styles.btnText}>この日の記録を表示</Text>
                </View>
              </TouchableOpacity>
            </View>
          </FadeInView>
        )}
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginVertical: 30,
  },
  btnContainer: {
    margin: 70,
    alignItems: 'center',
  },
  btnContent: {
    width: winWidth / 1.5,
  },
  btn: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 75,
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Hiragino Sans',
  },
});
