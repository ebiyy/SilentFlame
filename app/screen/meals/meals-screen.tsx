import {useNavigation} from '@react-navigation/native';
import React, {Fragment, useEffect} from 'react';
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
import {useRecoilState, useRecoilValue} from 'recoil';
import Divider from '../../components/divider';
import RateProgressBar from '../../components/rate-progress-bar';
import TitleText from '../../components/title-text';
import {ComStyles} from '../../global-style';
import {mealsENERC_KCALState, mealsState} from '../../recoil/meal';
import {userIdState} from '../../recoil/user';
import SampleChartPie from '../../sample/sample-chart-pie';
import RegistrationMealCard from './registration-meal-card';
import firestore from '@react-native-firebase/firestore';
import {useCollection} from 'react-firebase-hooks/firestore';

const timePeriod = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
};

const toDay = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})
  .format(new Date())
  .replaceAll('/', '-');

const MealsScreen = () => {
  const navigation = useNavigation();
  const [meals, setMeals] = useRecoilState(mealsState);
  const userId = useRecoilValue(userIdState);
  const [value, loading, error] = useCollection(
    firestore().collection('Meal').doc(userId).collection(toDay),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    },
  );

  useEffect(() => {
    setMeals(value && value.docs.map((meal) => meal.data()));
  }, [value]);

  const generateWideBtn = (key: string, i: number) => (
    <TouchableOpacity
      key={i}
      style={{width: Dimensions.get('window').width / 4}}
      onPress={() =>
        navigation.navigate('SearchMeals', {
          timePeriod: key,
        })
      }>
      <View style={Styles.registrationTimePeriodItems}>
        <Text style={{fontSize: 18, fontFamily: 'Hiragino Sans'}}>
          {timePeriod[key]}
        </Text>
      </View>
    </TouchableOpacity>
  );

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
              color="red"
              recoilSelector={mealsENERC_KCALState}
            />
          </View>

          {meals && meals.length > 0 && (
            <>
              <TitleText title="PFCバランス" />
              <View style={[Styles.chartContainer, ComStyles.greenBoxShadow]}>
                <SampleChartPie />
              </View>
            </>
          )}

          <TitleText title="食品を登録" />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            {Object.keys(timePeriod).map((key, i) => generateWideBtn(key, i))}
          </View>

          <TitleText title="今日の食品" />
          {Object.keys(timePeriod).map((key, i) => (
            <Fragment key={i}>
              <Divider borderColor="lightgreen" index={i}>
                {timePeriod[key]}
              </Divider>
              {meals &&
                meals.length > 0 &&
                meals
                  .filter((obj) => obj.timePeriod === key)
                  .map((meal, ii) => (
                    <RegistrationMealCard key={ii} meal={meal} index={ii} />
                  ))}
            </Fragment>
          ))}
          <View style={{height: 100}}></View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const Styles = StyleSheet.create({
  registrationTimePeriodItems: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 150,
    height: 80,
    borderRadius: 10,
    // backgroundColor: '#ddd',
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
    borderColor: 'lightgreen',
  },
  chartContainer: {
    marginTop: 2,
    marginHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 10,
  },
});

export default MealsScreen;
