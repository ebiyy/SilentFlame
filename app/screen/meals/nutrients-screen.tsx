import React, {Fragment, useState} from 'react';
import {Button, LogBox, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import Divider from '../../components/divider';
import {actionMealState, mealsState} from './recoil.meal';
import {calNutrient, generateMeal} from './function.meal';
import {userIdState} from '../../recoil/user';
import NutrientsList from './nutrients-list';
import TitleText from '../../components/title-text';

type Params = {
  selectMeal: Meal;
  parentScreen: string;
  timePeriod: TimePeriodKey;
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const NutrientsScreen = ({navigation, route}) => {
  const {selectMeal, parentScreen, timePeriod} = route.params as Params;
  const userId = useRecoilValue(userIdState);
  const [intake, setIntake] = useState(selectMeal.intake || 100);
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);

  return (
    <>
      {parentScreen !== 'PfcPieChart' ? (
        <>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              margin: 20,
            }}>
            <View style={{flexDirection: 'row'}}>
              <TextInput
                keyboardType="numeric"
                style={{
                  borderWidth: 1,
                  borderColor: 'black',
                  borderRadius: 10,
                  padding: 10,
                  minWidth: 130,
                }}
                onChangeText={(v) => {
                  setIntake(String(v));
                }}
                maxLength={10}
                value={String(intake)}
                placeholder="摂取量(g)"
                clearButtonMode="always"
                defaultValue={String(intake)}
              />
              <Text
                style={{marginVertical: 8, marginHorizontal: 5, fontSize: 18}}>
                g
              </Text>
            </View>
            <View style={{paddingTop: 4}}>
              <Button
                title="この量で登録"
                onPress={() => {
                  setActionMeal(
                    parentScreen === 'SearchMeals'
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
                  if (parentScreen === 'SearchMeals') {
                    navigation.goBack();
                    navigation.goBack();
                  }
                  if (parentScreen === 'MealsScreen') {
                    navigation.goBack();
                  }
                }}
              />
            </View>
          </View>

          <Divider>{`${Number(intake)}g あたりの栄養素`}</Divider>
        </>
      ) : (
        <TitleText title="栄養素の合計" />
      )}
      <NutrientsList selectMeal={selectMeal} intake={intake} />
    </>
  );
};

const styles = StyleSheet.create({});

export default NutrientsScreen;
