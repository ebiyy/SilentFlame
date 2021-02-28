import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {Controller, useForm} from 'react-hook-form';
import {VirtualizedList} from 'react-native';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {NUTRIENTS} from '../../config/meal-lists/nutrients';
import {firestoreState} from '../../api/firebase.helper';
import {screenThemeColor} from '../../global/styles';
import {userIdState} from '../init-app/init-app.recoil';
import {LogMeals} from './log-meals';
import {MealLsit} from './meal-list';
import {actionMealState} from './recoil.meal';

const generateHitObj = (inputText: string) => {
  const fullSerach = (text: string) =>
    Array.from(
      new Set(
        [].concat(
          NUTRIENTS.filter((obj) => obj.foodName.includes(text)),
          NUTRIENTS.filter((obj) => obj.remarks.includes(text)),
        ),
      ),
    );

  let hitArr: Nutrients[] = [];
  const space = {
    halfidth: ' ',
    fullwidth: '　',
    none: '',
  };
  const formatSpaceText = inputText.replace(/　/g, space.halfidth);
  const searchTextArr = formatSpaceText
    .split(space.halfidth)
    .filter((str) => str !== space.none && str !== space.halfidth);
  // ex. "卵 鶏卵　い" -> ["卵", "鶏卵", "い"]
  // think: 一括処理できそう
  if (searchTextArr.length > 1) {
    searchTextArr.forEach((text, i) => {
      if (i === 0) {
        hitArr = fullSerach(text);
      } else {
        hitArr = hitArr.filter((obj) => obj.foodName.includes(text));
      }
    });
  } else {
    hitArr = fullSerach(searchTextArr[0]);
  }
  return hitArr;
};

type Params = {
  timePeriod: TimePeriodKey;
};

export const SearchMeals = ({route}) => {
  const navigation = useNavigation();
  const {timePeriod} = route.params as Params;
  const {control, handleSubmit, errors} = useForm();
  const [inputText, setInputText] = useState('');
  const [submitEditing, setSubmitEditing] = useState(false);
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);
  const [isSerach, setIsSerach] = useState(true);
  const [serachResult, setSerachResult] = useState<Nutrients[]>([]);
  const userId = useRecoilValue(userIdState);
  const firestore = useRecoilValue(firestoreState);
  const [value, loading, error] = useCollection(
    firestore
      .collection('Meal')
      .doc(userId)
      .collection('Meal')
      .orderBy('addedAt')
      .limit(10),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    },
  );

  useEffect(() => {
    navigation.setOptions({
      title: '食事を登録',
    });
  }, []);

  useEffect(() => {
    firestore
      .collection('Meal')
      .doc(userId)
      .collection('2021-02-13')
      .doc('4ZvUQkuqavEEWFF9OOL5')
      .get()
      .then((result) => console.log('result.data()', result.data()));
  }, []);

  const Item = ({meal}) => (
    <MealLsit
      meal={meal}
      timePeriod={timePeriod}
      // isLast={isLast}
    />
  );

  const renderItem = ({item}) => {
    if (item) {
      return <Item meal={item} />;
    }
    return <Text>結果なし</Text>;
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.inner}>
            <View style={{alignItems: 'center', marginBottom: 8}}>
              <TouchableOpacity
                style={{
                  width: Dimensions.get('window').width / 2,
                }}
                onPress={() => setIsSerach((preState) => !preState)}>
                <View style={styles.registrationTimePeriodItems}>
                  <Text style={{fontSize: 18, fontFamily: 'Hiragino Sans'}}>
                    {isSerach ? '履歴から登録' : '検索から登録'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {isSerach ? (
              <View>
                <Controller
                  control={control}
                  render={({onChange, onBlur, value}) => (
                    <TextInput
                      style={styles.textInput}
                      onBlur={onBlur}
                      onChangeText={(value) => {
                        onChange(value);
                        setInputText(value);
                        setSerachResult(generateHitObj(value));
                      }}
                      value={value}
                      placeholder="食品名"
                      placeholderTextColor="lightgray"
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
                {(inputText.length > 1 || submitEditing) && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 10,
                        justifyContent: 'space-between',
                      }}>
                      <Text>「{inputText}」の検索結果</Text>
                      <Text style={{fontSize: 12}}>
                        （100gあたりのカロリー）
                      </Text>
                    </View>
                    <VirtualizedView>
                      <VirtualizedList
                        data={[]}
                        renderItem={renderItem}
                        keyExtractor={(item, i) => String(i)}
                        getItemCount={(data) => serachResult.length - 1}
                        getItem={(date, i) => serachResult[i]}
                      />
                    </VirtualizedView>
                  </View>
                )}
              </View>
            ) : (
              <LogMeals timePeriod={timePeriod} />
            )}
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
    padding: 12,
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
  registrationTimePeriodItems: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 150,
    height: 80,
    borderRadius: 10,
    // backgroundColor: '#ddd',
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: screenThemeColor.meals,
  },
});
