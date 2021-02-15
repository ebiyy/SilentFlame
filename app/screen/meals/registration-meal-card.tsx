import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Button, Dimensions, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {
  calNutrient,
  nutrientRecalculation,
  replaceFoodName,
} from './function.meal';
import DeleteConfirmationModal from '../../components/delete-confirmation-modal';
import {useRecoilState} from 'recoil';
import {actionMealState, mealsState} from './recoil.meal';
import {NUTRIENTS_LABEL} from './constant.meal';
import {useMargeMealState} from './hook.meal';

type Props = {
  meal: MargeMeal;
};

const RegistrationMealCard = (props: Props) => {
  const {meal} = props;
  const navigation = useNavigation();
  const [tempMeal, setTempMeal] = useState(meal);
  const [intake, setIntake] = useState(String(meal.intake));
  const [showChangeBtn, setShowChangeBtn] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);

  useEffect(() => {
    cancelBtnPress();
    console.log(props);
  }, [props]);

  const intakeOnChange = (v: string) => {
    if (!showChangeBtn) {
      setShowChangeBtn(true);
    }
    setIntake(v);
    setTempMeal(calNutrient(meal, v));
  };

  const submitBtnPress = () => {
    setActionMeal({item: tempMeal, action: 'set'});
    setShowChangeBtn(false);
  };

  const cancelBtnPress = () => {
    setIntake(String(meal.intake));
    setTempMeal(meal);
    setShowChangeBtn(false);
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
              }).format(tempMeal.addedAt.toDate())}
            </Text>
          </View>
          <View style={Styles.iconContainer}>
            <TouchableOpacity
              style={[Styles.icon, Styles.infoIcon]}
              onPress={() =>
                navigation.navigate('NutrientsList', {
                  selectMeal: meal,
                  timePeriod: meal.timePeriod,
                  parentScreen: 'MealsScreen',
                })
              }>
              <Icon name="infocirlceo" size={22} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[Styles.icon, Styles.closeIcon]}
              onPress={() => setModalVisible(true)}>
              <Icon name="closecircleo" size={22} color="white" />
            </TouchableOpacity>
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
                clearButtonMode="always"
                keyboardType="numeric"
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
                {tempMeal.CHOCDF} {NUTRIENTS_LABEL.CHOCDF.unit}
              </Text>
              <Text style={Styles.nutrientLable}>
                {tempMeal.CHOAVLM
                  ? `${tempMeal.CHOAVLM} ${NUTRIENTS_LABEL.CHOCDF.detail.CHOAV.detail.CHOAVLM.unit}`
                  : `${tempMeal.CHOAVLDF} ${NUTRIENTS_LABEL.CHOCDF.detail.CHOAV.detail.CHOAVLDF.unit}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <DeleteConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteFunc={() => setActionMeal({item: tempMeal, action: 'delete'})}
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
    backgroundColor: 'lightgreen',
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

export default RegistrationMealCard;
