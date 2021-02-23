import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useDeviceName} from 'react-native-device-info';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useRecoilState, useRecoilValue} from 'recoil';
import {winWidth} from '../../global-style';
import {CARBOHYDRATES} from '../../helpers/csvtojson/carbohydrate';
import {DIETARY_FIBER} from '../../helpers/csvtojson/dietary-fiber';
import {FATS} from '../../helpers/csvtojson/fat';
import {ORGANIC_ACID} from '../../helpers/csvtojson/organic-acid';
import {PROTEINS} from '../../helpers/csvtojson/protein';
import {userIdState} from '../../recoil/user';
import {generateMeal, replaceFoodName} from './function.meal';
import {actionMealState} from './recoil.meal';

type Props = {
  meal: Meal;
  timePeriod: TimePeriodKey;
  isLast: boolean;
};

const MealLsit = (props: Props) => {
  const navigation = useNavigation();
  const {meal, timePeriod, isLast} = props;
  const userId = useRecoilValue(userIdState);
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);

  const setPFC = () => {
    const getObj = (
      array: (Protein | Fats | Carbohydrate | DietaryFiber | OrganicAcid)[],
    ) => array.filter((obj) => obj.indexNumber === meal.indexNumber)[0];
    const protein = getObj(PROTEINS) as Protein;
    const fat = getObj(FATS) as Fats;
    const corbo = getObj(CARBOHYDRATES) as Carbohydrate;
    const dietaryFiber = getObj(DIETARY_FIBER) as DietaryFiber;
    const organicAcid = getObj(ORGANIC_ACID) as OrganicAcid;

    const cutRemark = (str: string) => str.replace(meal.remarks, '');
    [protein, fat, corbo, organicAcid]
      .filter((obj) => obj && obj.remarks) // 対象データがない可能性がある
      .map((obj) => cutRemark(obj.remarks))
      .forEach((str) => {
        if (str) {
          meal.remarks = str;
        }
      });
    [protein, fat, corbo, organicAcid].forEach((obj) => {
      obj && delete obj.remarks;
    });
    // protein && delete protein.remarks;
    // fat && delete fat.remarks;
    // corbo && delete corbo.remarks;
    // organicAcid && delete organicAcid.remarks;
    return Object.assign(meal, protein, fat, corbo, dietaryFiber, organicAcid);
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
            setActionMeal({
              item: generateMeal(setPFC(), 100, timePeriod, userId),
              action: 'add',
            });
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

export default MealLsit;
