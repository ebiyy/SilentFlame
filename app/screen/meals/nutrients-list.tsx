import {CommonActions} from '@react-navigation/native';
import React, {Fragment, useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Divider from '../../components/divider';
import {nutrientRecalculation} from './function';

export const NUTRIENTS_LABEL = {
  foodName: {
    label: '食品名',
  },
  REFUSE: {
    label: '破棄率',
    unit: '%',
  },
  // ENERC: {
  //   label: 'エネルギー',
  //   unit: 'kJ',
  // },
  ENERC_KCAL: {
    label: 'エネルギー',
    unit: 'kcal',
  },
  WATER: {
    label: '水分',
    unit: 'g',
  },
  PROT: {
    label: 'たんぱく質',
    unit: 'g',
    detail: {
      PROTCAA: {
        label: 'アミノ酸組成によるたんぱく質',
        unit: 'g',
      },
    },
  },
  FAT: {
    label: '脂質',
    unit: 'g',
    detail: {
      FATNLEA: {
        label: '脂肪酸のトリアシルグリセロール当量',
        unit: 'g',
      },
      CHOLE: {
        label: 'コレステロール',
        unit: 'mg',
      },
    },
  },
  CHOCDF: {
    label: '炭水化物',
    unit: 'g',
    detail: {
      CHOAV: {
        label: '利用可能炭水化物（糖質）',
        detail: {
          CHOAVLM: {
            label: '利用可能炭水化物（単糖当量）',
            unit: 'g',
          },
          CHOAVL: {
            label: '利用可能炭水化物（質量計）',
            unit: 'g',
          },
          CHOAVLDF: {
            label: '差引き法による利用可能炭水化物',
            unit: 'g',
          },
        },
      },
      FIB: {
        label: '食物繊維総量',
        unit: 'g',
      },
      POLYL: {
        label: '糖アルコール',
        unit: 'g',
      },
    },
  },
  OA: {
    label: '有機酸',
    unit: 'g',
  },
  ASH: {
    label: '灰分',
    unit: 'g',
  },
  mineral: {
    label: 'ミネラル',
    detail: {
      NA: {
        label: 'ナトリウム',
        unit: 'mg',
      },
      K: {
        label: 'カリウム',
        unit: 'mg',
      },
      CA: {
        label: 'カルシウム',
        unit: 'mg',
      },
      MG: {
        label: 'マグネシウム',
        unit: 'mg',
      },
      P: {
        label: 'リン',
        unit: 'mg',
      },
      FE: {
        label: '鉄分',
        unit: 'mg',
      },
      ZN: {
        label: '亜鉛',
        unit: 'mg',
      },
      CU: {
        label: '銅',
        unit: 'mg',
      },
      MN: {
        label: 'マンガン',
        unit: 'mg',
      },
      ID: {
        label: 'ヨウ素',
        unit: 'μg',
      },
      SE: {
        label: 'セレン',
        unit: 'μg',
      },
      CR: {
        label: 'クロム',
        unit: 'μg',
      },
      MO: {
        label: 'モリブデン',
        unit: 'μg',
      },
    },
  },
  vitamin: {
    label: 'ビタミン',
    detail: {
      VITA: {
        label: 'ビタミンA',
        detail: {
          RETOL: {
            label: 'レチノール',
            unit: 'μg',
          },
          CARTA: {
            label: 'αカロテン',
            unit: 'μg',
          },
          CARTB: {
            label: 'βカロテン',
            unit: 'μg',
          },
          CRYPXB: {
            label: 'βクリプトキサンチン',
            unit: 'μg',
          },
          CARTBEQ: {
            label: 'βカロテン当量',
            unit: 'μg',
          },
          VITA_RAE: {
            label: 'レチノール活性当量',
            unit: 'μg',
          },
        },
      },
      VITD: {
        label: 'ビタミンD',
        unit: 'μg',
      },
      VITE: {
        label: 'ビタミンE',
        detail: {
          TOCPHA: {
            label: 'αトコフェロール',
            unit: 'mg',
          },
          TOCPHB: {
            label: 'βトコフェロール',
            unit: 'mg',
          },
          TOCPHG: {
            label: 'γトコフェロール',
            unit: 'mg',
          },
          TOCPHD: {
            label: 'δトコフェロール',
            unit: 'mg',
          },
        },
      },
      VITK: {
        label: 'ビタミンK',
        unit: 'μg',
      },
      VITB: {
        label: 'ビタミンB群',
        detail: {
          THIA: {
            label: 'ビタミンB1',
            unit: 'mg',
          },
          RIBF: {
            label: 'ビタミンB2',
            unit: 'mg',
          },
          NIA: {
            label: 'ナイアシン',
            unit: 'mg',
          },
          NE: {
            label: 'ナイアシン当量',
            unit: 'mg',
          },
          VITB6A: {
            label: 'ビタミンB6',
            unit: 'mg',
          },
          VITB12: {
            label: 'ビタミンB12',
            unit: 'μg',
          },
          FOL: {
            label: '葉酸',
            unit: 'μg',
          },
          PANTAC: {
            label: 'パントテン酸',
            unit: 'mg',
          },
          BIOT: {
            label: 'ビオチン',
            unit: 'μg',
          },
        },
      },
      VITC: {
        label: 'ビタミンC',
        unit: 'mg',
      },
    },
  },
  ALC: {
    label: 'アルコール',
    unit: 'g',
  },
  NACL_EQ: {
    label: '食塩相当量',
    unit: 'g',
  },
  remarks: {
    label: '備考',
  },
};

const NutrientsList = ({navigation, route}) => {
  const {selectNutrient, setMeals, index, parentScreen} = route.params;
  const [isCollapsed, setIsCollapsed] = useState({});
  const [intake, setIntake] = useState(selectNutrient.intake || 100);
  useEffect(() => {
    navigation.setOptions({
      title: '栄養素',
    });
  }, []);
  useEffect(() => {}, [isCollapsed]);

  const setNutrientValue = (value: string, unit: string) => {
    if (value === '-' || value === 'Tr') {
      return value;
    }
    return unit
      ? `${nutrientRecalculation(value, intake, selectNutrient.intake)} ${unit}`
      : nutrientRecalculation(value, intake, selectNutrient.intake);
  };

  const generateItemList = (
    i: number,
    label: string,
    value: string,
    unit: string,
  ) => {
    if (label === NUTRIENTS_LABEL.remarks.label) {
      return (
        <View key={i} style={{margin: 10}}>
          <Text style={{marginBottom: 10}}>{label}</Text>
          <Text>{setNutrientValue(value, unit)}</Text>
        </View>
      );
    }
    return (
      <View key={i} style={styles.itemView}>
        <View style={styles.labelItemView}>
          <Text>{label}</Text>
        </View>
        <View>
          <Text>{setNutrientValue(value, unit)}</Text>
        </View>
      </View>
    );
  };

  const generateCategory = (nutrientObj: object, objKey: string) => (
    <TouchableHighlight
      underlayColor="#CBEDCB"
      onPress={() =>
        setIsCollapsed({
          ...isCollapsed,
          [objKey]: !isCollapsed[objKey],
        })
      }>
      <View key={1} style={styles.categoryItemView}>
        <View style={styles.labelItemView}>
          <Text>
            <View style={{maxHeight: 18, height: 18}}>
              {isCollapsed[objKey] ? (
                <Icon name="arrow-right" size={25} />
              ) : (
                <Icon name="arrow-drop-down" size={25} />
              )}
            </View>
            <Text>{nutrientObj.label}</Text>
          </Text>
        </View>
        <View>
          <Text>
            {setNutrientValue(selectNutrient[objKey], nutrientObj.unit)}
          </Text>
        </View>
      </View>
      {/* {generateItemList(
        1,
        nutrientObj.label,
        selectNutrient[objKey],
        nutrientObj.unit,
      )} */}
    </TouchableHighlight>
  );

  const generateItems = (key: string, i: number, mapObj: {}) => {
    if (mapObj[key].detail) {
      return (
        <Fragment key={i}>
          {generateCategory(mapObj[key], key)}
          <Collapsible collapsed={!!isCollapsed[key]}>
            <View style={styles.categoryList}>
              {Object.keys(mapObj[key].detail).map((detailKey: string, ii) =>
                generateItems(detailKey, ii, mapObj[key].detail),
              )}
            </View>
          </Collapsible>
        </Fragment>
      );
    }
    return generateItemList(
      i,
      mapObj[key].label,
      selectNutrient[key],
      mapObj[key].unit,
    );
  };

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 20,
        }}>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            keyboardType="numeric"
            style={{
              borderWidth: 1,
              borderColor: 'black',
              borderRadius: 10,
              padding: 10,
              minWidth: 130,
            }}
            onChangeText={(v) => {
              setIntake(v.replace(/[^0-9]/g, ''));
            }}
            maxLength={10}
            value={intake}
            placeholder="摂取量(g)"
            clearButtonMode="always"
            defaultValue={intake.toString()}
          />
          <Text style={{marginVertical: 8, marginHorizontal: 5, fontSize: 18}}>
            g
          </Text>
        </View>
        <View style={{paddingTop: 4}}>
          <Button
            title="この量で登録"
            onPress={() => {
              const calNutrient = {};
              Object.keys(selectNutrient).forEach((key) => {
                if (
                  [
                    'foodGroup',
                    'foodNumber',
                    'indexNumber',
                    'foodName',
                    'remarks',
                  ].includes(key)
                ) {
                  calNutrient[key] = selectNutrient[key];
                } else {
                  calNutrient[key] = nutrientRecalculation(
                    selectNutrient[key],
                    intake,
                    selectNutrient.intake,
                  );
                }
              });

              if (index !== undefined) {
                setMeals((preState) =>
                  preState.map((obj, i) =>
                    i === index
                      ? {
                          ...calNutrient,
                          intake: Number(intake),
                        }
                      : obj,
                  ),
                );
              } else {
                setMeals((preState) =>
                  preState.concat([
                    {
                      ...calNutrient,
                      intake: Number(intake),
                    },
                  ]),
                );
              }

              if (parentScreen === 'SearchMeals') {
                navigation.goBack();
                navigation.goBack();
              }
              if (parentScreen === 'MealsScreen') {
                navigation.goBack();
              }
            }}
          />
        </View>
      </View>

      <View style={{alignItems: 'flex-end', marginTop: 10, marginRight: 20}}>
        {/* <Text style={{fontSize: 11.5, color: 'gray'}}>※100gあたりの栄養素</Text> */}
      </View>
      <Divider>{`${Number(intake)}g あたりの栄養素`}</Divider>

      <ScrollView>
        <View style={{margin: 10}}>
          {Object.keys(NUTRIENTS_LABEL).map((key: string, i) =>
            generateItems(key, i, NUTRIENTS_LABEL),
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  categoryItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginRight: 10,
  },
  labelItemView: {
    // paddingLeft: 20,
  },
  categoryList: {
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default NutrientsList;
