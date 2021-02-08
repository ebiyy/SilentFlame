import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import {
  getBodyFatPercentage,
  getLeanBodyMass,
  getPermissions,
  getWeight,
} from '../../helpers/apple-heath-kit';
import SampleChart from '../../sample/sample-chart';
import * as Progress from 'react-native-progress';
import SampleChartBar from '../../sample/sample-chart-bar';
import {ComStyles} from '../../global-style';

export interface HealthArr {
  startDate: string;
  value: number;
}

const BodyViewType = {
  weight: '体重',
  fatPercentage: '体脂肪',
  leanBodyMass: '除脂肪体重',
};

const NutrientViewType = {
  simple: 'PFC',
  detail: '詳細',
};

const generateSwitchBtn = (
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  type: string,
) => {
  return (
    <TouchableHighlight onPress={() => setState(type)}>
      <View style={state === type ? styles.activeBtn : styles.btnContainer}>
        <Text
          style={[
            styles.switchText,
            state === type ? {color: 'black'} : {color: 'white'},
            type === NutrientViewType.simple && {fontSize: 10},
          ]}>
          {type}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = ({navigation, route}) => {
  const [weightArr, setWeightArr] = useState<HealthArr[]>();
  const [fatPercentageArr, setFatPercentageArr] = useState<HealthArr[]>();
  const [leanBodyMassArr, setLeanBodyMassArr] = useState<HealthArr[]>();
  const [switchBodyChartView, setSwitchBodyChartView] = useState(
    BodyViewType.weight,
  );
  const [switchNutrientChartView, setSwitchNutrientChartView] = useState(
    NutrientViewType.simple,
  );

  useEffect(() => {
    getPermissions();
    getWeight(setWeightArr);
    getBodyFatPercentage(setFatPercentageArr);
    getLeanBodyMass(setLeanBodyMassArr);
  }, []);

  return (
    <>
      <View>
        <View style={styles.switchBtnContainer}>
          {Object.keys(BodyViewType).map((key) =>
            generateSwitchBtn(
              switchBodyChartView,
              setSwitchBodyChartView,
              BodyViewType[key],
            ),
          )}
        </View>
        <View style={[styles.chartContainer, ComStyles.greenBoxShadow]}>
          <SampleChart
            healthArr={
              (switchBodyChartView === BodyViewType.weight && weightArr) ||
              (switchBodyChartView === BodyViewType.fatPercentage &&
                fatPercentageArr) ||
              (switchBodyChartView === BodyViewType.leanBodyMass &&
                leanBodyMassArr)
            }
          />
        </View>
      </View>
      <View style={{marginTop: windowHeight * 0.01}}>
        <View>
          <View style={styles.switchBtnContainer}>
            {Object.keys(NutrientViewType).map((key) =>
              generateSwitchBtn(
                switchNutrientChartView,
                setSwitchNutrientChartView,
                NutrientViewType[key],
              ),
            )}
          </View>
        </View>
        <View style={[styles.chartContainer, ComStyles.greenBoxShadow]}>
          <SampleChartBar />
        </View>
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barTextContainer}>
          <Text style={styles.barText}>カロリー</Text>
          <Text style={styles.barText}>600 / 2200 kcal</Text>
        </View>
        <Progress.Bar progress={0.3} color="red" width={windowWidth * 0.8} />
      </View>
      <View style={styles.barContainer}>
        <View style={styles.barTextContainer}>
          <Text style={styles.barText}>水分</Text>
          <Text style={styles.barText}>1.5 / 2 L</Text>
        </View>
        <Progress.Bar progress={0.3} width={windowWidth * 0.8} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  barContainer: {
    marginHorizontal: 30,
    alignSelf: 'center',
    marginTop: windowHeight * 0.025,
  },
  barTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barText: {
    marginTop: 10,
    marginHorizontal: 10,
    marginBottom: 2,
    fontSize: 15,
  },
  switchText: {
    fontSize: 13,
  },
});

export default HomeScreen;
