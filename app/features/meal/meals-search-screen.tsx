import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {VirtualizedList} from 'react-native';
import {View, TextInput, StyleSheet, Text, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {screenThemeColor} from '../../global/styles';
import {NUTRIENTS} from '../../config/meal-lists/nutrients';
import {MealLsit} from './meal-list';
import {addDays, dateToStr} from '../../api/utils';
import {storage} from '../../api/storage.helper';
import {dateState} from '../date-manager/data-manager.recoil';
import {TitleText} from '../../components/title-text';

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
  console.log('searchTextArr', searchTextArr);
  if (searchTextArr.length > 1) {
    searchTextArr.forEach((text, i) => {
      if (i === 0) {
        hitArr = fullSerach(text);
        console.log(
          'i===0::hitArr',
          hitArr.map((v) => v.foodName),
          text,
        );
      } else {
        hitArr = hitArr.filter((obj) => obj.foodName.includes(text));
        console.log(
          'i===0::hitArr',
          hitArr.map((v) => v.foodName),
          text,
        );
      }
    });
    console.log(
      'hitArr::return',
      hitArr.map((v) => v.foodName),
    );
    return hitArr;
  } else {
    hitArr = fullSerach(searchTextArr[0]);
  }
  return hitArr;
};

type Params = {
  timePeriod: TimePeriodKey;
};

export const MealsSearchScreen = ({route}) => {
  const navigation = useNavigation();
  const {timePeriod} = route.params as Params;
  const [inputText, setInputText] = useState('');
  const [submitEditing, setSubmitEditing] = useState(false);
  const [isSerach, setIsSerach] = useState(true);
  const [serachResult, setSerachResult] = useState<Nutrients[]>([]);
  const [logMeals, setLogMeals] = useState<Meal[]>([]);
  const date = useRecoilValue(dateState);

  useEffect(()=>{
    console.log('logMeals',logMeals)
    console.log('logMeals',logMeals.map(v => [v.intake,typeof v.intake]))
  },[logMeals])

  useEffect(() => {
    if (!isSerach && logMeals.length === 0) {
      const currentDate = new Date(date);
      const monthIds = [...new Array(31)].map((v, i) =>
        dateToStr(addDays(currentDate, -i)),
      );
      monthIds.forEach((id) => {
        storage
          .load({
            key: 'meals',
            id,
          })
          .then((res) => {
            setLogMeals((preState) => [
              ...preState,
              ...res.filter(
                (r) =>
                  !preState.map((meal) => meal.foodName).includes(r.foodName) ||
                  !preState.map((meal) => meal.intake).includes(r.intake),
              ),
            ]);
          })
          .catch((err) => {
            // any exception including data not found
            // goes to catch()
            console.warn(err.message);
            switch (err.name) {
              case 'NotFoundError':
                // TODO;
                break;
              case 'ExpiredError':
                // TODO
                break;
            }
          });
      });
    }
  }, [isSerach]);

  const Item = ({meal, isLast}) => (
    <MealLsit meal={meal} timePeriod={timePeriod} isLast={isLast} />
  );

  const renderItem = ({item}) => {
    const isLast = isSerach
      ? serachResult.indexOf(item) + 1 === serachResult.length
      : logMeals.indexOf(item) + 1 === logMeals.length;
    if (item) {
      return <Item meal={{...item}} isLast={isLast} />;
    }
    return <Text>{isSerach ? '結果なし' : '履歴なし'}</Text>;
  };

  return (
    <View>
      <VirtualizedList
        data={[]}
        renderItem={renderItem}
        keyExtractor={(item, i) => String(i)}
        getItemCount={() =>
          isSerach
            ? serachResult.length > 0
              ? serachResult.length
              : 0
            : logMeals.length > 0
            ? logMeals.length
            : 0
        }
        getItem={(date, i) => (isSerach ? serachResult[i] : logMeals[i])}
        ListEmptyComponent={
          (isSerach ? inputText : logMeals.length === 1) ? (
            <View style={{margin: 20}}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  textDecorationColor: screenThemeColor.meals,
                }}>
                検索結果なし
              </Text>
              <Text style={{margin: 10, marginTop: 30}}>
                平仮名のみでの検索か、別名ので検索をお試しください。
              </Text>
              <Text style={{marginHorizontal: 10, marginTop: 3}}>
                例：× ほうれん草 -> ○ ほうれんそう
              </Text>
              <Text style={{marginHorizontal: 10}}>
                例：× しゃけ -> ○ さけ
              </Text>
              <Text style={{marginHorizontal: 10}}>
                例：× 鶏胸肉 -> ○ にわとり　むね
              </Text>
              <Text style={{marginHorizontal: 10, marginTop: 13}}>
                また、料理名、商品名などは収録されていません。
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
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
                <TextInput
                  style={styles.textInput}
                  onChangeText={(v) => {
                    setInputText(v);
                    setSerachResult(generateHitObj(v));
                  }}
                  value={inputText}
                  placeholder="食品名"
                  placeholderTextColor="lightgray"
                  onSubmitEditing={() => {
                    setSubmitEditing(!submitEditing);
                  }}
                  onFocus={() => setSubmitEditing(false)}
                  clearButtonMode="always"
                />
                {(inputText.length > 1 || submitEditing) && (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginBottom: 5,
                        justifyContent: 'space-between',
                      }}>
                      <Text>「{inputText}」の検索結果</Text>
                      <Text style={{fontSize: 12}}>
                        （100gあたりのカロリー）
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            ) : (
              <View style={styles.headerConteinr}>
                <TitleText title="履歴" />
                <View style={styles.headerSubTextConteinr}>
                  <Text>（過去１ヶ月間で登録された食品）</Text>
                </View>
              </View>
            )}
          </View>
        }
        stickyHeaderIndices={[0]}
      />
    </View>
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
    backgroundColor: 'white',
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
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
  headerConteinr: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerSubTextConteinr: {
    alignSelf: 'center',
  },
});
