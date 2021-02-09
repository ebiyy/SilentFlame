import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CountSupplement from '../../components/count-supplement';
import WideBtn from '../../components/wide-button';
import {ComStyles} from '../../global-style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableHighlight} from 'react-native-gesture-handler';
import RateProgressBar from '../../components/rate-progress-bar';
import {mealsWATERState, waterIntakeState} from '../../recoil/meal';
import Ioniconsfrom from 'react-native-vector-icons/Ionicons';
import {useRecoilState} from 'recoil';

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

  return (
    <View style={Styles.screenContainer}>
      <View style={Styles.rateBarContainer}>
        <RateProgressBar
          title="今日の水分"
          rimit={2}
          unit="L"
          color="blue"
          recoilSelector={mealsWATERState}
        />
      </View>

      <View style={Styles.waterContentContainer}>
        {registWater.map((obj, i) => (
          <View style={Styles.waterContent}>
            <WideBtn
              navigate={() => {}}
              widthRate={1.25}
              color="white"
              type="card">
              <View style={Styles.card}>
                <View style={Styles.cardHeader}>
                  <Text style={Styles.cardTitle}>{obj.name}</Text>
                </View>
                <View style={Styles.cardBody}>
                  <View style={Styles.imageContainer}>
                    <Image
                      style={[
                        Styles.imageContext,
                        ComStyles.greenBoxShadow,
                        {shadowColor: 'black', borderColor: '#ddd'},
                      ]}
                      source={obj.image}
                    />
                  </View>
                  <View style={{flexDirection: 'column'}}>
                    {inputWaterPatten.map((patten) => (
                      <View style={Styles.bodyContent}>
                        <View style={Styles.iconBtnConatiner}>
                          <TouchableHighlight
                            underlayColor="white"
                            onPress={() =>
                              setwWterIntake((preState) => [
                                ...preState,
                                {name: obj.name, intake: patten.label},
                              ])
                            }>
                            <View
                              style={[
                                Styles.iconContext,
                                ComStyles.greenBoxShadow,
                              ]}>
                              <View style={Styles.iconContainer}>
                                <MaterialCommunityIcons
                                  size={20}
                                  name={patten.name}
                                  color="lightblue"
                                />
                              </View>
                              <View style={Styles.labelContainer}>
                                <Text style={Styles.labelText}>
                                  {patten.label}ml
                                </Text>
                              </View>
                            </View>
                          </TouchableHighlight>
                        </View>
                        <View style={[Styles.badgeContainer]}>
                          <TouchableHighlight
                            underlayColor="white"
                            onPress={() =>
                              setwWterIntake((preState) => {
                                let t = 0;
                                const temp = [...preState]
                                  .map((ooo) => {
                                    if (ooo.intake === patten.label) {
                                      if (t === 0) {
                                        t++;
                                        return '';
                                      }
                                      return ooo;
                                    } else {
                                      return ooo;
                                    }
                                  })
                                  .filter((o1) => typeof o1 === 'object');
                                return temp;
                              })
                            }>
                            <View style={Styles.badgeContent}>
                              <Ioniconsfrom
                                style={Styles.badgeIcon}
                                name="water-outline"
                                color="lightblue"
                                size={35}>
                                <View style={Styles.badgeTextContainer}>
                                  <Text style={Styles.badgeText}>
                                    {
                                      waterIntake
                                        .filter((o) => o.name === obj.name)
                                        .filter(
                                          (oo) => oo.intake === patten.label,
                                        ).length
                                    }
                                  </Text>
                                </View>
                              </Ioniconsfrom>
                            </View>
                          </TouchableHighlight>
                        </View>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </WideBtn>
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
    marginTop: 20,
  },
  rateBarContainer: {
    margin: 30,
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
  card: {},
  cardHeader: {
    // marginLeft: 15,
    margin: 5,
  },
  cardTitle: {
    fontSize: 17,
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
    marginHorizontal: 10,
  },
  iconBtnConatiner: {
    marginHorizontal: 5,
  },
  iconContext: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
    margin: 3,
    borderRadius: 5,
  },
  iconContainer: {},
  labelContainer: {},
  labelText: {
    color: 'gray',
    fontSize: 13,
    lineHeight: 20,
  },
  badgeContainer: {
    marginLeft: 5,
    shadowColor: 'lightblue',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 1,
  },
  badgeContent: {
    position: 'relative',
  },
  badgeIcon: {},
  badgeTextContainer: {},
  badgeText: {
    position: 'absolute',
    top: -23,
    right: 14,
    color: 'gray',
    fontSize: 12,
  },
});

export default WaterScreen;
