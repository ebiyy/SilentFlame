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

  return (
    <View style={[styles.container, {borderBottomWidth: isLast ? 1 : 0}]}>
      <TouchableHighlight
        underlayColor="while"
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('NutrientsScreen', {
            selectMeal: generateMeal(meal, 100, timePeriod, userId),
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
              item: generateMeal(meal, 100, timePeriod, userId),
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
