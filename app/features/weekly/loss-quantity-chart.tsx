import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {formatJpMonthDay} from '../../api/utils';
import {winWidth} from '../../global/styles';
import {chartConfig} from './constants';

type Props = {
  healthData?: HealthData[];
};
const HEIGHT = 160;
export const LossQuantityChart = (props: Props) => {
  const {healthData} = props;
  const [data, setData] = useState<HealthData[]>([]);
  const [unitSig, setUnitSig] = useState<string>();
  const [formatNum, setFormatNum] = useState<number>(0);

  useEffect(() => {
    if (healthData) {
      // 過去から表示させるため配列順並び替え
      const reverseData = [...healthData].reverse();
      let hData: HealthData[] = [];
      let date: string;
      reverseData.forEach((obj) => {
        if (!date) {
          date = obj.startDate.slice(0, 10);
          hData = [obj];
        } else {
          if (date !== obj.startDate.slice(0, 10)) {
            date = obj.startDate.slice(0, 10);
            hData = [...hData, obj];
          }
        }
      });
      setData(hData.reverse().slice(0, 7).reverse());
    }
  }, [healthData]);

  useEffect(() => {
    if (data.length > 0) {
      const checkNum = (num: number) => {
        // ex. 60000.0000
        if (String(num).split('.')[0].length > 4) {
          setUnitSig('kg');
          setFormatNum(0.001);
          return;
        }
        // ex. 0.3000
        if (String(num).split('.')[0].length === 1) {
          setUnitSig('%');
          setFormatNum(100);
          return;
        }
      };
      checkNum(data[0].value);
    }
  }, [data]);

  return (
    <View style={{height: HEIGHT + 20}}>
      {data.length > 0 && unitSig && formatNum && (
        <LineChart
          data={{
            labels: data.map((obj) => formatJpMonthDay(obj.startDate)),
            datasets: [
              {
                data: data.map((obj) => obj.value * formatNum),
              },
            ],
          }}
          width={winWidth * 0.92}
          height={HEIGHT}
          yAxisSuffix={unitSig}
          yAxisInterval={1}
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
    marginHorizontal: 8,
  },
});
