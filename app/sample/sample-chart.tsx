import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';

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

type Props = {
  healthArr: {
    startDate: string;
    value: number;
  }[];
};

const SampleChart = (props: Props) => {
  const [data, setData] = useState<{startDate: string; value: number}[]>([]);
  const [unitSig, setUnitSig] = useState<string>();
  const [formatNum, setFormatNum] = useState<number>(0);

  useEffect(() => {
    if (props.healthArr) {
      console.log(props.healthArr);
      setData(props.healthArr.slice(0, 7).reverse());
    }
  }, [props.healthArr]);

  useEffect(() => {
    if (data.length > 0) {
      console.log(data[0], 'SampleChart');

      const checkNum = (num: number) => {
        // ex. 60000.0000
        if (String(num).split('.')[0].length > 4) {
          console.log(num, 'k');
          setUnitSig('k');
          setFormatNum(0.001);
          return;
        }
        // ex. 0.3000
        if (String(num).split('.')[0].length === 1) {
          console.log(num, '%');
          setUnitSig('%');
          setFormatNum(100);
          return;
        }
      };
      checkNum(data[0].value);
    }
  }, [data]);

  return (
    <View>
      {data.length > 0 && unitSig && formatNum && (
        <LineChart
          data={{
            labels: data.map((obj) =>
              new Intl.DateTimeFormat('ja-JP', {
                month: 'numeric',
                day: 'numeric',
              }).format(new Date(obj.startDate)),
            ),
            datasets: [
              {
                data: data.map((obj) => obj.value * formatNum),
              },
            ],
          }}
          width={Dimensions.get('window').width} // from react-native
          height={Dimensions.get('window').height * 0.225}
          yAxisSuffix={unitSig}
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default SampleChart;
