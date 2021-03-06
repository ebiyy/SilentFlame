import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {calNutrient, replaceFoodName} from './function.meal';
import {useRecoilState, useRecoilValue} from 'recoil';
import {actionMealState, mealsState} from './recoil.meal';
import {NUTRIENTS_LABEL} from './constant.meal';
import {screenThemeColor} from '../../global/styles';
import {DeleteConfirmationModal} from '../../components/delete-confirmation-modal';
import {editableState} from '../date-manager/data-manager.recoil';

type Props = {
  meal: Meal;
};

export const RegistrationMealCard = (props: Props) => {
  const {meal} = props;
  const navigation = useNavigation();
  const [tempMeal, setTempMeal] = useState(meal);
  const [intake, setIntake] = useState(String(meal.intake));
  const [showChangeBtn, setShowChangeBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [meals, setMeals] = useRecoilState(mealsState);
  const editable = useRecoilValue(editableState);

  useEffect(() => {
    cancelBtnPress();
  }, [props]);

  const intakeOnChange = (v: string) => {
    if (!showChangeBtn) {
      setShowChangeBtn(true);
    }
    setIntake(v);
    setTempMeal(calNutrient(meal, v));
  };

  const submitBtnPress = () => {
    console.log('tempMeal', tempMeal);
    setMeals((preState) =>
      preState.map((obj) => (obj.id === meal.id ? tempMeal : obj)),
    );
    setShowChangeBtn(false);
  };

  const cancelBtnPress = () => {
    // console.log(meal.foodName);
    // console.log(tempMeal.foodName);
    setIntake(String(meal.intake));
    setTempMeal(meal);
    setShowChangeBtn(false);
  };

  const CHOAVL = tempMeal.CHOAVLM ? tempMeal.CHOAVLM : tempMeal.CHOAVLDF;

  const toNum = (strNum: string) =>
    Number(strNum.replace('(', '').replace(')', ''));

  const CHOCDF = () => {
    if (!['-', 'Tr'].includes(CHOAVL)) {
      const isEstimatedValue =
        String(CHOAVL).indexOf('(') > -1 ||
        String(tempMeal.CHOCDF).indexOf('(') > -1;
      const sub = toNum(String(tempMeal.CHOCDF)) - toNum(String(CHOAVL));
      const CHOCDFValue = sub > 0 ? sub.toFixed(1) : 0;
      if (isEstimatedValue) {
        return `(${CHOCDFValue})`;
      } else {
        return CHOCDFValue;
      }
    } else {
      return tempMeal.CHOCDF;
    }
  };

  return (
    <>
      <View style={[Styles.card, modalVisible && {backgroundColor: 'pink'}]}>
        <View style={Styles.cardHeader}>
          <View style={Styles.titleContainer}>
            <Text style={Styles.titleText}>
              {replaceFoodName(tempMeal.foodName)}
            </Text>
            <Text style={Styles.timeText}>
              {new Intl.DateTimeFormat('ja-JP', {
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(tempMeal.addedAt))}
            </Text>
          </View>
          <View style={Styles.iconContainer}>
            <TouchableOpacity
              style={[Styles.icon, Styles.infoIcon]}
              onPress={() =>
                navigation.navigate('NutrientsScreen', {
                  selectMeal: meal,
                  timePeriod: meal.timePeriod,
                  parentScreen: 'MealsScreen',
                })
              }>
              <Icon name="infocirlceo" size={22} color="white" />
            </TouchableOpacity>
            {editable && (
              <TouchableOpacity
                style={[Styles.icon, Styles.closeIcon]}
                onPress={() => setModalVisible(true)}>
                <Icon name="closecircleo" size={22} color="white" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={Styles.cardBody}>
          <View style={Styles.gramFromContainer}>
            <View style={Styles.textInputContainer}>
              <TextInput
                style={Styles.textInput}
                onChangeText={intakeOnChange}
                value={intake}
                placeholder="摂取量"
                placeholderTextColor="lightgray"
                clearButtonMode="always"
                keyboardType="numeric"
                editable={editable}
                defaultValue={String(meal.intake)}
              />
              <Text style={Styles.gramUnit}>g</Text>
            </View>
            {showChangeBtn && (
              <View style={Styles.changeBtnContainer}>
                <Button title="変更" onPress={submitBtnPress} />
                <Button
                  title="キャンセル"
                  color="red"
                  onPress={cancelBtnPress}
                />
              </View>
            )}
          </View>
          <View style={Styles.nutrientContainer}>
            <View style={Styles.nutrientContentLabel}>
              <Text style={Styles.nutrientLable}>カロリー</Text>
              <Text style={Styles.nutrientLable}>たんぱく質</Text>
              <Text style={Styles.nutrientLable}>脂質</Text>
              <Text style={Styles.nutrientLable}>炭水化物</Text>
              <Text style={Styles.nutrientLable}>糖質</Text>
            </View>
            <View style={Styles.nutrientContentValue}>
              <Text style={Styles.nutrientLable}>
                {tempMeal.ENERC_KCAL} {NUTRIENTS_LABEL.ENERC_KCAL.unit}
              </Text>
              <Text style={Styles.nutrientLable}>
                {tempMeal.PROT} {NUTRIENTS_LABEL.PROT.unit}
              </Text>
              <Text style={Styles.nutrientLable}>
                {tempMeal.FAT} {NUTRIENTS_LABEL.FAT.unit}
              </Text>
              <Text style={Styles.nutrientLable}>
                {CHOCDF()} {NUTRIENTS_LABEL.CHOCDF.unit}
              </Text>
              <Text style={Styles.nutrientLable}>
                {CHOAVL} {NUTRIENTS_LABEL.CHOCDF.detail.CHOAVLM.unit}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <DeleteConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteFunc={() =>
          setMeals((preState) => preState.filter((obj) => obj.id !== meal.id))
        }
      />
    </>
  );
};

const Styles = StyleSheet.create({
  card: {
    // height: 200,
    width: Dimensions.get('window').width * 0.95,
    margin: 10,
    paddingBottom: 10,
    borderRadius: 10,
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,
  },
  titleContainer: {
    maxWidth: Dimensions.get('window').width * 0.6,
  },
  timeText: {
    marginTop: 10,
    color: 'gray',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 12,
    maxHeight: 40,
    padding: 7,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoIcon: {
    backgroundColor: screenThemeColor.meals,
  },
  closeIcon: {
    backgroundColor: '#ddd',
  },
  titleText: {
    fontSize: 19,
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gramFromContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    minWidth: 100,
    height: 50,
  },
  gramUnit: {
    margin: 10,
    fontSize: 15,
  },
  changeBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nutrientContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 0,
    marginRight: 40,
    marginTop: -10,
  },
  nutrientContentLabel: {},
  nutrientLable: {
    lineHeight: 20,
  },
  nutrientContentValue: {
    marginLeft: 20,
    alignItems: 'flex-end',
  },
});
