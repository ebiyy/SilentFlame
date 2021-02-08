import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {useRecoilValue} from 'recoil';
import {
  mealsCHOAVState,
  mealsCHOCDFState,
  mealsFatState,
  mealsProteinState,
} from '../recoil/meal';

const chartConfig = {
  backgroundGradientFrom: 'white',
  backgroundGradientTo: 'white',
  decimalPlaces: 1, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#90EE90',
  },
};

const SampleChartBar = () => {
  const sumProtein = useRecoilValue(mealsProteinState);
  const sumFat = useRecoilValue(mealsFatState);
  const sumCHOCDFS = useRecoilValue(mealsCHOCDFState);
  const sumCHOAV = useRecoilValue(mealsCHOAVState);

  return (
    <View>
      <BarChart
        data={{
          labels: ['たんぱく質', '脂質', '炭水化物', '糖質'],
          datasets: [
            {
              data: [sumProtein, sumFat, sumCHOCDFS, sumCHOAV],
            },
          ],
        }}
        width={Dimensions.get('window').width * 0.9} // from react-native
        height={Dimensions.get('window').height * 0.225}
        yAxisLabel=""
        yAxisSuffix="g"
        fromZero={true}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        style={styles.chart}
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

export default SampleChartBar;
