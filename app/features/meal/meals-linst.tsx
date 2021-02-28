import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userIdState} from '../init-app/init-app.recoil';
import {generateMeal, replaceFoodName} from './function.meal';
import {actionMealState} from './recoil.meal';

type Props = {
  meals: (MargeMeal | Nutrients)[];
  timePeriod: TimePeriodKey;
};

export const MealsLsit = (props: Props) => {
  const navigation = useNavigation();
  const {meals, timePeriod} = props;
  const userId = useRecoilValue(userIdState);
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);

  return (
    <>
      {meals.length > 0 ? (
        meals.map((obj: Nutrients | MargeMeal, i) => (
          <View
            key={i}
            style={{
              padding: 10,
              paddingVertical: 20,
              borderWidth: 1,
              borderRadius: 3,
              borderBottomWidth: i === meals.length - 1 ? 1 : 0,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableHighlight
              underlayColor="while"
              activeOpacity={0.6}
              onPress={() => {
                navigation.navigate('NutrientsScreen', {
                  selectMeal: generateMeal(obj, 100, timePeriod, userId),
                  parentScreen: 'MealsSearchScreen',
                  timePeriod: timePeriod,
                });
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View
                  style={{
                    width: Dimensions.get('window').width * 0.5,
                  }}>
                  <Text>{replaceFoodName(obj.foodName)}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginLeft: obj.intake ? 0 : 30,
                  }}>
                  <Text
                    style={{
                      fontSize: 12,
                      marginHorizontal: 10,
                    }}>
                    {obj.ENERC_KCAL} kcal
                  </Text>
                  {obj.intake && (
                    <Text style={{fontSize: 12}}>{obj.intake} g</Text>
                  )}
                </View>
              </View>
            </TouchableHighlight>
            <View
              style={{
                maxWidth: 20,
                marginHorizontal: 3,
                marginTop: -3,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setActionMeal({
                    item: generateMeal(obj, 100, timePeriod, userId),
                    action: 'add',
                  });
                  navigation.goBack();
                }}>
                <FontAwesome5 name="plus-circle" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <View style={{margin: 10}}>
          <Text>検索結果なし</Text>
        </View>
        // 検索のコツと書くとよさそう
      )}
    </>
  );
};

const styles = StyleSheet.create({});
