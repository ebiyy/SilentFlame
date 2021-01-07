import React, {useState***REMOVED*** from 'react';
import {Alert, Text, View, StyleSheet, TouchableOpacity***REMOVED*** from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {ComStyles***REMOVED*** from '../global-style';

type Props = {
  supplementName: string;
***REMOVED***

const CountSupplement = (props: Props) => {
  const [count, setCount] = useState(0);
  const [switchIcon, setSwitchIcon] = useState(false);
***REMOVED***
    <View style={Styles.countSupplContainer***REMOVED***>
      <View style={[Styles.supplNameContainer]***REMOVED***>
        <TouchableOpacity
          style={ComStyles.centeringContainer***REMOVED***
          onPress={() => Alert.alert('Simple Button pressed')***REMOVED***>
          <Text>{props.supplementName***REMOVED***</Text>
        </TouchableOpacity>
      </View>
      <View style={[ComStyles.centeringContainer, Styles.counterContainer]***REMOVED***>
        {switchIcon ? (
          <TouchableOpacity
            onPress={() => setCount(count - 1 >= 0 ? count - 1 : 0)***REMOVED***>
            <FontAwesome5 name="minus-circle" size={40***REMOVED*** />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setCount(count + 1)***REMOVED***>
            <FontAwesome5 name="plus-circle" size={40***REMOVED*** />
          </TouchableOpacity>
        )***REMOVED***
      </View>
      <View style={[ComStyles.centeringContainer, Styles.countValueContainer]***REMOVED***>
        <TouchableOpacity onPress={() => setSwitchIcon(!switchIcon)***REMOVED***>
          <Text style={Styles.countValueText***REMOVED***>{count***REMOVED***</Text>
        </TouchableOpacity>
      </View>
    </View>
***REMOVED***
***REMOVED***

const HEIGHT = 57;

const Styles = StyleSheet.create({
  countSupplContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    maxHeight: HEIGHT,
    marginVertical: 5,
***REMOVED***
  counterContainer: {
    width: 60,
    marginHorizontal: 10,
***REMOVED***
  supplNameContainer: {
    width: 230,
    borderColor: 'lightgray',
    borderWidth: 3,
    borderRadius: 7,
***REMOVED***
  countValueContainer: {width: 20, borderColor: 'black', borderWidth: 1***REMOVED***,
  countValueText: {
    fontSize: 22,
***REMOVED***
***REMOVED***

export default CountSupplement;
