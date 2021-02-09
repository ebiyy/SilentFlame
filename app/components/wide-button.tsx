import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

type Props = {
  navigate: () => void;
  btnText?: string;
  widthRate: number;
  color: 'white' | 'gray';
  type: 'card' | 'btn';
  children?: Element;
};

const WideBtn = (props: Props) => {
  const {navigate, btnText, widthRate, color, type, children} = props;
  return (
    <TouchableHighlight
      style={{
        width: Dimensions.get('window').width / widthRate,
      }}
      underlayColor="while"
      onPress={navigate}>
      <View
        style={[
          Styles.container,
          color === 'gray'
            ? {backgroundColor: '#ddd', borderColor: '#ddd'}
            : {backgroundColor: 'white', borderColor: 'lightgreen'},
          type === 'card' ? {height: 160} : {height: 80},
        ]}>
        {btnText && <Text style={Styles.text}>{btnText}</Text>}
        {children && children}
      </View>
    </TouchableHighlight>
  );
};

const Styles = StyleSheet.create({
  container: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    borderRadius: 10,
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    // backgroundColor: 'white',
    borderWidth: 1,
    // borderColor: 'lightgreen',
  },
  text: {fontSize: 18, fontFamily: 'Hiragino Sans'},
});

export default WideBtn;
