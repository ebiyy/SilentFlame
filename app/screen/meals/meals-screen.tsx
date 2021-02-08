import {useNavigation, useRoute} from '@react-navigation/native';
import React, {Fragment, useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  ScrollView,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import {atom, useRecoilState} from 'recoil';
import Divider from '../../components/divider';
import {mealsState} from '../../recoil/meal';
import RegistrationMealCard from './registration-meal-card';

const timePeriod = {
  breakfast: '朝食',
  lunch: '昼食',
  dinner: '夕食',
  snack: '間食',
};

const MealsScreen = () => {
  const navigation = useNavigation();
  const [meals, setMeals] = useRecoilState(mealsState);

  useEffect(() => {
    if (meals.length > 0) {
      console.log('useEffect', meals[0].intake);
    }
  }, [meals]);

  const generateWideBtn = (key: string) => (
    <TouchableHighlight
      style={{width: Dimensions.get('window').width / 4}}
      underlayColor="while"
      onPress={() =>
        navigation.navigate('SearchMeals', {
          setMeals: setMeals,
          timePeriod: key,
        })
      }>
      <View style={Styles.registrationTimePeriodItems}>
        <Text style={{fontSize: 18, fontFamily: 'Hiragino Sans'}}>
          {timePeriod[key]}
        </Text>
      </View>
    </TouchableHighlight>
  );

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 22}}>食品を登録</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 30,
            }}>
            {Object.keys(timePeriod).map((key) => generateWideBtn(key))}
          </View>
          <View style={{margin: 10}}>
            <Text style={{fontSize: 22}}>今日の食品</Text>
          </View>

          {Object.keys(timePeriod).map((key, i) => (
            <Fragment key={i}>
              <Divider borderColor="lightgreen">{timePeriod[key]}</Divider>
              {meals.length > 0 &&
                meals
                  .filter((obj) => obj.timePeriod === key)
                  .map((meal, ii) => (
                    <RegistrationMealCard
                      key={ii}
                      meal={meal}
                      setMeals={setMeals}
                      index={ii}
                    />
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
});

export default MealsScreen;
