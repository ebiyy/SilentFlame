import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {
  screenThemeColor,
  shadowStyles,
  winHeight,
  winWidth,
} from '../global/styles';
import {
  mealsProteinState,
  mealsFatState,
  mealsCHOCDFState,
  mealsCHOAVState,
} from '../features/meal/recoil.meal';
import {TitleText} from './title-text';
import {pfcPieCharConfig} from './constants';
import {sumMeal} from './functions';
import {MCi} from './common/icons';
import {suppliToMealState} from '../features/suppli/suppli.hook';
import {waterToMealState} from '../features/water/water.hook';
import {isAndroid} from '@freakycoder/react-native-helpers';

type Props = {
  meals?: Meal[];
  boxShadow: string;
  weekData?: Meal;
};

export const PfcPieChart = (props: Props) => {
  const navigation = useNavigation();
  const {meals, boxShadow, weekData} = props;
  const sumProtein = useRecoilValue(mealsProteinState);
  const sumFat = useRecoilValue(mealsFatState);
  const sumCHOCDF = useRecoilValue(mealsCHOCDFState);
  const sumCHOAV = useRecoilValue(mealsCHOAVState);
  const height = winHeight * (isAndroid ? 0.28 : 0.205);
  const [isWeight, setIsWeight] = useState(false);
  const suppliToMeal = useRecoilValue(suppliToMealState);
  const waterToMeal = useRecoilValue(waterToMealState);

  // ex. キャッサバでん粉の場合 炭水化物 < 糖質当量
  const calCHOCDF = () => {
    if (sumCHOCDF > sumCHOAV) {
      return Number((sumCHOCDF - sumCHOAV).toFixed(1));
    } else {
      return 0;
    }
  };

  const calWeekCHOCDF = (week: Meal) => {
    const CHOCDF = Number(week.CHOCDF);
    const CHOAV = Number(week.CHOAVLM);
    if (CHOCDF > CHOAV) {
      return CHOCDF - CHOAV;
    } else {
      return 0;
    }
  };

  // color: https://codepen.io/giana/pen/BoWoQR
  return (
    <View style={styles.container}>
      <View>
        <View style={styles.switchBtnContainer}>
          <TitleText title="栄養の情報" />
          {/* 調整用 */}
          <View style={styles.unitSwitchContainer}>
            <TouchableOpacity onPress={() => setIsWeight(!isWeight)}>
              <View style={[styles.btn]}>
                <Text style={styles.unitSwitchText}>
                  {isWeight ? '%' : 'g'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.transitionDetailBtnContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('NutrientsScreen', {
                  selectMeal: meals
                    ? sumMeal(
                        [].concat(
                          meals,
                          Object.values(suppliToMeal),
                          waterToMeal,
                        ),
                      )
                    : weekData && weekData,
                  timePeriod: '',
                  parentScreen: 'PfcPieChart',
                })
              }>
              <View style={[styles.btn, styles.transitionDetailBtn]}>
                <Text style={styles.transitionDetailText}>
                  {MCi('transition-masked', 'white', 13)}
                  {' 詳細'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={[styles.chartContainer, shadowStyles(boxShadow).boxShadow]}>
        <View style={{height: height}}>
          <PieChart
            data={[
              {
                name: isWeight ? 'たんぱく質(g)' : 'たんぱく質',
                nutrinet: meals
                  ? sumProtein
                  : weekData && Number(weekData.PROT),
                color: '#5eee7d',
                legendFontColor: 'black',
                legendFontSize: isAndroid ? 16 : 15,
              },
              {
                name: isWeight ? '脂質(g)' : '脂質',
                nutrinet: meals ? sumFat : weekData && Number(weekData.FAT),
                color: '#86cbf3',
                legendFontColor: 'black',
                legendFontSize: isAndroid ? 16 : 15,
              },
              {
                name: isWeight ? '炭水化物(g)' : '炭水化物',
                nutrinet: meals
                  ? calCHOCDF()
                  : weekData && calWeekCHOCDF(weekData),
                color: '#f18fc2',
                legendFontColor: 'black',
                legendFontSize: isAndroid ? 16 : 15,
              },
              {
                name: isWeight ? '糖質(g)' : '糖質',
                nutrinet: meals
                  ? sumCHOAV
                  : weekData && Number(weekData.CHOAVLM),
                color: '#ea4bbc',
                legendFontColor: 'black',
                legendFontSize: isAndroid ? 16 : 15,
              },
            ]}
            width={winWidth * 0.9}
            height={height}
            chartConfig={pfcPieCharConfig}
            paddingLeft="0"
            accessor="nutrinet"
            backgroundColor="transparent"
            avoidFalseZero
            absolute={isWeight}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: winHeight * 0.01,
  },
  unitSwitchContainer: {
    marginLeft: 80,
  },
  switchBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  unitSwitchText: {
    fontSize: 11,
  },
  transitionDetailBtnContainer: {
    marginHorizontal: 10,
  },
  transitionDetailBtn: {
    backgroundColor: 'gray',
  },
  btn: {
    padding: 10,
    marginTop: 3,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    height: 36,
  },
  transitionDetailText: {
    fontSize: 13,
    color: 'white',
  },
  chartContainer: {
    marginTop: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: screenThemeColor.meals,
    borderRadius: 10,
  },
});
