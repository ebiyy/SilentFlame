import {useNavigation} from '@react-navigation/native';
import React, {Fragment} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Divider from '../../components/divider';
import RateProgressBar from '../../components/rate-progress-bar';
import TitleText from '../../components/title-text';
import {mealsENERC_KCALState} from './recoil.meal';
import RegistrationMealCard from './registration-meal-card';
import FadeInView from '../../components/fade-in-view';
import {useMargeMealState} from './hook.meal';
import PfcPieChart from './components/pfc-pie-chart';
import WideBtn, {generateWideBtn} from '../../components/wide-btn';
import {screenThemeColor} from '../../global-style';

const timePeriod: TimePeriod = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
};

const MealsScreen = () => {
  const navigation = useNavigation();
  const meals = useMargeMealState();

  // useEffect(() => {
  //   console.log('MealsScreen', meals);
  // }, [meals]);

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

          {meals && meals.length > 0 && (
            <FadeInView>
              <PfcPieChart meals={meals} boxShadow={screenThemeColor.meals} />
            </FadeInView>
          )}

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

export default MealsScreen;
