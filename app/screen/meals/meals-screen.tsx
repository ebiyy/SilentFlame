import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {NUTRIENTS} from '../../helpers/csvtojson/nutrients';
import CollapsibleSample from '../../sample/collapsible';

const MealsScreen = () => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();
  const [inputText, setInputText] = useState('');

  const generateHitObj = (inputText: string) => {
    const hitArr = [].concat(
      NUTRIENTS.filter((obj) => obj.foodName.includes(inputText)),
      NUTRIENTS.filter((obj) => obj.remarks.includes(inputText)),
    );
    return (
      hitArr.length > 0 &&
      hitArr.map((obj, i) => (
        <TouchableHighlight
          key={i}
          underlayColor="lightblue"
          onPress={() =>
            navigation.navigate('NutrientsList', {selectNutrient: obj})
          }>
          <View
            style={{
              padding: 10,
              paddingVertical: 20,
              borderWidth: 1,
              borderRadius: 3,
              borderBottomWidth: i === hitArr.length - 1 ? 1 : 0,
            }}>
            <Text>{obj.foodName}</Text>
          </View>
        </TouchableHighlight>
      ))
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.inner}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={styles.textInput}
                  onBlur={onBlur}
                  onChangeText={(value) => {
                    onChange(value);
                    setInputText(value);
                  }}
                  value={value}
                  placeholder="食品名"
                />
              )}
              name="supplementName"
              rules={{required: true}}
              defaultValue=""
            />
            {errors.supplementName && <Text>This is required.</Text>}
            <View>
              <Text style={{marginBottom: 10}}>「{inputText}」で検索</Text>
              {inputText.length > 1 && generateHitObj(inputText)}
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default MealsScreen;
