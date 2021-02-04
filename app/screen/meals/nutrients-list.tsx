import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';

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
      CHOAVLM: {
        label: '利用可能炭水化物（単糖当量）',
        unit: 'g',
        nutrientSubCategory: '利用可能炭水化物',
      },
      CHOAVL: {
        label: '利用可能炭水化物（質量計）',
        unit: 'g',
        nutrientSubCategory: '利用可能炭水化物',
      },
      CHOAVLDF: {
        label: '差引き法による利用可能炭水化物',
        unit: 'g',
        nutrientSubCategory: '利用可能炭水化物',
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
      RETOL: {
        label: 'レチノール',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンA',
      },
      CARTA: {
        label: 'αカロテン',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンA',
      },
      CARTB: {
        label: 'βカロテン',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンA',
      },
      CRYPXB: {
        label: 'βクリプトキサンチン',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンA',
      },
      CARTBEQ: {
        label: 'βカロテン当量',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンA',
      },
      VITA_RAE: {
        label: 'レチノール活性当量',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンA',
      },
      VITD: {
        label: 'ビタミンD',
        unit: 'μg',
      },
      TOCPHA: {
        label: 'αトコフェロール',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンE',
      },
      TOCPHB: {
        label: 'βトコフェロール',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンE',
      },
      TOCPHG: {
        label: 'γトコフェロール',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンE',
      },
      TOCPHD: {
        label: 'δトコフェロール',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンE',
      },
      VITK: {
        label: 'ビタミンK',
        unit: 'μg',
      },
      THIA: {
        label: 'ビタミンB1',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンB群',
      },
      RIBF: {
        label: 'ビタミンB2',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンB群',
      },
      NIA: {
        label: 'ナイアシン',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンB群',
      },
      NE: {
        label: 'ナイアシン当量',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンB群',
      },
      VITB6A: {
        label: 'ビタミンB6',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンB群',
      },
      VITB12: {
        label: 'ビタミンB12',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンB群',
      },
      FOL: {
        label: '葉酸',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンB群',
      },
      PANTAC: {
        label: 'パントテン酸',
        unit: 'mg',
        nutrientSubCategory: 'ビタミンB群',
      },
      BIOT: {
        label: 'ビオチン',
        unit: 'μg',
        nutrientSubCategory: 'ビタミンB群',
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

const generateItemList = (
  i: number,
  label: string,
  value: string,
  unit: string,
) => (
  <View key={i} style={styles.itemView}>
    <View style={styles.labelItemView}>
      <Text>{label}</Text>
    </View>
    <View>
      <Text>{setNutrientValue(value, unit)}</Text>
    </View>
  </View>
);

const NutrientsList = ({navigation, route}) => {
  const {selectNutrient} = route.params;
  const [isCollapsed, setIsCollapsed] = useState({});
  useEffect(() => {
    navigation.setOptions({
      title: '栄養素',
    });
  }, []);
  useEffect(() => {
    console.log(isCollapsed);
  }, [isCollapsed]);

  const generateCategory = (nutrientObj: object, objKey: string) => (
    <TouchableHighlight
      underlayColor="lightblue"
      onPress={() =>
        setIsCollapsed({
          ...isCollapsed,
          [objKey]: !isCollapsed[objKey],
        })
      }>
      {generateItemList(
        1,
        nutrientObj.label,
        selectNutrient[objKey],
        nutrientObj.unit,
      )}
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
    <ScrollView>
      <View style={{margin: 10}}>
        {Object.keys(nutrients).map((key: string, i) =>
          generateItems(key, i, nutrients),
        )}
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
  categoryList: {
    marginLeft: 10,
    marginBottom: 10,
  },
});

export default NutrientsList;
