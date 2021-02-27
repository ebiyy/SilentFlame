import React, {Fragment, useState} from 'react';
import {LogBox, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {actionMealState} from './recoil.meal';
import {calNutrient, generateMeal} from './function.meal';
import {screenThemeColor, shadowStyles, winWidth} from '../../global/styles';
import SwitchSelector from 'react-native-switch-selector';
import {BASIC_NUTRIENTS_LABEL, NUTRIENTS_LABEL} from './constant.meal';
import {Divider} from '../../components/divider';
import {userIdState} from '../init-app/user.recoil';
import {NutrientsList} from './nutrients-list';

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
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);
  const [listRules, setListRules] = useState<any>(BASIC_NUTRIENTS_LABEL);
  const toggleSwitch = (v) => {
    setListRules(v === '簡易' ? BASIC_NUTRIENTS_LABEL : NUTRIENTS_LABEL);
  };

  const submit = () => {
    setActionMeal(
      parentScreen === 'MealsSearchScreen'
        ? {
            item: generateMeal(
              calNutrient(selectMeal, String(intake)),
              Number(intake),
              timePeriod,
              userId,
            ),
            action: 'add',
          }
        : {
            item: {
              ...calNutrient(selectMeal, String(intake)),
              updatedAt: new Date(),
              author: userId,
            },
            action: 'update',
          },
    );
    if (parentScreen === 'MealsSearchScreen') {
      navigation.goBack();
      navigation.goBack();
    }
    if (parentScreen === 'MealsScreen') {
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
    <>
      <View style={getMarginBottom(15, 'headerContainer')}>
        <View style={getMarginBottom(10, 'headerTitle')}>
          <Text style={styles.headerTitleText}>
            {parentScreen === 'PfcPieChart' ? '栄養素の合計' : ''}
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
            <TouchableOpacity style={{width: winWidth / 2.5}} onPress={submit}>
              <View
                style={[
                  styles.btnContainer,
                  shadowStyles(screenThemeColor.meals).boxShadow,
                ]}>
                <Text style={styles.btnText}>この量で登録</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Divider>{`${Number(intake)}g あたりの栄養素`}</Divider>
        </>
      )}
      <NutrientsList
        selectMeal={selectMeal}
        intake={intake}
        listRules={listRules}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 25,
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
