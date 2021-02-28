import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilState} from 'recoil';
import {formatShortStrDate} from '../../api/utils';
import {FadeInView} from '../../components/fade-in-view';
import {shadowStyles, winWidth} from '../../global/styles';
import {CustomCalendar} from './calender';
import {mockMarkedDates} from './constants';
import {dateState} from './data-manager.recoil';
import {DotMarkingData} from './date-manager';
import {changeMarkedDate} from './functions';

export const CalendarScreen = () => {
  const navigation = useNavigation();
  const [date, setDate] = useRecoilState(dateState);
  const [selectedDate, setSelectedDate] = useState(formatShortStrDate(date));
  const [markedDate, setMarkedDate] = useState<DotMarkingData>(mockMarkedDates);
  const [beforeDate, setBeforeDate] = useState(formatShortStrDate(date));

  useEffect(() => {
    setSelectedDate(formatShortStrDate(date));
  }, [date]);

  useEffect(() => {
    // ex. '2021-02-16'
    setMarkedDate((preState) =>
      changeMarkedDate(preState, selectedDate, beforeDate),
    );
    setBeforeDate(selectedDate);
  }, [beforeDate, selectedDate]);

  return (
    <View style={Styles.container}>
      <CustomCalendar
        date={date}
        markedDate={markedDate}
        setSelectedDate={setSelectedDate}
      />
      {selectedDate !== formatShortStrDate(date) && (
        <FadeInView>
          <View style={Styles.btnContainer}>
            <TouchableOpacity
              style={Styles.btnContent}
              onPress={() => {
                setDate(new Date(selectedDate));
                navigation.navigate('weekly');
              }}>
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
