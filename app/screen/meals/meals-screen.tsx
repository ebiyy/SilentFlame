import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import CountSupplement from '../../components/count-supplement';
import NavigationButton from '../../components/navigation-button';
import {ComStyles} from '../../global-style';
import {NUTRIENTS_LABEL} from '../meals/nutrients-list';

const MOCK = [
  {supplementName: 'Mega D-3 & MK-7'},
  {supplementName: 'Vitamin A'},
  {supplementName: 'AMINO COMPLETE'},
  {supplementName: 'Ultra Omega-3'},
  {supplementName: 'E-400'},
  {supplementName: 'B-50'},
  {supplementName: 'Magnesium Citrate'},
  {supplementName: 'NO-FlUSH NAIACIN 500MG'},
];

const header = () => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 3,
    }}>
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>時間</Text>
    </View>
    <View
      style={{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>食品名</Text>
    </View>
    <Text style={{flex: 3}}></Text>
  </View>
);

const MealsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    console.log(meals);
    console.log(meals.map((v) => v.foodName));
  }, [meals]);

  return (
    <>
      <View style={{marginTop: 20}}></View>
      <NavigationButton
        buttonTitle="食事を登録する"
        toNavigate="SearchMeals"
        params={{setMeals}}
      />
      {meals.length > 0 &&
        meals.map((meal, i) => (
          <View
            key={i}
            onTouchStart={() =>
              navigation.navigate('NutrientsList', {selectNutrient: meal})
            }
            style={{
              flex: 7,
              flexDirection: 'row',
              justifyContent: 'space-between',
              // borderWidth: 1,
              // borderRadius: 15,
              // borderColor: '#44577a',
              maxHeight: 130,
              backgroundColor: '#44577a',
              marginTop: 10,
            }}>
            <View style={{flex: 1, ...Styles.itemCenter}}>
              <Text style={Styles.textColor}>12:00</Text>
            </View>
            <View style={{flex: 3, ...Styles.itemCenter}}>
              <Text style={{...Styles.textColor, fontSize: 17}}>
                {meal.foodName}
              </Text>
              <Text style={{marginTop: 20, ...Styles.textColor}}>100g</Text>
            </View>
            <View
              style={{flex: 2, maxWidth: 75, marginLeft: 15, paddingTop: 5}}>
              <Text style={Styles.nutrientLabel}>カロリー</Text>
              <Text style={Styles.nutrientLabel}>たんぱく質</Text>
              <Text style={Styles.nutrientLabel}>脂質</Text>
              <Text style={Styles.nutrientLabel}>炭水化物</Text>
            </View>
            <View style={{flex: 1, ...Styles.itemCenter}}>
              <Text style={Styles.nutrientLabel}>
                {meal.ENERC_KCAL} {NUTRIENTS_LABEL.ENERC_KCAL.unit}
              </Text>
              <Text style={Styles.nutrientLabel}>
                {meal.PROT} {NUTRIENTS_LABEL.PROT.unit}
              </Text>
              <Text style={Styles.nutrientLabel}>
                {meal.FAT} {NUTRIENTS_LABEL.FAT.unit}
              </Text>
              <Text style={Styles.nutrientLabel}>
                {meal.CHOCDF} {NUTRIENTS_LABEL.CHOCDF.unit}
              </Text>
            </View>
          </View>
        ))}
    </>
  );
};

const Styles = StyleSheet.create({
  itemCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutrientLabel: {
    lineHeight: 30,
    color: '#d2eacc',
    fontWeight: 'bold',
  },
  textColor: {
    color: '#d2eacc',
    fontWeight: 'bold',
  },
});

export default MealsScreen;
