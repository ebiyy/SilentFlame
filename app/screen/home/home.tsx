import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Button,
  useWindowDimensions,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getBodyFatPercentage,
  getLeanBodyMass,
  getWeight,
} from '../../helpers/apple-heath-kit';
import SampleChart from '../../sample/sample-chart';
import * as Progress from 'react-native-progress';
import SampleChartBar from '../../sample/sample-chart-bar';

export interface HealthArr {
  startDate: string;
  value: number;
}

const ViewType = {
  weight: '体重',
  fatPercentage: '体脂肪',
  leanBodyMass: '除脂肪体重',
};

const generateBtn = (
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  type: typeof ViewType[keyof typeof ViewType],
) => {
  return (
    <View style={state === type ? styles.activeBtn : styles.btnContainer}>
      <Button
        color={state === type ? 'black' : '#fff'}
        title={type}
        onPress={() => setState(type)}
      />
    </View>
  );
};

const HomeScreen = ({navigation, route}) => {
  const [weightArr, setWeightArr] = useState<HealthArr[]>();
  const [fatPercentageArr, setFatPercentageArr] = useState<HealthArr[]>();
  const [leanBodyMassArr, setLeanBodyMassArr] = useState<HealthArr[]>();
  const [switchView, setSwitchView] = useState<
    typeof ViewType[keyof typeof ViewType]
  >(ViewType.weight);

  useEffect(() => {
    getWeight(setWeightArr);
    getBodyFatPercentage(setFatPercentageArr);
    getLeanBodyMass(setLeanBodyMassArr);
  }, []);

  return (
    <ScrollView>
      <View style={{marginTop: Dimensions.get('window').height * 0.05}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            {generateBtn(switchView, setSwitchView, ViewType.weight)}
            {generateBtn(switchView, setSwitchView, ViewType.fatPercentage)}
            {generateBtn(switchView, setSwitchView, ViewType.leanBodyMass)}
          </View>
        </View>
        <SampleChart
          healthArr={
            (switchView === ViewType.weight && weightArr) ||
            (switchView === ViewType.fatPercentage && fatPercentageArr) ||
            (switchView === ViewType.leanBodyMass && leanBodyMassArr)
          }
        />
      </View>
      <View style={{marginTop: 30}}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.btnContainer}>
              <Button
                color="#fff"
                title="簡易"
                onPress={() => console.log('簡易')}
              />
            </View>
            <View style={styles.btnContainer}>
              <Button
                color="#fff"
                title="詳細"
                onPress={() => console.log('詳細')}
              />
            </View>
          </View>
        </View>
        <SampleChartBar />
      </View>
      <View style={{margin: 30, alignSelf: 'center'}}>
        <Text style={{margin: 10, fontSize: 18}}>水分</Text>
        <Progress.Bar
          // style={{}}
          progress={0.3}
          width={Dimensions.get('window').width * 0.8}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnContainer: {
    backgroundColor: 'gray',
    borderWidth: 1,
    borderColor: '#fff',
  },
  activeBtn: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
  },
});

export default HomeScreen;
