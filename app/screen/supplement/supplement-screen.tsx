import {useNavigation***REMOVED*** from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View***REMOVED*** from 'react-native';
import CountSupplement from '../../components/count-supplement';
import {ComStyles***REMOVED*** from '../../global-style';

const MOCK = [
  {supplementName: 'Mega D-3 & MK-7'***REMOVED***,
  {supplementName: 'Vitamin A'***REMOVED***,
  {supplementName: 'AMINO COMPLETE'***REMOVED***,
  {supplementName: 'Ultra Omega-3'***REMOVED***,
  {supplementName: 'E-400'***REMOVED***,
  {supplementName: 'B-50'***REMOVED***,
  {supplementName: 'Magnesium Citrate'***REMOVED***,
  {supplementName: 'NO-FlUSH NAIACIN 500MG'***REMOVED***,
];

const SupplementScreen = () => {
  const navigation = useNavigation();
***REMOVED***
    <View style={Styles.screenContainer***REMOVED***>
      <View style={[ComStyles.centeringContainer, Styles.addButtonContainer]***REMOVED***>
        <TouchableOpacity
          style={[Styles.addButton, ComStyles.centeringContainer]***REMOVED***
          onPress={() => navigation.navigate('SupplementForm')***REMOVED***>
          <Text style={Styles.addButtonText***REMOVED***>サプリを登録する</Text>
        </TouchableOpacity>
      </View>
      {MOCK.map((obj) => (
        <CountSupplement supplementName={obj.supplementName***REMOVED*** />
      ))***REMOVED***
    </View>
***REMOVED***
***REMOVED***

const Styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
***REMOVED***
  addButtonContainer: {maxHeight: 60, marginBottom: 10***REMOVED***,
  addButton: {
    width: 300,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
***REMOVED***
  addButtonText: {
    color: '#fff',
    fontSize: 22,
***REMOVED***
***REMOVED***

export default SupplementScreen;
