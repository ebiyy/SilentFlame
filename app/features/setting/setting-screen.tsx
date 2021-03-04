import {save} from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import {Button, Settings, StyleSheet, Text, View} from 'react-native';
import {
  storage,
  storageLoadDateData,
  storageRemove,
  storageSave,
  STORAGE_KEYS,
} from '../../api/storage.helper';
import {dateToStr} from '../../api/utils';
import {shadowStyles, winWidth} from '../../global/styles';
import {SampleSectionList} from '../../sample/setting-sample/section-list';

export const SettingScreen = () => {
  const [data, setData] = useState(Settings.get('data'));

  const storeData = (data) => {
    Settings.set(data);
    setData(Settings.get('data'));
  };
  const [test, setTest] = useState();
  const deleteStorage = () => {
    [
      'meals',
      STORAGE_KEYS.userInfo,
      'mySuppli',
      'suppliToMeal',
      'suppliCount',
      'myWater',
      'waterToMeal',
      'waterCount',
    ].forEach((key) => {
      storageRemove(key);
      storage.clearMapForKey(key);
    });
  };

  const toDayDelete = () => {
    [
      'meals',
      // STORAGE_KEYS.userInfo,
      'mySuppli',
      'suppliToMeal',
      'suppliCount',
      'myWater',
      'waterToMeal',
      'waterCount',
    ].forEach((key) => {
      storage.remove({key, id: dateToStr(new Date())});
    });
  };

  useEffect(() => {
    // storage.remove({
    //   key: 'myWater',
    //   id: '2021-3-1',
    // });

    // storage.clearMapForKey('user');
    // storage.remove({
    //   key: 'user',
    // });
    [
      // 'meals',
      // STORAGE_KEYS.userInfo,
      // 'mySuppli',
      // 'suppliToMeal',
      // 'suppliCount',
      // 'myWater',
      // 'waterToMeal',
      // 'waterCount',
      'weekly',
    ].forEach((key) => {
      storage.getIdsForKey(key).then((ids) => {
        console.log(key, ids);
      });
    });
  }, []);

  useEffect(() => {
    console.log('SettingScreen', test);
  }, [test]);

  return <SampleSectionList />;
};

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // value: {
  //   fontSize: 24,
  //   marginVertical: 12,
  // },
  container: {
    flexWrap: 'wrap',
  },
  card: {
    width: '33%',
    height: winWidth / 3,
    backgroundColor: 'black',
    ...shadowStyles('black').boxShadow,
  },
});

// <View style={styles.container}>
//   {[...Array(9)].map(() => (
//     <View style={styles.card}></View>
//   ))}

{
  /* // <View style={styles.container}>
    //   <Text>Stored value:</Text>
    //   <Text style={styles.value}>{data}</Text>
    //   <Button
    //     onPress={() => storeData({data: 'React'})}
    //     title="Store 'React'"
    //   />
    //   <Button
    //     onPress={() => storeData({data: 'Native'})}
    //     title="Store 'Native'"
    //   />
    //   <Button onPress={deleteStorage} title="Storage all clear" />
    //   <Button onPress={toDayDelete} title="Storage today delete" />
    // </View> */
}
{
  /* </View> */
}
