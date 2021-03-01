import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRecoilState, useRecoilValue} from 'recoil';
import {winWidth} from '../../global/styles';
import {CARBOHYDRATES} from '../../config/meal-lists/carbohydrate';
import {DIETARY_FIBER} from '../../config/meal-lists/dietary-fiber';
import {FATS} from '../../config/meal-lists/fat';
import {ORGANIC_ACID} from '../../config/meal-lists/organic-acid';
import {PROTEINS} from '../../config/meal-lists/protein';
import {userIdState} from '../init-app/init-app.recoil';
import {generateMeal, replaceFoodName} from './function.meal';
import {actionMealState, mealsState} from './recoil.meal';

type Props = {
  meal: Meal;
  timePeriod: TimePeriodKey;
  isLast: boolean;
};

export const MealLsit = (props: Props) => {
  const navigation = useNavigation();
  const {meal, timePeriod, isLast} = props;
  const userId = useRecoilValue(userIdState);
  const [meals, setMeals] = useRecoilState(mealsState);

  const setPFC = () => {
    const selectMeal = {...meal};
    const getObj = (
      array: (Protein | Fats | Carbohydrate | DietaryFiber | OrganicAcid)[],
    ) => array.filter((obj) => obj.indexNumber === meal.indexNumber)[0];
    const protein = {...(getObj(PROTEINS) as Protein)};
    const fat = {...(getObj(FATS) as Fats)};
    const corbo = {...(getObj(CARBOHYDRATES) as Carbohydrate)};
    const dietaryFiber = {...(getObj(DIETARY_FIBER) as DietaryFiber)};
    const organicAcid = {...(getObj(ORGANIC_ACID) as OrganicAcid)};

    selectMeal.remarks = selectMeal.remarks
      ? `【共通】\n${selectMeal.remarks}`
      : '';
    const infoText = [
      '【たんぱく質】',
      '【脂質】',
      '【炭水化物】',
      '【有機酸】',
    ];
    [protein, fat, corbo, organicAcid]
      .map((obj, i) =>
        obj.remarks !== undefined
          ? obj.remarks
            ? `\n\n${infoText[i]}\n ${obj.remarks}`
            : ''
          : '',
      )
      .forEach((str) => {
        if (str) {
          selectMeal.remarks += str;
        }
      });
    if (selectMeal.remarks.indexOf('推計') > 0) {
      let remarks = `${selectMeal.remarks}`;
      const num = remarks.replace(/[^0-9]/g, '');
      if (num.length === 5) {
        selectMeal.remarks = remarks.replace(num, '');
      }
    }
    [protein, fat, corbo, organicAcid].forEach((obj) => {
      obj && delete obj.remarks;
    });
    return Object.assign(
      selectMeal,
      protein,
      fat,
      corbo,
      dietaryFiber,
      organicAcid,
    );
  };

  return (
    <View style={[styles.container, {borderBottomWidth: isLast ? 1 : 0}]}>
      <TouchableHighlight
        underlayColor="while"
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('NutrientsScreen', {
            selectMeal: generateMeal(setPFC(), 100, timePeriod, userId),
            parentScreen: 'MealsSearchScreen',
            timePeriod: timePeriod,
          });
        }}>
        <View style={styles.card}>
          <View style={styles.cardTitle}>
            <Text>{replaceFoodName(meal.foodName)}</Text>
          </View>
          <View
            style={[styles.cardContent, {marginLeft: meal.intake ? 0 : 30}]}>
            <Text style={styles.kcalText}>{meal.ENERC_KCAL} kcal</Text>
            {meal.intake && <Text style={{fontSize: 12}}>{meal.intake} g</Text>}
          </View>
        </View>
      </TouchableHighlight>
      <View style={styles.addBtn}>
        <TouchableOpacity
          onPress={() => {
            setMeals((preState) => [
              ...preState,
              generateMeal(setPFC(), 100, timePeriod, userId),
            ]);
            navigation.goBack();
          }}>
          <FontAwesome5 name="plus-circle" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderRadius: 3,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    width: winWidth * 0.5,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  kcalText: {
    fontSize: 12,
    marginHorizontal: 10,
  },
  addBtn: {
    maxWidth: 20,
    marginHorizontal: 3,
    marginTop: -3,
  },
});
