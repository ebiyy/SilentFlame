import React, {useState} from 'react';
import {Alert, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ComStyles} from '../global-style';

type Props = {
  supplementName: string;
};

const CountSupplement = (props: Props) => {
  const [count, setCount] = useState(0);
  const [switchIcon, setSwitchIcon] = useState(false);
  return (
    <View style={Styles.countSupplContainer}>
      <View style={[Styles.supplNameContainer]}>
        <TouchableOpacity
          style={ComStyles.centeringContainer}
          onPress={() => Alert.alert('Simple Button pressed')}>
          <Text>{props.supplementName}</Text>
        </TouchableOpacity>
      </View>
      <View style={[ComStyles.centeringContainer, Styles.counterContainer]}>
        {switchIcon ? (
          <TouchableOpacity
            onPress={() => setCount(count - 1 >= 0 ? count - 1 : 0)}>
            <FontAwesome5 name="minus-circle" size={40} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setCount(count + 1)}>
            <FontAwesome5 name="plus-circle" size={40} />
          </TouchableOpacity>
        )}
      </View>
      <View style={[ComStyles.centeringContainer, Styles.countValueContainer]}>
        <TouchableOpacity onPress={() => setSwitchIcon(!switchIcon)}>
          <Text style={Styles.countValueText}>{count}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const HEIGHT = 57;

const Styles = StyleSheet.create({
  countSupplContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    maxHeight: HEIGHT,
    marginVertical: 5,
  },
  counterContainer: {
    width: 60,
    marginHorizontal: 10,
  },
  supplNameContainer: {
    width: 230,
    borderColor: 'lightgray',
    borderWidth: 3,
    borderRadius: 7,
  },
  countValueContainer: {width: 20, borderColor: 'black', borderWidth: 1},
  countValueText: {
    fontSize: 22,
  },
});

export default CountSupplement;
