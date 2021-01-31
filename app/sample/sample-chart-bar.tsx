import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {BarChart} from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const SampleChartBar = () => {
  return (
    <View>
      <BarChart
        data={{
          labels: ['たんぱく質', '脂質', '炭水化物', '糖質'],
          datasets: [
            {
              data: [24, 56, 24, 24],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
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
    borderRadius: 16,
  },
});

export default SampleChartBar;
