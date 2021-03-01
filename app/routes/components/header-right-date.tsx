// 参考: https://tegralsblog.com/react-native-calendars-custom-japanese/
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState} from 'recoil';
import {
  formatJpDate,
  formatJpMonthDay,
  formatShortStrDate,
  weekPeriod,
} from '../../api/utils';
import {ConfirmationModal} from '../../components/common/confirmation-modal';
import {FadeInView} from '../../components/fade-in-view';
import {
  dateState,
  editableState,
} from '../../features/date-manager/data-manager.recoil';

export const HeaderRightDate = () => {
  const route = useRoute();
  const [date, setDate] = useRecoilState(dateState);
  const [isWeekly, setIsWeekly] = useState<boolean>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalChoice, setModalChoice] = useState<'yes' | 'no' | undefined>();
  const [editable, setEditable] = useRecoilState(editableState);

  useEffect(() => {
    console.log('HeaderRightDate', route);
    if (route.state === undefined) {
      console.log(1);
      if (route.name === 'weekly') {
        setIsWeekly(true);
        console.log(2);
      } else {
        setIsWeekly(false);
        console.log(3);
      }
    } else {
      if (route.state.index !== undefined) {
        if (route.state.index === 0) {
          setIsWeekly(true);
          console.log(4);
        } else {
          setIsWeekly(false);
          console.log(5);
        }
      } else {
        setIsWeekly(false);
        console.log(6);
      }
    }
  }, [route]);

  useEffect(() => {
    if (modalChoice === 'yes') {
      setEditable(true);
      setDate(new Date());
      setModalChoice(undefined);
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
