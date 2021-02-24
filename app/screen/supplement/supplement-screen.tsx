import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountSupplement from './count-supplement';
import {ComStyles} from '../../global-style';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  isSupplisCountState,
  isSupplisStorageState,
  isSuppliToMealState,
  suppliCountState,
  supplisState,
} from './suppli.hook';
import FadeInView from '../../components/fade-in-view';
import RecycleBtn from './components/recycle-btn';
import ItemActions from './components/item-actions';
import storage from '../../helpers/custom-async-storage';
import {useNavigation} from '@react-navigation/native';

const SupplementScreen = () => {
  const navigation = useNavigation();
  const [switchCount, setSwitchCount] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [supplis, setSupplis] = useRecoilState(supplisState);
  const isSupplisStorage = useRecoilValue(isSupplisStorageState);
  const [suppliToMeal, setSuppliToMeal] = useState({});
  const [count, setCount] = useRecoilState(suppliCountState);
  const isSuppliCount = useRecoilValue(isSupplisCountState);
  const isSuppliToMeal = useRecoilValue(isSuppliToMealState);

  useEffect(() => {
    console.log('isSupplisStorage', isSupplisStorage);
    console.log('isSuppliCount', isSuppliCount);
    console.log('isSuppliToMeal', isSuppliToMeal);

    // storage
    //   .load({
    //     key: 'mySuppli',
    //     autoSync: true,
    //     syncInBackground: true,
    //     syncParams: {
    //       extraFetchOptions: {},
    //       someFlag: true,
    //     },
    //   })
    //   .then((res) => {
    //     console.log(
    //       'get supplis data',
    //       res.map((o) => o.suppliName),
    //     );
    //     setSupplis(res);
    //   })
    //   .catch((err) => {
    //     switch (err.name) {
    //       case 'NotFoundError':
    //         // TODO;
    //         break;
    //       case 'ExpiredError':
    //         storage.remove({
    //           key: 'mySuppli',
    //         });
    //         break;
    //     }
    //   });
    // storage
    //   .load({
    //     key: 'suppliToMeal',
    //     autoSync: true,
    //     syncInBackground: true,
    //     syncParams: {
    //       extraFetchOptions: {},
    //       someFlag: true,
    //     },
    //   })
    //   .then((res) => {
    //     console.log('SupplementScreen::Load::setSuppliToMeal', res);
    //     setSuppliToMeal(res);
    //   })
    //   .catch((err) => {
    //     switch (err.name) {
    //       case 'NotFoundError':
    //         // TODO;
    //         break;
    //       case 'ExpiredError':
    //         storage.remove({
    //           key: 'suppliToMeal',
    //         });
    //         break;
    //     }
    //   });

    // storage
    //   .load({
    //     key: 'suppliCount',
    //     autoSync: true,
    //     syncInBackground: true,
    //     syncParams: {
    //       extraFetchOptions: {},
    //       someFlag: true,
    //     },
    //   })
    //   .then((res) => {
    //     console.log('SupplementScreen::Load::suppliCount', res);
    //     setCount(res);
    //   })
    //   .catch((err) => {
    //     console.error('suppliCount has error', err);
    //     switch (err.name) {
    //       case 'NotFoundError':
    //         // TODO;
    //         break;
    //       case 'ExpiredError':
    //         // storage.remove({
    //         //   key: 'suppliCount',
    //         // });
    //         break;
    //     }
    //   });
    storage
      .getBatchData([
        {key: 'mySuppli'},
        {key: 'suppliToMeal', syncInBackground: false},
        {key: 'suppliCount'},
      ])
      .then((results) => {
        results.forEach((res, i) => {
          switch (i) {
            case 0:
              console.log(
                'get supplis data',
                res.map((o) => o.suppliName),
              );
              setSupplis(res);
              break;
            case 1:
              console.log('setSuppliToMeal', res);
              setSuppliToMeal(res);
              break;
            case 2:
              console.log('setCount', res);
              setCount(res);
              break;
          }
        });
      });
  }, []);

  return (
    <ScrollView>
      <View style={Styles.screenContainer}>
        <View style={[ComStyles.centeringContainer, Styles.addButtonContainer]}>
          <ItemActions
            switchCount={switchCount}
            setSwitchCount={setSwitchCount}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        </View>
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
        {supplis.filter((suppli) => suppli.delete).length > 0 && !isDelete && (
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

export default SupplementScreen;
