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
import {
  storage,
  storageLoad,
  storageLoadDateData,
  storageRemove,
  storageSave,
} from '../../api/storage.helper';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {formatShortStrDate} from '../../api/utils';

export const SupplementScreen = () => {
  const navigation = useNavigation();
  const [switchCount, setSwitchCount] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [supplis, setSupplis] = useRecoilState(supplisState);
  const isSupplisStorage = useRecoilValue(isSupplisStorageState);
  const [suppliToMeal, setSuppliToMeal] = useState({});
  const [count, setCount] = useRecoilState(suppliCountState);
  const isSuppliCount = useRecoilValue(isSupplisCountState);
  const isSuppliToMeal = useRecoilValue(isSuppliToMealState);
  const currentDate = useRecoilValue(dateState);
  const editable = useRecoilValue(editableState);

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

  useEffect(() => {
    console.log('SupplementScreen::supplis', supplis);
    console.log('SupplementScreen::suppliCount', count);
    console.log('SupplementScreen::suppliToMeal', suppliToMeal);
  }, [count, suppliToMeal, supplis]);

  useEffect(() => {
    // storageLoad('mySuppli', setSupplis);
    console.log('SupplementScreen', formatShortStrDate(currentDate));
    if (editable) {
      storageLoad('mySuppli', setSupplis);
    } else {
      storageLoadDateData(
        'mySuppli',
        formatShortStrDate(currentDate),
        setSupplis,
        [],
      );
    }

    // storageLoad('suppliToMeal', setSuppliToMeal);
    // storageLoad('suppliCount', setCount);
    storageLoadDateData(
      'suppliToMeal',
      formatShortStrDate(currentDate),
      setSuppliToMeal,
      {},
    );
    storageLoadDateData(
      'suppliCount',
      formatShortStrDate(currentDate),
      setCount,
      {},
    );
  }, [currentDate]);

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
          {supplis
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
            ))}
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
