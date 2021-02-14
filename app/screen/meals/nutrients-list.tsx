import React, {Fragment, useEffect, useState} from 'react';
import {Button, LogBox, StyleSheet, Text, View} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {
  ScrollView,
  TextInput,
  TouchableHighlight,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useRecoilState} from 'recoil';
import Divider from '../../components/divider';
import {actionMealState, mealsState} from './recoil.meal';
import {NUTRIENTS_LABEL} from './constant.meal';
import {
  calNutrient,
  generateMeal,
  nutrientRecalculation,
} from './function.meal';

type Params = {
  selectMeal: LocalMeal;
  parentScreen: string;
  timePeriod: TimePeriodKey;
};

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const NutrientsList = ({navigation, route}) => {
  const {selectMeal, parentScreen, timePeriod} = route.params as Params;
  const [isCollapsed, setIsCollapsed] = useState({});
  const [intake, setIntake] = useState(selectMeal.intake || 100);
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);
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
          <Text>{setNutrientValue(selectMeal[objKey], nutrientObj.unit)}</Text>
        </View>
      </View>
      {/* {generateItemList(
        1,
        nutrientObj.label,
        selectMeal[objKey],
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
      selectMeal[key],
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
              setIntake(String(v));
            }}
            maxLength={10}
            value={String(intake)}
            placeholder="摂取量(g)"
            clearButtonMode="always"
            defaultValue={String(intake)}
          />
          <Text style={{marginVertical: 8, marginHorizontal: 5, fontSize: 18}}>
            g
          </Text>
        </View>
        <View style={{paddingTop: 4}}>
          <Button
            title="この量で登録"
            onPress={() => {
              setActionMeal({
                item: generateMeal(
                  calNutrient(selectMeal, String(intake)),
                  Number(intake),
                  timePeriod,
                ),
                action: 'set',
              });
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
          <View style={{alignSelf: 'flex-end', marginBottom: 10}}>
            <Text>※データ元: 日本食品標準成分表2020年版（八訂）</Text>
          </View>
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
