import React, {Fragment, useEffect, useState} from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  isMealsStorageState,
  mealsENERC_KCALState,
  mealsState,
} from './recoil.meal';
// import {useMargeMealState} from './hook.meal';
import {screenThemeColor} from '../../global/styles';
import {useRecoilState, useRecoilValue} from 'recoil';
import {suppliToMealState} from '../suppli/suppli.hook';
import {Divider} from '../../components/divider';
import {FadeInView} from '../../components/fade-in-view';
import {RateProgressBar} from '../../components/rate-progress-bar';
import {TitleText} from '../../components/title-text';
import {WideBtn} from '../../components/common/wide-btn';
import {PfcPieChart} from '../../components/pfc-pie-chart';
import {RegistrationMealCard} from './registration-meal-card';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {isToday} from '../../api/utils';

const timePeriod: TimePeriod = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
};

export const MealsScreen = () => {
  const suppliToMeal = useRecoilValue(suppliToMealState);
  const meals = useRecoilValue(mealsState);
  const isMealsStorage = useRecoilValue(isMealsStorageState);
  const [editable, setEditable] = useRecoilState(editableState);
  const date = useRecoilValue(dateState);

  useEffect(() => {
    if (isToday(date)) {
      setEditable(true);
    }
  }, [date]);

  // useEffect(() => {
  //   console.log('MealsScreen::suppliToMeal', suppliToMeal);
  // }, [suppliToMeal]);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <TitleText title="今日のカロリー" />
          <View style={{marginBottom: 15}}>
            <RateProgressBar
              title=""
              rimit={2200}
              unit="kcal"
              color="#FF6E6B"
              recoilSelector={mealsENERC_KCALState}
            />
          </View>

          {((meals && meals.length > 0) ||
            Object.entries(suppliToMeal).length > 0) && (
            <FadeInView>
              <PfcPieChart meals={meals} boxShadow={screenThemeColor.meals} />
            </FadeInView>
          )}

          {editable && (
            <>
              <TitleText title="食品を登録" />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                {Object.keys(timePeriod).map((key, i) => (
                  <WideBtn
                    key={i}
                    btnText={timePeriod[key]}
                    toNavigate="MealsSearchScreen"
                    navigatePrames={{
                      timePeriod: key,
                    }}
                    wideRate={4}
                  />
                ))}
              </View>
            </>
          )}

          <TitleText title="今日の食品" />
          {Object.keys(timePeriod).map((key, i) => (
            <Fragment key={i}>
              <Divider borderColor={screenThemeColor.meals} index={i}>
                {timePeriod[key]}
              </Divider>
              {meals && meals.length > 0 && (
                <FadeInView>
                  {meals
                    .filter((obj) => obj.timePeriod === key)
                    .map((meal, ii) => (
                      <RegistrationMealCard key={ii} meal={meal} />
                    ))}
                </FadeInView>
              )}
            </Fragment>
          ))}
          <View style={{height: 100}}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({});
