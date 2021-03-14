import {isAndroid} from '@freakycoder/react-native-helpers';
import React from 'react';
import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {winHeight} from '../../global/styles';
import {SettingsList} from './setting-list';

export const SettingScreen = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.waper}>
      <Text style={styles.title}>設定</Text>
      <SettingsList />
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: isAndroid ? winHeight * 0.1 : 0,
  },
  waper: {
    flex: 1,
    margin: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 27,
    color: '#090909',
  },
});
