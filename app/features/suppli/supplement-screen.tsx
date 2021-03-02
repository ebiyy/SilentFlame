import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ComStyles} from '../../global/styles';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  isSupplisCountState,
  isSupplisStorageState,
  isSuppliToMealState,
  suppliCountState,
  supplisState,
} from './suppli.hook';
import {useNavigation} from '@react-navigation/native';
import {FadeInView} from '../../components/fade-in-view';
import {ItemActions} from './components/item-actions';
import {RecycleBtn} from './components/recycle-btn';
import {CountSupplement} from './count-supplement';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {TitleText} from '../../components/title-text';
import {formatShortStrDate, isToday} from '../../api/utils';

export const SupplementScreen = () => {
  const navigation = useNavigation();
  const [switchCount, setSwitchCount] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const supplis = useRecoilValue(supplisState);
  const [count, setCount] = useRecoilState(suppliCountState);
  const [editable, setEditable] = useRecoilState(editableState);
  const date = useRecoilValue(dateState);
  const isSupplisStorage = useRecoilValue(isSupplisStorageState);
  const isSuppliToMeal = useRecoilValue(isSuppliToMealState);
  const isSupplisCount = useRecoilValue(isSupplisCountState);

  useEffect(() => {
    if (isToday(date)) {
      setEditable(true);
    }
  }, [date]);

  // useEffect(() => {
  //   storage.clearMapForKey('mySuppli');
  //   storage.clearMapForKey('suppliToMeal');
  //   storage.clearMapForKey('suppliCount');
  //   storage.remove({
  //     key: 'mySuppli',
  //   });
  //   storage.remove({
  //     key: 'suppliToMeal',
  //   });
  //   storage.remove({
  //     key: 'suppliCount',
  //   });
  // }, [currentDate]);

  // useEffect(() => {
  //   console.log('SupplementScreen::supplis', supplis);
  //   console.log('SupplementScreen::suppliCount', count);
  //   console.log('SupplementScreen::suppliToMeal', suppliToMeal);
  // }, [count, suppliToMeal, supplis]);

  return (
    <ScrollView>
      <View style={Styles.screenContainer}>
        {editable && (
          <View
            style={[ComStyles.centeringContainer, Styles.addButtonContainer]}>
            <ItemActions
              switchCount={switchCount}
              setSwitchCount={setSwitchCount}
              isDelete={isDelete}
              setIsDelete={setIsDelete}
            />
          </View>
        )}

        <FadeInView>
          {supplis.length > 0 ? (
            supplis
              .filter((suppli) => !suppli.delete)
              .map((suppli, i) => (
                <CountSupplement
                  key={i}
                  suppli={suppli}
                  switchCount={switchCount}
                  isDelete={isDelete}
                  holdCount={count}
                  setHoldCount={setCount}
                />
              ))
          ) : (
            <TitleText title="登録なし" />
          )}
        </FadeInView>
        {editable &&
          supplis.filter((suppli) => suppli.delete).length > 0 &&
          !isDelete && (
            <View style={Styles.recycleBtnContainer}>
              <TouchableOpacity
                onPress={() => navigation.navigate('SuppliArchiveScreen')}>
                <RecycleBtn />
              </TouchableOpacity>
            </View>
          )}
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  addButtonContainer: {
    maxHeight: 60,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recycleBtnContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});
