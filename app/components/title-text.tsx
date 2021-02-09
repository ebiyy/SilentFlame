import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

type Props = {
  title: string;
};

const TitleText = (props: Props) => {
  const {title} = props;
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>{title}</Text>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  text: {
    fontSize: 22,
    marginLeft: 5,
  },
});

export default TitleText;
