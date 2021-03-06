import React, {Fragment, useEffect, useState} from 'react';
import {
  LogBox,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {actionMealState, mealsState} from './recoil.meal';
import {calNutrient, generateMeal, replaceFoodName} from './function.meal';
import {
  screenThemeColor,
  shadowStyles,
  winHeight,
  winWidth,
} from '../../global/styles';
import SwitchSelector from 'react-native-switch-selector';
import {BASIC_NUTRIENTS_LABEL, NUTRIENTS_LABEL} from './constant.meal';
import {Divider} from '../../components/divider';
import {userIdState} from '../init-app/init-app.recoil';
import {NutrientsList} from './nutrients-list';
import {editableState} from '../date-manager/data-manager.recoil';
import {isAndroid} from '@freakycoder/react-native-helpers';

type Params = {
  selectMeal: Meal;
  parentScreen: string;
  timePeriod: TimePeriodKey;
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

export const NutrientsScreen = ({navigation, route}) => {
  const {selectMeal, parentScreen, timePeriod} = route.params as Params;
  const userId = useRecoilValue(userIdState);
  const [intake, setIntake] = useState(selectMeal.intake || 100);
  const [listRules, setListRules] = useState<any>(BASIC_NUTRIENTS_LABEL);
  const [meals, setMeals] = useRecoilState(mealsState);
  const editable = useRecoilValue(editableState);
  const [memo, setMemo] = useState(selectMeal.memo ? selectMeal.memo : '');

  const toggleSwitch = (v) => {
    setListRules(v === '簡易' ? BASIC_NUTRIENTS_LABEL : NUTRIENTS_LABEL);
  };

  const submit = () => {
    if (parentScreen === 'MealsSearchScreen') {
      setMeals((preState) => [
        ...preState,
        {
          ...generateMeal(
            calNutrient(selectMeal, String(intake)),
            Number(intake),
            timePeriod,
            userId,
          ),
          ...{memo: memo},
        },
      ]);
      navigation.goBack();
      navigation.goBack();
    }
    if (parentScreen === 'MealsScreen') {
      setMeals((preState) =>
        preState.map((meal) =>
          meal.id === selectMeal.id
            ? {
                ...calNutrient(selectMeal, String(intake)),
                updatedAt: new Date(),
                author: userId,
                memo: memo,
              }
            : meal,
        ),
      );
      navigation.goBack();
    }
  };

  const options = [
    {label: '簡易', value: '簡易'},
    {label: '詳細', value: '詳細'},
  ];

  const getMarginBottom = (num: number, styleKey: string) =>
    parentScreen === 'PfcPieChart'
      ? [styles[styleKey], {marginBottom: num}]
      : styles[styleKey];

  // console.log(getMarginBottom(15));
  return (
    <View style={{marginTop: isAndroid ? winHeight * 0.1 : 0}}>
      <View style={getMarginBottom(15, 'headerContainer')}>
        <View style={getMarginBottom(10, 'headerTitle')}>
          <Text
            style={[
              styles.headerTitleText,
              parentScreen !== 'PfcPieChart' && {
                fontSize: 18,
                paddingBottom: 3,
              },
            ]}>
            {parentScreen === 'PfcPieChart'
              ? '栄養素の合計'
              : replaceFoodName(selectMeal.foodName).length > 11
              ? `${replaceFoodName(selectMeal.foodName).slice(0, 11)}...`
              : replaceFoodName(selectMeal.foodName)}
          </Text>
        </View>
        <View style={styles.headerSwitch}>
          <View style={styles.switchContainer}>
            <SwitchSelector
              textColor="black"
              selectedColor="white"
              buttonColor="gray"
              borderColor={screenThemeColor.meals}
              hasPadding
              textStyle={{fontSize: 13}}
              selectedTextStyle={{fontSize: 15}}
              style={[
                shadowStyles(screenThemeColor.meals).boxShadow,
                {borderRadius: 20},
              ]}
              options={options}
              initial={0}
              onPress={toggleSwitch}
            />
          </View>
        </View>
      </View>
      {parentScreen !== 'PfcPieChart' && (
        <>
          {editable ? (
            <View style={styles.container}>
              <View style={styles.textInputContainer}>
                <TextInput
                  keyboardType="numeric"
                  style={styles.input}
                  onChangeText={(v) => {
                    setIntake(String(v));
                  }}
                  maxLength={10}
                  value={String(intake)}
                  placeholder="摂取量(g)"
                  placeholderTextColor="lightgray"
                  clearButtonMode="always"
                  defaultValue={String(intake)}
                />
                <Text style={styles.inputLable}>g</Text>
              </View>
              <TouchableOpacity
                style={{width: winWidth / 2.5}}
                onPress={submit}>
                <View
                  style={[
                    styles.btnContainer,
                    shadowStyles(screenThemeColor.meals).boxShadow,
                  ]}>
                  <Text style={styles.btnText}>この量で登録</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{marginTop: 20}}></View>
          )}
          {(memo && !editable) ||
            (editable && (
              <View
                style={{
                  width: '80%',
                  alignSelf: 'center',
                  marginBottom: 20,
                  flexDirection: 'row',
                }}>
                <View
                  style={{marginBottom: 5, alignSelf: 'center', marginEnd: 40}}>
                  <Text style={{fontSize: 15}}>メモ</Text>
                </View>

                <TextInput
                  style={[styles.input, {width: '78%', height: 30}]}
                  multiline={true}
                  numberOfLines={2}
                  onChangeText={(text) => setMemo(text)}
                  value={memo}
                  placeholder="市販の１つ分の分量などをメモ"
                  placeholderTextColor="#ddd"
                  clearButtonMode="always"
                  editable={editable}
                />
              </View>
            ))}

          <Divider>{`${Number(intake)}g あたりの栄養素`}</Divider>
        </>
      )}
      <NutrientsList
        selectMeal={selectMeal}
        intake={intake}
        listRules={listRules}
        isSingle={parentScreen !== 'PfcPieChart'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 25,
    marginTop: 18,
    marginBottom: 20,
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  switchContainer: {
    transform: [{scaleX: 0.9}, {scaleY: 0.9}],
  },
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    minWidth: 110,
    height: 40,
  },
  inputLable: {
    marginVertical: 8,
    marginHorizontal: 5,
    fontSize: 18,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerTitle: {
    alignSelf: 'flex-end',
    marginLeft: 15,
  },
  headerTitleText: {
    fontSize: 22,
    marginLeft: 5,
    textDecorationLine: 'underline',
    textDecorationColor: screenThemeColor.meals,
  },
  headerSwitch: {
    width: '40%',
    margin: 10,
    marginBottom: 0,
  },
  textInputContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  btnContainer: {
    height: 50,
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
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
  btnText: {
    fontSize: 18,
    fontFamily: 'Hiragino Sans',
  },
});
