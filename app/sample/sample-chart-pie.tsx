import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BarChart, PieChart} from 'react-native-chart-kit';
import {useRecoilValue} from 'recoil';
import {
  mealsCHOAVState,
  mealsCHOCDFState,
  mealsFatState,
  mealsProteinState,
} from '../recoil/meal';

const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const SampleChartPie = () => {
  const sumProtein = useRecoilValue(mealsProteinState);
  const sumFat = useRecoilValue(mealsFatState);
  const sumCHOCDF = useRecoilValue(mealsCHOCDFState);
  const sumCHOAV = useRecoilValue(mealsCHOAVState);

  // color: https://codepen.io/giana/pen/BoWoQR
  return (
    <View>
      <PieChart
        data={[
          {
            name: 'たんぱく質',
            nutrinet: sumProtein,
            color: '#5eee7d',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: '脂質',
            nutrinet: sumFat,
            color: '#86cbf3',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: '炭水化物',
            nutrinet: Number((sumCHOCDF - sumCHOAV).toFixed(1)),
            color: '#f18fc2',
            legendFontColor: '#7F7F7F',
            legendFontSize: 15,
          },
          {
            name: '炭水化物(糖質)',
            nutrinet: sumCHOAV,
            color: '#ea4bbc',
            legendFontColor: '#7F7F7F',
            legendFontSize: 13,
          },
        ]}
        width={Dimensions.get('window').width * 0.9}
        height={Dimensions.get('window').height * 0.205}
        chartConfig={chartConfig}
        paddingLeft="0"
        accessor="nutrinet"
        backgroundColor="transparent"
        avoidFalseZero
        // absolute
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    // borderRadius: 16,
  },
});

export default SampleChartPie;
