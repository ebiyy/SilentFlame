import React, {Fragment, useState} from 'react';
import {LogBox, StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NUTRIENTS_LABEL} from './constant.meal';
import {nutrientRecalculation} from './function.meal';

type Props = {
  selectMeal: Meal;
  intake: number;
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const NutrientsList = (props: Props) => {
  const {selectMeal, intake} = props;
  const [isCollapsed, setIsCollapsed] = useState({});

  const setNutrientValue = (value: string, unit: string) => {
    if (value === '-' || value === 'Tr') {
      return value;
    }
    const resultValue = nutrientRecalculation(
      value,
      String(intake),
      selectMeal.intake,
    );
    return unit ? `${resultValue} ${unit}` : resultValue;
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
          <Text>{value}</Text>
          {value !== '' && value.match(/\d/) && (
            <Text style={{marginTop: 10}}>
              ※備考の数値は入力値によって再計算されません。
            </Text>
          )}
        </View>
      );
    }
    return (
      <View key={i} style={styles.itemView}>
        <View style={styles.labelItemView}>
          <Text>{label}</Text>
        </View>
        <View>
          <Text style={{lineHeight: 14}}>{setNutrientValue(value, unit)}</Text>
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
          <Text style={{lineHeight: 25}}>
            {setNutrientValue(selectMeal[objKey], nutrientObj.unit)}
          </Text>
        </View>
      </View>
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
      selectMeal[key],
      mapObj[key].unit,
    );
  };

  return (
    <ScrollView>
      <View style={{margin: 10}}>
        {Object.keys(NUTRIENTS_LABEL).map((key: string, i) =>
          generateItems(key, i, NUTRIENTS_LABEL),
        )}
        <View style={{alignSelf: 'flex-end', marginBottom: 10}}>
          <Text>※データ元: 日本食品標準成分表2020年版（八訂）</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.4,
    borderColor: '#ddd',
  },
  categoryItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginRight: 10,
    paddingBottom: 5,
    borderBottomWidth: 0.4,
    borderColor: '#ddd',
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
