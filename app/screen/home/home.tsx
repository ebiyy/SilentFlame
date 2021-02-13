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
import {ComStyles} from '../../global-style';
import {mealsENERC_KCALState, mealsWATERState} from '../meals/recoil.meal';
import RateProgressBar from '../../components/rate-progress-bar';
import TitleText from '../../components/title-text';
import SampleChartPie from '../../sample/sample-chart-pie';
import {ScrollView} from 'react-native-gesture-handler';
import FadeInView from '../../components/fade-in-view';

export interface HealthArr {
  startDate: string;
  value: number;
}

type BodyViewType = '体重' | '体脂肪' | '除脂肪体重';

interface BodyView {
  [x: string]: BodyViewType;
  weight: BodyViewType;
  fatPercentage: BodyViewType;
  leanBodyMass: BodyViewType;
}

const bodyViewType: BodyView = {
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
  setState: React.Dispatch<React.SetStateAction<BodyViewType>>,
  type: BodyViewType,
  i: number,
) => {
  return (
    <TouchableHighlight
      key={i}
      onPress={() => setState(type)}
      underlayColor="white">
      <View style={state === type ? styles.activeBtn : styles.btnContainer}>
        <Text
          style={[
            styles.switchText,
            {color: state === type ? 'black' : 'white'},
            type === NutrientViewType.simple && {fontSize: 10},
          ]}>
          {type}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const windowHeight = Dimensions.get('window').height;
// const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const [weightArr, setWeightArr] = useState<HealthArr[]>();
  const [fatPercentageArr, setFatPercentageArr] = useState<HealthArr[]>();
  const [leanBodyMassArr, setLeanBodyMassArr] = useState<HealthArr[]>();
  const [switchBodyChartView, setSwitchBodyChartView] = useState<BodyViewType>(
    bodyViewType.weight,
  );
  const [switchNutrientChartView, setSwitchNutrientChartView] = useState(
    NutrientViewType.simple,
  );

  const setChatData = (state: '体重' | '体脂肪' | '除脂肪体重') => {
    switch (state) {
      case '体重':
        return weightArr;
      case '体脂肪':
        return fatPercentageArr;
      case '除脂肪体重':
        return leanBodyMassArr;
    }
  };

  useEffect(() => {
    getPermissions();
    getWeight(setWeightArr);
    getBodyFatPercentage(setFatPercentageArr);
    getLeanBodyMass(setLeanBodyMassArr);
    // console.log(Dimensions.get('window').height);
    // height
    // 6s, 7, SE: 667
    // 11: 667
    // X: 812
  }, []);

  return (
    <FadeInView>
      <ScrollView scrollEnabled={Dimensions.get('window').height < 800}>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TitleText title="減量の状況" />
            <View style={[styles.switchBtnContainer, {height: 40}]}>
              {Object.keys(bodyViewType).map((key, i) =>
                generateSwitchBtn(
                  switchBodyChartView,
                  setSwitchBodyChartView,
                  bodyViewType[key],
                  i,
                ),
              )}
            </View>
          </View>

          <View style={[styles.chartContainer, ComStyles.greenBoxShadow]}>
            <SampleChart healthArr={setChatData(switchBodyChartView)} />
          </View>
        </View>
        <View style={{marginTop: windowHeight * 0.01}}>
          <View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TitleText title="栄養の情報" />
              <View style={[styles.switchBtnContainer, {height: 40}]}>
                {Object.keys(NutrientViewType).map((key, i) =>
                  generateSwitchBtn(
                    switchNutrientChartView,
                    setSwitchNutrientChartView,
                    NutrientViewType[key],
                    i,
                  ),
                )}
              </View>
            </View>
          </View>
          <View style={[styles.chartContainer, ComStyles.greenBoxShadow]}>
            <SampleChartPie />
          </View>
        </View>
        <View>
          <View style={styles.progressBarContainer}>
            <RateProgressBar
              title="今日のカロリー"
              rimit={2200}
              unit="kcal"
              color="red"
              recoilSelector={mealsENERC_KCALState}
            />
          </View>
          <View style={styles.progressBarContainer}>
            <RateProgressBar
              title="今日の水分"
              rimit={2}
              unit="L"
              color="blue"
              recoilSelector={mealsWATERState}
            />
          </View>
        </View>
      </ScrollView>
    </FadeInView>
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
    marginTop: windowHeight * 0.015,
  },
  switchText: {
    fontSize: 13,
  },
  progressBarContainer: {
    marginTop: windowHeight * 0.03,
  },
});

export default HomeScreen;
