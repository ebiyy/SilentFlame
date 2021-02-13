import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountSupplement from '../../components/count-supplement';
import WideBtn from '../../components/wide-button';
import {ComStyles, shadowStyles} from '../../global-style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableHighlight} from 'react-native-gesture-handler';
import RateProgressBar from '../../components/rate-progress-bar';
import {mealsWATERState, waterIntakeState} from '../meals/recoil.meal';
import Ioniconsfrom from 'react-native-vector-icons/Ionicons';
import {useRecoilState} from 'recoil';
import TitleText from '../../components/title-text';
import CardEditIcons from './card-edit-icons';
import WaterCardBodyBtn from './water-card-body-btn';
import {WaterIntak} from '../../helpers/interface';
import TestAdmod from '../../admob';

const MOCK = [
  {supplementName: 'Mega D-3 & MK-7'},
  {supplementName: 'Vitamin A'},
  {supplementName: 'AMINO COMPLETE'},
  {supplementName: 'Ultra Omega-3'},
  {supplementName: 'E-400'},
  {supplementName: 'B-50'},
  {supplementName: 'Magnesium Citrate'},
  {supplementName: 'NO-FlUSH NAIACIN 500MG'},
];

const inputWaterPatten = [
  {name: 'cup-water', label: 250},
  {name: 'bottle-soda-classic', label: 500},
  {name: 'bottle-wine', label: 1000},
];

const registWater = [
  {name: '水道水', image: require('../../assets/img/water_640.jpg')},
];

const WaterScreen = () => {
  const navigation = useNavigation();
  const [waterIntake, setwWterIntake] = useRecoilState(waterIntakeState);
  const [isMinus, setIsMinus] = useState(false);

  return (
    <View style={Styles.screenContainer}>
      <TitleText title="今日の水分" key={1} />
      <View style={Styles.rateBarContainer}>
        <RateProgressBar
          title=""
          rimit={2}
          unit="L"
          color="blue"
          recoilSelector={mealsWATERState}
        />
      </View>

      <TitleText title="水分を登録" key={2} />
      <View style={Styles.waterContentContainer}>
        {registWater.map((obj, i) => (
          <View style={Styles.waterContent} key={i}>
            <View style={Styles.card}>
              <View style={Styles.cardHeader}>
                <View>
                  <Text style={Styles.cardTitle}>{obj.name}</Text>
                </View>
                <View>
                  <CardEditIcons
                    selectItem={obj}
                    index={i}
                    color="lightblue"
                    recoilSelector={waterIntakeState}
                    onPress={() => console.log('test')}
                    isMinus={isMinus}
                    setIsMinus={setIsMinus}
                  />
                </View>
              </View>
              <View style={Styles.cardBody}>
                <View style={Styles.imageContainer}>
                  <Image
                    style={[
                      Styles.imageContext,
                      shadowStyles('lightblue').boxShadow,
                      {shadowColor: 'black', borderColor: 'lightblue'},
                    ]}
                    source={obj.image}
                  />
                </View>
                <View style={{flexDirection: 'column'}}>
                  <View style={Styles.bodyContent}>
                    {inputWaterPatten.map((patten, ii) => (
                      <WaterCardBodyBtn
                        key={ii}
                        patten={patten}
                        waterName={obj.name}
                        isMinus={isMinus}
                      />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={Styles.moreWaterContent}>
          <WideBtn
            navigate={() => navigation.navigate('SupplementForm')}
            btnText="+"
            widthRate={3}
            color="gray"
            type="btn"
          />
        </View>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    // marginTop: 20,
  },
  rateBarContainer: {
    marginBottom: 15,
    marginTop: 0,
  },
  waterContentContainer: {
    // flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // flexWrap: 'wrap',
  },
  waterContent: {},
  moreWaterContent: {},
  card: {
    width: Dimensions.get('window').width / 1.05,
    margin: 3,
    padding: 10,
    borderRadius: 10,
    shadowColor: 'lightblue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    // backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'lightblue',
  },
  cardHeader: {
    // marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  cardTitle: {
    padding: 7,
    fontSize: 20,
    textDecorationLine: 'underline',
    textDecorationColor: 'lightblue',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  imageContainer: {
    justifyContent: 'center',
    marginRight: 10,
  },
  imageContext: {
    width: 100,
    height: 100,
    borderRadius: 20,
  },
  bodyContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default WaterScreen;
