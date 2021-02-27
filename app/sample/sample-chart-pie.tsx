import React, {useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {PieChart} from 'react-native-chart-kit';
import {useRecoilValue} from 'recoil';
import {
  mealsCHOAVState,
  mealsCHOCDFState,
  mealsFatState,
  mealsProteinState,
} from '../features/meal/recoil.meal';

const chartConfig = {
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(144, 238, 144, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

type Props = {
  absolute: boolean;
};

export const SampleChartPie = (props: Props) => {
  const {absolute} = props;
  const sumProtein = useRecoilValue(mealsProteinState);
  const sumFat = useRecoilValue(mealsFatState);
  const sumCHOCDF = useRecoilValue(mealsCHOCDFState);
  const sumCHOAV = useRecoilValue(mealsCHOAVState);
  const height = Dimensions.get('window').height * 0.205;

  useEffect(() => {
    // console.log('--------SampleChartPie---------');
    // console.log('sumProtein', sumProtein);
    // console.log('sumFat', sumFat);
    // console.log('sumCHOCDF', sumCHOCDF);
    // console.log('sumCHOAV', sumCHOAV);
    // console.log('--------SampleChartPie---------');
  }, []);

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
    <View style={{height: height}}>
      <PieChart
        data={[
          {
            name: 'g  たんぱく質',
            nutrinet: sumProtein,
            color: '#5eee7d',
            legendFontColor: 'black',
            legendFontSize: 15,
          },
          {
            name: '脂質',
            nutrinet: sumFat,
            color: '#86cbf3',
            legendFontColor: 'black',
            legendFontSize: 15,
          },
          {
            name: '炭水化物',
            nutrinet: calCHOCDF(),
            color: '#f18fc2',
            legendFontColor: 'black',
            legendFontSize: 15,
          },
          {
            name: '糖質',
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
  );
};
