// 参考: https://tegralsblog.com/react-native-calendars-custom-japanese/
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {
  formatJpDate,
  formatJpMonthDay,
  dateToStr,
  weekPeriod,
} from '../../api/utils';
import {ConfirmationModal} from '../../components/common/confirmation-modal';
import {FadeInView} from '../../components/fade-in-view';
import {
  dateState,
  editableState,
} from '../../features/date-manager/data-manager.recoil';
import {useDataManager} from '../../features/init-app/data-manager.hook';
import {mealsState} from '../../features/meal/recoil.meal';
import {
  supplisState,
  suppliToMealState,
  suppliCountState,
} from '../../features/suppli/suppli.hook';
import {
  watersState,
  waterCountState,
  waterToMealState,
} from '../../features/water/water.hook';
import {weeklyDataState} from '../../features/weekly/recoil.weekly';

export const HeaderRightDate = () => {
  const route = useRoute();
  const [date, setDate] = useRecoilState(dateState);
  const [isWeekly, setIsWeekly] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChoice, setModalChoice] = useState<'yes' | 'no' | undefined>();
  const [editable, setEditable] = useRecoilState(editableState);
  const setCurrentDate = useDataManager();
  const navigation = useNavigation();
  const setWeekData = useRecoilState(weeklyDataState)[1];

  useEffect(() => {
    if (route.state === undefined) {
      if (route.name === 'weekly') {
        setIsWeekly(true);
      } else {
        setIsWeekly(false);
      }
    } else {
      if (route.state.index !== undefined) {
        if (route.state.index === 0) {
          setIsWeekly(true);
        } else {
          setIsWeekly(false);
        }
      } else {
        setIsWeekly(false);
      }
    }
  }, [route]);

  useEffect(() => {
    if (modalChoice === 'yes') {
      setWeekData([]);
      setCurrentDate(new Date());
      // setEditable(true);
      // setDate(new Date());
      setModalChoice(undefined);
      navigation.navigate('weekly'); // resetではうまく動かない
    }
  }, [modalChoice]);

  return (
    <>
      {!modalVisible && (
        <TouchableOpacity
          onPress={() =>
            formatJpDate(date) !== formatJpDate(new Date())
              ? setModalVisible(true)
              : {}
          }>
          <View style={Styles.view}>
            <Text style={Styles.text}>
              {formatJpDate(date) === formatJpDate(new Date())
                ? isWeekly
                  ? weekPeriod(date)
                  : '今日'
                : isWeekly
                ? weekPeriod(date)
                : formatJpDate(date)}
            </Text>
          </View>
        </TouchableOpacity>
      )}

      {modalVisible && (
        <ConfirmationModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          modalFunc={setModalChoice}
          modalTitle="今日の日付に戻しますか？"
        />
      )}
    </>
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
