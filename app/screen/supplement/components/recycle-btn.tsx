import React from 'react';
import {TouchableHighlight, View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {winWidth, shadowStyles} from '../../../global-style';

const RecycleBtn = () => {
  return (
    <TouchableHighlight
      style={{width: winWidth / 3}}
      underlayColor="while"
      onPress={() => {}}>
      <View style={Styles.recycleBtn}>
        <MaterialCommunityIcons name="recycle-variant" size={30} color="gray" />
      </View>
    </TouchableHighlight>
  );
};

const Styles = StyleSheet.create({
  recycleBtnContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  recycleBtn: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 1,
    height: 70,
    ...shadowStyles('#ddd').boxShadow,
  },
});

export default RecycleBtn;
