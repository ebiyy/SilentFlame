import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
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
  Dimensions,
} from 'react-native';
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import NavigationButton from '../../components/navigation-button';
import {NUTRIENTS} from '../../helpers/csvtojson/nutrients';
import CollapsibleSample from '../../sample/collapsible';

const SearchMeals = ({route}) => {
  const navigation = useNavigation();
  const {control, handleSubmit, errors} = useForm();
  const [inputText, setInputText] = useState('');
  const [submitEditing, setSubmitEditing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      title: '食事を登録',
    });
  }, []);

  const generateHitObj = (inputText: string) => {
    console.log(inputText);
    const hitArr = [].concat(
      NUTRIENTS.filter((obj) => obj.foodName.includes(inputText)),
      NUTRIENTS.filter((obj) => obj.remarks.includes(inputText)),
    );
    console.log(hitArr);
    return (
      hitArr.length > 0 &&
      hitArr.map((obj, i) => (
        <View
          key={i}
          style={{
            padding: 10,
            paddingVertical: 20,
            borderWidth: 1,
            borderRadius: 3,
            borderBottomWidth: i === hitArr.length - 1 ? 1 : 0,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableHighlight
            underlayColor="while"
            activeOpacity={0.6}
            onPress={() =>
              navigation.navigate('NutrientsList', {
                selectNutrient: {...obj, intake: 100},
                setMeals: route.params.setMeals,
                parentScreen: 'SearchMeals',
              })
            }>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={{width: Dimensions.get('window').width * 0.6}}>
                <Text>{obj.foodName}</Text>
              </View>
              <View style={{}}>
                <Text style={{fontSize: 12}}>{obj.ENERC_KCAL} kcal</Text>
              </View>
            </View>
          </TouchableHighlight>
          <View style={{maxWidth: 20, marginHorizontal: 3, marginTop: -3}}>
            <TouchableOpacity
              onPress={() => {
                console.log('route.params', route.params);
                console.log('route.params.setMeals', route.params.setMeals);
                route.params.setMeals((preState) =>
                  preState.concat([{...obj, intake: 100, date: Date()}]),
                );
                navigation.goBack();
              }}>
              <FontAwesome5 name="plus-circle" size={20} />
            </TouchableOpacity>
          </View>
        </View>
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
            <NavigationButton
              buttonTitle="履歴から登録"
              toNavigate="SearchMeals"
            />
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
                  onSubmitEditing={() => {
                    setSubmitEditing(!submitEditing);
                    // Keyboard.dismiss;
                  }}
                  onFocus={() => setSubmitEditing(false)}
                  clearButtonMode="always"
                />
              )}
              name="supplementName"
              rules={{required: true}}
              defaultValue=""
            />
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginBottom: 10,
                  justifyContent: 'space-between',
                }}>
                <Text>「{inputText}」で検索</Text>
                <Text style={{fontSize: 12}}>（100gあたりのカロリー）</Text>
              </View>
              {(inputText.length > 1 || submitEditing) &&
                generateHitObj(inputText)}
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
    marginTop: 10,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});

export default SearchMeals;
