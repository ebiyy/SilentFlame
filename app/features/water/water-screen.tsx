import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {screenThemeColor, shadowStyles} from '../../global/styles';
import {mealsWATERState} from '../meal/recoil.meal';
import {ScrollView} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {
  isWaterCountState,
  isWaterDeleteState,
  isWaterStorageState,
  isWaterToMealState,
  waterCountState,
  watersState,
  waterToMealState,
} from './water.hook';
import {NUTRIENT_KEY} from '../suppli/constant';
import {FadeInView} from '../../components/fade-in-view';
import {RateProgressBar} from '../../components/rate-progress-bar';
import {TitleText} from '../../components/title-text';
import {CardEditIcons} from './card-edit-icons';
import {WaterCardBodyBtn} from './water-card-body-btn';
import {WideBtn} from '../../components/wide-button';
import {
  storage,
  storageLoad,
  storageLoadDateData,
  storageRemove,
} from '../../api/storage.helper';
import {formatShortStrDate, isToday} from '../../api/utils';
import {dateState, editableState} from '../date-manager/data-manager.recoil';

import {WaterWeight} from './water';

const inputWaterPatten = [
  {name: 'cup', label: 120, iconElm: 'SimpleLineIcons'},
  {name: 'cup-water', label: 200, iconElm: 'MaterialCommunityIcons'},
  {name: 'bottle-soda-classic', label: 500, iconElm: 'MaterialCommunityIcons'},
];

const waterImg = require('../../assets/img/water_640.jpg');

