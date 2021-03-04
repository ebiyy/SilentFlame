import React, {useEffect, useState} from 'react';
import {
  Linking,
  Platform,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {storageLoad, storageSave, STORAGE_KEYS} from '../../api/storage.helper';
import {isToday, nextDate5h} from '../../api/utils';
import {Anti, Fa5i, Ioni, MCi} from '../../components/common/icons';
import {
  dateState,
  editableState,
} from '../../features/date-manager/data-manager.recoil';
import {userInfoState} from '../../features/init-app/init-app.recoil';
import {shadowStyles} from '../../global/styles';

import {MenuItem} from './setting-list';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  item: MenuItem;
  isFirstElement?: boolean;
  isLastElement?: boolean;
}

const ThemeSwitch = () => {
  const {colorScheme, setColorScheme} = useState();

  return (
    <Switch
      value={colorScheme === 'dark'}
      //ios_backgroundColor={primaryColor}
      onValueChange={() =>
        setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
      }
    />
  );
};

const StyledSettingsListItemWrapper = (props) => {
  const {isFirstElement, isLastElement, children, disabled} = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 22,
        backgroundColor: 'rgb(252,252,252)',
        borderBottomColor: '#f4f4f4',
        borderBottomWidth: !isLastElement ? 1 : 0,
        borderTopLeftRadius: isFirstElement ? 10 : 0,
        borderTopRightRadius: isFirstElement ? 10 : 0,
        borderBottomLeftRadius: isLastElement ? 10 : 0,
        borderBottomRightRadius: isLastElement ? 10 : 0,
      }}>
      {children}
    </TouchableOpacity>
  );
};

// const returnText = (item: string) => {
//   switch (item) {
//     case '日付変更時間':
//       return '04:00';
//     case 'カロリーの目安':
//       return '2200 kcal';
//     case '水分の目安':
//       return '2 L';
//   }
// };

const returnKey = (item: string) => {
  switch (item) {
    case '日付変更時間':
      return 'time';
    case 'カロリーの目安':
      return 'calorie';
    case '水分の目安':
      return 'water';
  }
};

const EDIT = {
  time: false,
  calorie: false,
  water: false,
};

const PLACEHOLDER = {
  calorie: '(kcal)',
  water: '(L)',
};

const UNIT = {
  time: '',
  calorie: 'kcal',
  water: 'L',
};

const VALEU = {
  time: '04:00',
  calorie: '2200',
  water: '2',
};

export const SettingsListItem = (props: Props) => {
  const [edit, setEdit] = useState(EDIT);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [editable, setEditable] = useRecoilState(editableState);
  const date = useRecoilValue(dateState);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dates, setDates] = useState(nextDate5h());

  useEffect(() => {
    if (isToday(date)) {
      setEditable(true);
    }
  }, [date]);

  useEffect(() => {
    storageSave(STORAGE_KEYS.userInfo, userInfo);
  }, [userInfo]);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setEdit({...EDIT, ...{time: false}});
  };

  const handleConfirm = (date) => {
    // setUserInfo({...userInfo, ...{time: }})
    const setTime = new Intl.DateTimeFormat('ja-JP', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(date);
    setUserInfo({...userInfo, ...{time: setTime}});
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  return (
    <StyledSettingsListItemWrapper
      {...props}
      activeOpacity={1}
      disabled={['日付変更時間', 'カロリーの目安', '水分の目安'].includes(
        props.item,
      )}
      onPress={() => {}}>
      {!['日付変更時間', 'カロリーの目安', '水分の目安'].includes(
        props.item,
      ) && <Text style={{color: '#090909', fontSize: 16}}>{props.item}</Text>}

      {['日付変更時間', 'カロリーの目安', '水分の目安'].includes(props.item) ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}>
          <Text style={{color: '#090909', fontSize: 16, alignSelf: 'center'}}>
            {props.item}
          </Text>

          {edit[returnKey(props.item)] && returnKey(props.item) !== 'time' ? (
            <TextInput
              style={[
                {
                  borderColor: 'black',
                  borderWidth: 1,
                  borderRadius: 5,
                  width: 100,
                  paddingLeft: 5,
                },
                shadowStyles('black').boxShadow,
              ]}
              placeholder={PLACEHOLDER[returnKey(props.item)]}
              placeholderTextColor="#ddd"
              value={userInfo[returnKey(props.item)]}
              onChangeText={(v) =>
                setUserInfo({...userInfo, ...{[returnKey(props.item)]: v}})
              }
              keyboardType="numeric"
            />
          ) : (
            <Text style={{color: '#090909', fontSize: 16, alignSelf: 'center'}}>
              {userInfo[returnKey(props.item)]} {UNIT[returnKey(props.item)]}
            </Text>
          )}

          {editable && (
            <TouchableOpacity
              onPress={
                edit[returnKey(props.item)]
                  ? () =>
                      setEdit({...EDIT, ...{[returnKey(props.item)]: false}})
                  : returnKey(props.item) === 'time'
                  ? () => setDatePickerVisibility(true)
                  : () => setEdit({...EDIT, ...{[returnKey(props.item)]: true}})
              }>
              <View
                style={[
                  shadowStyles('rgb(252,252,252)').boxShadow,
                  {borderRadius: 10, padding: 5},
                ]}>
                {edit[returnKey(props.item)]
                  ? Fa5i('save', 'gray', 17)
                  : Fa5i('edit', 'gray', 17)}
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          {['日付変更時間', 'カロリーの目安', '水分の目安'].includes(
            props.item,
          ) ? (
            <>{Fa5i('external-link-alt', 'gray', 17)}</>
          ) : (
            <>{Ioni('chevron-forward', 'gray', 17)}</>
          )}
        </View>
      )}
      {returnKey(props.item) === 'time' && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={dates}
        />
      )}
    </StyledSettingsListItemWrapper>
  );
};
