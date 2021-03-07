import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {screenThemeColor, shadowStyles} from '../../global/styles';
import {getLossQuantityData} from './apple-heath-kit';
import {HealthData} from './apple-health-kit';
import {lossQuantityView} from './constants';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {LossQuantityChart} from './loss-quantity-chart';
import {TitleText} from '../../components/title-text';
import {SampleBaner} from '../../components/sample-baner';

type SwitchBtnProps = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<LossQuantityViewValue>>;
  type: LossQuantityViewValue;
};

const SwitchBtn = ({state, setState, type}: SwitchBtnProps) => {
  return (
    <TouchableOpacity onPress={() => setState(type)}>
      <View style={state === type ? styles.activeBtn : styles.btnContainer}>
        <Text
          style={[
            styles.switchText,
            state === type ? styles.textBlack : styles.textWhite,
          ]}>
          {type}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const LossQuantityController = () => {
  const [weightData, setWeightData] = useState<HealthData[]>();
  const [bodyFatData, setBodyFatData] = useState<HealthData[]>();
  const [leanBodyMassData, setLeanBodyMassData] = useState<HealthData[]>();
  const [viewType, setViewType] = useState<LossQuantityViewValue>(
    lossQuantityView.weight,
  );

  const viewData = (type: LossQuantityViewValue) => {
    switch (type) {
      case '体重':
        return weightData;
      case '体脂肪':
        return bodyFatData;
      case '除脂肪体重':
        return leanBodyMassData;
    }
  };

  const isHealthDataMock = () => {
    const mock = weightData?.filter(
      (v) => v.startDate === '2021-01-31T03:54:11.000+0900',
    );
    return mock && mock.length > 0;
  };

  useEffect(() => {
    getLossQuantityData(setWeightData, setBodyFatData, setLeanBodyMassData);
  }, []);

  useEffect(() => {
    console.log('LossQuantityController', weightData);
  }, [weightData]);

  return (
    <View style={isHealthDataMock() ? {position: 'relative'} : {}}>
      <View style={styles.container}>
        <TitleText title="減量の状況" />
        <View style={styles.switchBtnContainer}>
          {Object.keys(lossQuantityView).map((key, i) => (
            <SwitchBtn
              key={i}
              state={viewType}
              setState={setViewType}
              type={lossQuantityView[key as LossQuantityViewKey]}
            />
          ))}
        </View>
      </View>
      <View style={[styles.chartContainer, shadowStyles('black').boxShadow]}>
        <LossQuantityChart healthData={viewData(viewType)} />
      </View>
      {isHealthDataMock() && <SampleBaner type="top" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  switchBtnContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'flex-end',
    height: 40,
  },
  chartContainer: {
    // marginTop: 2,
    marginHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: screenThemeColor.meals,
    borderRadius: 10,
  },
  btnContainer: {
    padding: 10,
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: '#fff',
  },
  activeBtn: {
    padding: 10,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
  switchText: {
    fontSize: 13,
  },
  textBlack: {
    color: 'black',
  },
  textWhite: {
    color: 'white',
  },
});
