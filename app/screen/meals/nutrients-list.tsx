import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

const nutrients = {
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
  PROTCAA: {
    label: 'アミノ酸組成によるたんぱく質',
    unit: 'g',
    nutrientCategory: 'たんぱく質',
  },
  PROT: {
    label: 'たんぱく質',
    unit: 'g',
    nutrientCategory: 'たんぱく質',
  },
  FATNLEA: {
    label: '脂肪酸のトリアシルグリセロール当量',
    unit: 'g',
    nutrientCategory: '脂質',
  },
  CHOLE: {
    label: 'コレステロール',
    unit: 'mg',
    nutrientCategory: '脂質',
  },
  FAT: {
    label: '脂質',
    unit: 'g',
    nutrientCategory: '脂質',
  },
  CHOAVLM: {
    label: '利用可能炭水化物（単糖当量）',
    unit: 'g',
    nutrientCategory: '炭水化物',
    nutrientSubCategory: '利用可能炭水化物',
  },
  CHOAVL: {
    label: '利用可能炭水化物（質量計）',
    unit: 'g',
    nutrientCategory: '炭水化物',
    nutrientSubCategory: '利用可能炭水化物',
  },
  CHOAVLDF: {
    label: '差引き法による利用可能炭水化物',
    unit: 'g',
    nutrientCategory: '炭水化物',
    nutrientSubCategory: '利用可能炭水化物',
  },
  FIB: {
    label: '食物繊維総量',
    unit: 'g',
    nutrientCategory: '炭水化物',
  },
  POLYL: {
    label: '糖アルコール',
    unit: 'g',
    nutrientCategory: '炭水化物',
  },
  CHOCDF: {
    label: '炭水化物',
    unit: 'g',
    nutrientCategory: '炭水化物',
  },
  OA: {
    label: '有機酸',
    unit: 'g',
  },
  ASH: {
    label: '灰分',
    unit: 'g',
  },
  NA: {
    label: 'ナトリウム',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  K: {
    label: 'カリウム',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  CA: {
    label: 'カルシウム',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  MG: {
    label: 'マグネシウム',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  P: {
    label: 'リン',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  FE: {
    label: '鉄分',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  ZN: {
    label: '亜鉛',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  CU: {
    label: '銅',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  MN: {
    label: 'マンガン',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
  },
  ID: {
    label: 'ヨウ素',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
  },
  SE: {
    label: 'セレン',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
  },
  CR: {
    label: 'クロム',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
  },
  MO: {
    label: 'モリブデン',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
  },
  RETOL: {
    label: 'レチノール',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンA',
  },
  CARTA: {
    label: 'αカロテン',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンA',
  },
  CARTB: {
    label: 'βカロテン',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンA',
  },
  CRYPXB: {
    label: 'βクリプトキサンチン',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンA',
  },
  CARTBEQ: {
    label: 'βカロテン当量',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンA',
  },
  VITA_RAE: {
    label: 'レチノール活性当量',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンA',
  },
  VITD: {
    label: 'ビタミンD',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
  },
  TOCPHA: {
    label: 'αトコフェロール',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンE',
  },
  TOCPHB: {
    label: 'βトコフェロール',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンE',
  },
  TOCPHG: {
    label: 'γトコフェロール',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンE',
  },
  TOCPHD: {
    label: 'δトコフェロール',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンE',
  },
  VITK: {
    label: 'ビタミンK',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
  },
  THIA: {
    label: 'ビタミンB1',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  RIBF: {
    label: 'ビタミンB2',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  NIA: {
    label: 'ナイアシン',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  NE: {
    label: 'ナイアシン当量',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  VITB6A: {
    label: 'ビタミンB6',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  VITB12: {
    label: 'ビタミンB12',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  FOL: {
    label: '葉酸',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  PANTAC: {
    label: 'パントテン酸',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  BIOT: {
    label: 'ビオチン',
    unit: 'μg',
    nutrientCategory: 'ミネラル',
    nutrientSubCategory: 'ビタミンB群',
  },
  VITC: {
    label: 'ビタミンC',
    unit: 'mg',
    nutrientCategory: 'ミネラル',
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

const setNutrientValue = (value: string, unit: string) => {
  if (value === '-' || value === 'Tr') {
    return value;
  }
  if (unit) {
    return `${value} ${unit}`;
  } else {
    return value;
  }
};

const NutrientsList = ({navigation, route}) => {
  const {selectNutrient} = route.params;
  useEffect(() => {
    navigation.setOptions({
      title: '栄養素',
    });
  }, []);
  return (
    <ScrollView>
      <View style={{margin: 10}}>
        {Object.keys(nutrients).map((objKey: string, i) => (
          <View key={i} style={styles.itemView}>
            <View style={styles.labelItemView}>
              <Text>{nutrients[objKey].label}</Text>
            </View>
            <View>
              <Text>
                {setNutrientValue(
                  selectNutrient[objKey],
                  nutrients[objKey].unit,
                )}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  labelItemView: {
    // paddingLeft: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    maxWidth: '100%',
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    margin: 5,
    elevation: 2,
    height: 40,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default NutrientsList;
