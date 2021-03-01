import React, {useEffect, useState} from 'react';
import {Button, Settings, StyleSheet, Text, View} from 'react-native';
import {storageLoadDateData} from '../../api/storage.helper';
import {formatShortStrDate} from '../../api/utils';

export const SettingScreen = () => {
  const [data, setData] = useState(Settings.get('data'));

  const storeData = (data) => {
    Settings.set(data);
    setData(Settings.get('data'));
  };
  const [test, setTest] = useState();
  const runTest = () => {
    storageLoadDateData('suppliCount', '2021-02-17', setTest, {});
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
      <Button onPress={runTest} title="Storage Test" />
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
