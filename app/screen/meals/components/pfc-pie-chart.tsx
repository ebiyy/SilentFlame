import {NavigationProp, useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import TitleText from '../../../components/title-text';
import {shadowStyles} from '../../../global-style';
import {excludeKeyGroup} from '../function.meal';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  mealsProteinState,
  mealsFatState,
  mealsCHOCDFState,
  mealsCHOAVState,
} from '../recoil.meal';

const sumMeal = (meals: Meal[]) => {
  const nurientKeys = Object.keys(meals[0]).filter(
    (key) => !excludeKeyGroup.includes(key),
  );
  let sumMeal = {};
  nurientKeys.forEach((key) => {
    sumMeal[key] = meals.map((meal) => meal[key]).reduce(mealsReducer);
  });
  sumMeal = {...sumMeal, foodName: '摂取食品の合計', remarks: '', intake: 100};
  console.log(sumMeal);
  return sumMeal;
};

const isparenthesis = (str: string) =>
  str.indexOf('(') > -1 ? str.replace('(', '').replace(')', '') : str;

const mealsReducer = (acc: string, cur: string) => {
  if (['-', 'Tr'].includes(acc) && !['-', 'Tr'].includes(cur)) {
    return isparenthesis(cur);
  } else if (!['-', 'Tr'].includes(acc) && ['-', 'Tr'].includes(cur)) {
    return isparenthesis(acc);
  } else if (['-', 'Tr'].includes(acc) && ['-', 'Tr'].includes(cur)) {
    return '0';
  } else {
    return String(Number(isparenthesis(cur)) + Number(isparenthesis(acc)));
  }
};

const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

type Props = {
  meals: Meal[];
  boxShadow: string;
};

const PfcPieChart = (props: Props) => {
  const navigation = useNavigation();
  const {meals, boxShadow} = props;
  const sumProtein = useRecoilValue(mealsProteinState);
  const sumFat = useRecoilValue(mealsFatState);
  const sumCHOCDF = useRecoilValue(mealsCHOCDFState);
  const sumCHOAV = useRecoilValue(mealsCHOAVState);
  const height = Dimensions.get('window').height * 0.205;
  const [absolute, setAbsolute] = useState(false);

  // ex. キャッサバでん粉の場合 炭水化物 < 糖質当量
  const calCHOCDF = () => {
    if (sumCHOCDF > sumCHOAV) {
      return Number((sumCHOCDF - sumCHOAV).toFixed(1));
    } else {
      return 0;
    }
  };

  // color: https://codepen.io/giana/pen/BoWoQR
  return (
    <View style={{marginTop: windowHeight * 0.01}}>
      <View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TitleText title="栄養の情報" />
          {/* 調整用 */}
          <View style={{width: 80}}></View>
          <TouchableOpacity onPress={() => setAbsolute(!absolute)}>
            <View
              style={[
                styles.switchBtnContainer,
                {height: 35, paddingHorizontal: 14},
                styles.activeBtn,
              ]}>
              <Text style={{fontSize: 11}}>{absolute ? '%' : 'g'}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.switchBtnContainer}>
            <TouchableHighlight
              onPress={() =>
                navigation.navigate('NutrientsScreen', {
                  selectMeal: sumMeal(meals),
                  timePeriod: '',
                  parentScreen: 'PfcPieChart',
                })
              }
              underlayColor="white">
              <View style={[styles.activeBtn, {backgroundColor: 'gray'}]}>
                <Text style={styles.switchText}>
                  <MaterialCommunityIcons name="transition-masked" />
                  {' 詳細'}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
      <View style={[styles.chartContainer, shadowStyles(boxShadow).boxShadow]}>
        <View style={{height: height}}>
          <PieChart
            data={[
              {
                name: absolute ? 'たんぱく質(g)' : 'たんぱく質',
                nutrinet: sumProtein,
                color: '#5eee7d',
                legendFontColor: 'black',
                legendFontSize: 15,
              },
              {
                name: absolute ? '脂質(g)' : '脂質',
                nutrinet: sumFat,
                color: '#86cbf3',
                legendFontColor: 'black',
                legendFontSize: 15,
              },
              {
                name: absolute ? '炭水化物(g)' : '炭水化物',
                nutrinet: calCHOCDF(),
                color: '#f18fc2',
                legendFontColor: 'black',
                legendFontSize: 15,
              },
              {
                name: absolute ? '糖質(g)' : '糖質',
                nutrinet: sumCHOAV,
                color: '#ea4bbc',
                legendFontColor: 'black',
                legendFontSize: 15,
              },
            ]}
            width={Dimensions.get('window').width * 0.9}
            height={Dimensions.get('window').height * 0.205}
            chartConfig={chartConfig}
            paddingLeft="0"
            accessor="nutrinet"
            backgroundColor="transparent"
            avoidFalseZero
            absolute={absolute}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  switchBtnContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
  },
  chartContainer: {
    marginTop: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'lightgreen',
    borderRadius: 10,
  },
  activeBtn: {
    padding: 10,
    marginTop: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 36,
  },
  btnContainer: {
    padding: 10,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: '#fff',
  },
  barContainer: {
    marginHorizontal: 30,
    alignSelf: 'center',
    marginTop: windowHeight * 0.015,
  },
  switchText: {
    fontSize: 13,
    color: 'white',
  },
});

export default PfcPieChart;
