import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import CountSupplement from '../../components/count-supplement';
import {ComStyles} from '../../global-style';

const MOCK = [
  {supplementName: 'Mega D-3 & MK-7'},
  {supplementName: 'Vitamin A'},
  {supplementName: 'AMINO COMPLETE'},
  {supplementName: 'Ultra Omega-3'},
  {supplementName: 'E-400'},
  {supplementName: 'B-50'},
  {supplementName: 'Magnesium Citrate'},
  {supplementName: 'NO-FlUSH NAIACIN 500MG'},
];

const SupplementScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={Styles.screenContainer}>
      <View style={[ComStyles.centeringContainer, Styles.addButtonContainer]}>
        <TouchableOpacity
          style={[Styles.addButton, ComStyles.centeringContainer]}
          onPress={() => navigation.navigate('SupplementForm')}>
          <Text style={Styles.addButtonText}>サプリを登録する</Text>
        </TouchableOpacity>
      </View>
      {MOCK.map((obj, index) => (
        <CountSupplement key={index} supplementName={obj.supplementName} />
      ))}
    </View>
  );
};

const Styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  addButtonContainer: {maxHeight: 60, marginBottom: 10},
  addButton: {
    width: 300,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
  },
});

export default SupplementScreen;
