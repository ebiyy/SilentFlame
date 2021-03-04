// 参考: https://tegralsblog.com/react-native-calendars-custom-japanese/
import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  comparisonDate,
  dateToStr,
  formatJpDate,
  weekPeriod,
} from '../../api/utils';
import {ConfirmationModal} from '../../components/common/confirmation-modal';
import {dateState} from '../../features/date-manager/data-manager.recoil';
import {useDataManager} from '../../features/init-app/data-manager.hook';
import {userInfoState} from '../../features/init-app/init-app.recoil';
import {weeklyDataState} from '../../features/weekly/recoil.weekly';

export const HeaderRightDate = () => {
  const route = useRoute();
  const [date, setDate] = useRecoilState(dateState);
  const [isWeekly, setIsWeekly] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChoice, setModalChoice] = useState<'yes' | 'no' | undefined>();
  const setCurrentDate = useDataManager();
  const navigation = useNavigation();
  const setWeekData = useRecoilState(weeklyDataState)[1];
  const userInfo = useRecoilValue(userInfoState);

  const getToday = () => {
    if (userInfo && userInfo.time) {
      const hour = Number(userInfo.time.split(':')[0]);
      const minuts = Number(userInfo.time.split(':')[1]);
      console.log(hour, minuts);
      // console.log(dateToStr(getToday()) === dateToStr(new Date()));
      return comparisonDate(new Date(), hour, minuts);
    }
    return null;
  };

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
      if (userInfo && userInfo.time) {
        const hour = Number(userInfo.time.split(':')[0]);
        const minuts = Number(userInfo.time.split(':')[1]);
        setCurrentDate(comparisonDate(new Date(), hour, minuts));
      }
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
            getToday() && dateToStr(getToday()) !== dateToStr(date)
              ? setModalVisible(true)
              : {}
          }>
          <View style={Styles.view}>
            <Text style={Styles.text}>
              {getToday() && dateToStr(getToday()) === dateToStr(date)
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