export const WaterScreen = () => {
  const navigation = useNavigation();
  const [isMinus, setIsMinus] = useState(false);
  const [waters, setWaters] = useRecoilState(watersState);
  const [count, setCount] = useRecoilState(waterCountState);
  const setWaterToMeal = useRecoilState(waterToMealState)[1];
  const [editable, setEditable] = useRecoilState(editableState);
  const date = useRecoilValue(dateState);
  const isWaterStorage = useRecoilValue(isWaterStorageState);
  const isWaterToMeal = useRecoilValue(isWaterToMealState);
  const isWaterCount = useRecoilValue(isWaterCountState);

  useEffect(() => {
    if (isToday(date)) {
      setEditable(true);
    }
  }, [date]);

  useEffect(() => {
    // console.log('waters', waters);
    // // console.log('waters', waters[0].nutrients);

    // const countIds = Object.keys(count);
    // const waterIds = waters.map((water) => water.id);
    // let isEqual = true;

    // countIds.forEach((id) => {
    //   if (!waterIds.includes(Number(id))) {
    //     isEqual = false;
    //   }
    // });
    // console.log('countIds,waterIds,isEqual', countIds, waterIds, isEqual);
    // if (!isEqual) return;

    if (waters && waters.length > 0 && editable) {
      let waterWeight = {} as WaterWeight;
      Object.entries(count).forEach(([waterId, countObj]) => {
        waterWeight[waterId] = Object.entries(countObj)
          .map(([intakeLabel, countNum]) => Number(intakeLabel) * countNum)
          .reduce((a, x) => a + x);
      });
      // console.log('WaterScreen::waterWeight',waterWeight)
      const countSumNutrients = Object.entries(waterWeight).map(
        ([waterId, waterIntake]) => {
          const currentWater = waters.filter(
            (water) => water.id === Number(waterId),
          )[0];
          const waterName = currentWater.waterName;
          return {
            [waterName]: currentWater.nutrients
              .map((nutrient) => {
                const sum = Number(
                  (
                    (Number(nutrient.amountPerServingValue) * waterIntake) /
                    100
                  ).toFixed(1),
                );
                if (nutrient.nutrientKey) {
                  return {
                    sum,
                    nutrientName: nutrient.nutrientName,
                    amountPerServingUnit: nutrient.amountPerServingUnit,
                    nutrientKey: nutrient.nutrientKey,
                  };
                } else {
                  return undefined;
                }
              })
              .filter((nutrient) => nutrient !== undefined),
          };
        },
      );

      let toMeals: Meal[] = [];
      const isMcg = (str: string) => ['mcg', 'μg'].includes(str);
      countSumNutrients.forEach((sumNutrient, i) => {
        let toMeal = {};
        Object.entries(sumNutrient).forEach(([key, obj]) => {
          obj.forEach((nutrinet) => {
            const nutrientKey = nutrinet.nutrientKey;
            const mealUnit = NUTRIENT_KEY[nutrientKey]?.unit;
            const waterUnit = nutrinet.amountPerServingUnit;

            const format = (object: Object, waterName: string) => {
              if (
                mealUnit === waterUnit ||
                (isMcg(mealUnit) && isMcg(waterUnit))
              ) {
                object[nutrientKey] = nutrinet.sum;
              } else if (isMcg(mealUnit) && waterUnit === 'mg') {
                object[nutrientKey] = nutrinet.sum * Math.pow(10, 3);
              } else if (isMcg(mealUnit) && waterUnit === 'g') {
                object[nutrientKey] = nutrinet.sum * Math.pow(10, 6);
              } else if (mealUnit === 'g' && isMcg(waterUnit)) {
                object[nutrientKey] = nutrinet.sum / Math.pow(10, 6);
              } else if (mealUnit === 'mg' && isMcg(waterUnit)) {
                object[nutrientKey] = nutrinet.sum / Math.pow(10, 3);
              }
              object['foodName'] = waterName;
              object['indexNumber'] = waters[i].id;
              return object;
            };
            toMeal = format(toMeal, key);
          });
        });
        if (Object.entries(toMeal).length > 0) {
          toMeals = [...toMeals, toMeal];
        }
      });

      // if (toMeals.length > 0) {
      setWaterToMeal(toMeals);
      // }
    }
  }, [count, waters]);

  return (
    <ScrollView>
      <View style={Styles.screenContainer}>
        <TitleText title="今日の水分" key={1} />
        <View style={Styles.rateBarContainer}>
          <RateProgressBar
            title=""
            rimit={2}
            unit="L"
            color={screenThemeColor.water}
            recoilSelector={mealsWATERState}
          />
        </View>

        <TitleText title="水分を登録" key={2} />

        <View style={Styles.waterContentContainer}>
          <FadeInView>
            <>
              {waters.length > 0 &&
                // TypeError: Attempted to assign to readonly property.になるのでスプレッドしている

                [...waters]
                  .sort(
                    (a, b) =>
                      new Date(b.updateAt).getTime() -
                      new Date(a.updateAt).getTime(),
                  )
                  .map((obj, i) => (
                    <View style={Styles.waterContent} key={i}>
                      <View style={Styles.card}>
                        <View style={Styles.cardHeader}>
                          <View style={{maxWidth: '55%'}}>
                            <Text style={Styles.cardTitle}>
                              {obj.waterName.length > 13
                                ? `${obj.waterName.slice(0, 13)}...`
                                : obj.waterName}
                            </Text>
                          </View>
                          <View>
                            <CardEditIcons
                              selectItem={obj}
                              index={i}
                              color="lightblue"
                              setWaters={setWaters}
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
                                shadowStyles(screenThemeColor.water).boxShadow,
                              ]}
                              source={
                                obj.waterName === '水道水'
                                  ? waterImg
                                  : {uri: obj.imageRes.uri}
                              }
                            />
                          </View>
                          <View style={{flexDirection: 'column'}}>
                            <View style={Styles.bodyContent}>
                              {inputWaterPatten.map((patten, ii) => (
                                <WaterCardBodyBtn
                                  key={`${obj.waterName}${ii}`} // waterの他のやつとstate共有するための処置
                                  patten={patten}
                                  water={obj}
                                  isMinus={isMinus}
                                  holdCount={count}
                                  setHoldCount={setCount}
                                />
                              ))}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  ))}
            </>
          </FadeInView>
          {editable && (
            <View style={Styles.moreWaterContent}>
              <WideBtn
                navigate={() =>
                  navigation.navigate('SupplFormScreen', {
                    mode: 'add',
                    setMarge: setWaters,
                    btnColor: screenThemeColor.water,
                    viewTarget: {
                      nutrients: [
                        {
                          nutrientName: '水分',
                          amountPerServingValue: '100',
                          amountPerServingUnit: 'g',
                        },
                      ],
                    },
                  })
                }
                btnText="+"
                widthRate={3}
                color="gray"
                type="btn"
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
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
  moreWaterContent: {
    marginTop: 30,
  },
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
    fontSize: 18,
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
