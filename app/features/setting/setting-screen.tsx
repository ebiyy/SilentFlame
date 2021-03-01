import React, {useEffect, useState} from 'react';
import {Button, Settings, StyleSheet, Text, View} from 'react-native';
import {
  storage,
  storageLoadDateData,
  storageRemove,
  STORAGE_KEYS,
} from '../../api/storage.helper';
import {formatShortStrDate} from '../../api/utils';

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

  useEffect(() => {
    console.log('SettingScreen', test);
  }, [test]);

  return (
    <View style={styles.container}>
      <Text>Stored value:</Text>
      <Text style={styles.value}>{data}</Text>
      <Button
        onPress={() => storeData({data: 'React'})}
        title="Store 'React'"
      />
      <Button
        onPress={() => storeData({data: 'Native'})}
        title="Store 'Native'"
      />
      <Button onPress={deleteStorage} title="Storage all clear" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  value: {
    fontSize: 24,
    marginVertical: 12,
  },
});
