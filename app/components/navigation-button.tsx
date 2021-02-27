import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {ComStyles} from '../global/styles';

type Props = {
  buttonTitle: string;
  toNavigate: string;
  params?: Object;
};

export const NavigationButton = (props: Props) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[Styles.addButton, ComStyles.centeringContainer]}
      onPress={() =>
        navigation.navigate(props.toNavigate, props.params ? props.params : {})
      }>
      <Text style={Styles.addButtonText}>{props.buttonTitle}</Text>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  addButton: {
    marginBottom: 10,
    width: 300,
    height: 60,
    maxHeight: 60,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
    alignSelf: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
  },
});
