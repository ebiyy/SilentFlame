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
import {ScrollView} from 'react-native-gesture-handler';
import {NUTRIENTS} from '../config/meal-lists/nutrients';

const generateHitObj = (inputText: string) => {
  const hitArr = NUTRIENTS.filter((obj) => obj.foodName.includes(inputText));
  return (
    hitArr.length > 0 &&
    hitArr.map((obj, i) => <Text key={i}>{obj.foodName}</Text>)
  );
};

export const KeyboardAvoidingComponent = () => {
  const {control, handleSubmit, errors} = useForm();
  const [inputText, setInputText] = useState('');
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                  placeholder="サプリ名"
                  placeholderTextColor="lightgray"
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
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
