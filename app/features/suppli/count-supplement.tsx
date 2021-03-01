import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useRecoilState} from 'recoil';
import {ComStyles, screenThemeColor, shadowStyles} from '../../global/styles';
import {imageResState, supplisState, suppliToMealState} from './suppli.hook';
import {Suppli} from './suppli';
import {CONTENT_SIZE_UNIT, NUTRIENT_KEY} from './constant';
import {DeleteConfirmationModal} from '../../components/delete-confirmation-modal';
import {InputValueModal} from './components/input-value-modal';

type Props = {
  suppli: Suppli;
  switchCount: boolean;
  isDelete: boolean;
  holdCount: Object;
  setHoldCount: React.Dispatch<React.SetStateAction<Object>>;
};

export const CountSupplement = (props: Props) => {
  const {suppli, switchCount, isDelete, holdCount, setHoldCount} = props;
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const [supplis, setSupplis] = useRecoilState(supplisState);
  const [deleteModal, setDeleteModal] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const [imageRes, setImageRes] = useRecoilState(imageResState);
  const [suppliToMeal, setSuppliToMeal] = useRecoilState(suppliToMealState);

  useEffect(() => {
    if (holdCount[suppli.id] >= 0 && count === 0) {
      setCount(holdCount[suppli.id]);
    }
  }, [holdCount]);

  useEffect(() => {
    const countSumNutrients = suppli.nutrients.map((nutrient) => {
      const numAPSV = Number(nutrient.amountPerServingValue);
      return {
        sum:
          suppli.contentSizeUnit !== CONTENT_SIZE_UNIT.piece
            ? Number(((numAPSV / suppli.servingSize) * count).toFixed(1))
            : numAPSV * count,
        nutrientName: nutrient.nutrientName,
        amountPerServingUnit: nutrient.amountPerServingUnit,
        nutrientKey: nutrient.nutrientKey,
      };
    });
    const isMcg = (str: string) => ['mcg', 'μg'].includes(str);
    let toMeals = {};
    countSumNutrients.forEach((sumNutrient) => {
      const nutrientKey = sumNutrient.nutrientKey;
      const mealUnit = NUTRIENT_KEY[nutrientKey].unit;
      const suppliUnit = sumNutrient.amountPerServingUnit;

      const format = (toMeal: Object) => {
        if (mealUnit === suppliUnit || (isMcg(mealUnit) && isMcg(suppliUnit))) {
          toMeal[nutrientKey] = sumNutrient.sum;
        } else if (isMcg(mealUnit) && suppliUnit === 'mg') {
          toMeal[nutrientKey] = sumNutrient.sum * Math.pow(10, 3);
        } else if (isMcg(mealUnit) && suppliUnit === 'g') {
          toMeal[nutrientKey] = sumNutrient.sum * Math.pow(10, 6);
        } else if (mealUnit === 'g' && isMcg(suppliUnit)) {
          toMeal[nutrientKey] = sumNutrient.sum / Math.pow(10, 6);
        } else if (mealUnit === 'mg' && isMcg(suppliUnit)) {
          toMeal[nutrientKey] = sumNutrient.sum / Math.pow(10, 3);
        }
        toMeal['foodName'] = suppli.suppliName;
        return toMeal;
      };
      toMeals = format(toMeals);
    });

    if (
      Object.values(toMeals).filter((num) => typeof num === 'number' && num)
        .length > 0 ||
      Object.entries(suppliToMeal).length > 0
    ) {
      setSuppliToMeal((preState) => {
        return {...preState, ...{[suppli.id]: toMeals}};
      });
    }

    setHoldCount((preState) => {
      // storageからのデータ取得より前に走るのでその前での書き込み禁止
      if (Object.entries(holdCount).length > 0 || count > 0) {
        return {...preState, ...{[suppli.id]: count}};
      } else {
        return preState;
      }
    });
  }, [count]);

  return (
    <>
      <View style={Styles.countSupplContainer}>
        {isDelete ? (
          <TouchableHighlight
            style={{alignSelf: 'center'}}
            underlayColor="white"
            onPress={() => {
              setDeleteModal((state) => !state);
            }}>
            <Fontisto name="close" size={35} color="lightpink" />
          </TouchableHighlight>
        ) : (
          <View style={Styles.badgeContainer}>
            <Text style={Styles.badgeText}>{count}</Text>
          </View>
        )}

        <View
          style={[
            Styles.supplNameContainer,
            shadowStyles(screenThemeColor.suppli).boxShadow,
          ]}>
          <TouchableOpacity
            style={[ComStyles.centeringContainer]}
            onPress={() => {
              setImageRes(suppli.imageRes);
              navigation.navigate('SupplFormScreen', {
                mode: 'edit',
                viewTarget: suppli,
                setMarge: setSupplis,
                btnColor: screenThemeColor.suppli,
              });
            }}>
            <View>
              <Text style={Styles.nameText}>{suppli.suppliName}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!isDelete && (
          <View style={[Styles.counterContainer]}>
            {switchCount ? (
              <TouchableOpacity
                onPress={() =>
                  suppli.contentSizeUnit === '個'
                    ? setCount(count + 1)
                    : setInputModal(true)
                }>
                <View style={Styles.counterIcon}>
                  <FontAwesome5 name="plus-circle" size={40} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.counterIcon}
                onPress={() =>
                  suppli.contentSizeUnit === '個'
                    ? setCount(count - 1 >= 0 ? count - 1 : 0)
                    : setInputModal(true)
                }>
                <View style={Styles.counterIcon}>
                  <FontAwesome5 name="minus-circle" size={40} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <DeleteConfirmationModal
        modalVisible={deleteModal}
        setModalVisible={setDeleteModal}
        deleteFunc={() =>
          setSupplis((preState) =>
            preState.map((suppl) =>
              suppl.id !== suppli.id ? suppl : {...suppl, delete: true},
            ),
          )
        }
      />
      <InputValueModal
        modalVisible={inputModal}
        setModalVisible={setInputModal}
        setCount={setCount}
        contentSizeUnit={suppli.contentSizeUnit}
        switchCount={switchCount}
      />
    </>
  );
};

const Styles = StyleSheet.create({
  countSupplContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 10,
    marginVertical: 5,
  },
  counterContainer: {
    width: 40,
    marginLeft: 10,
    alignSelf: 'center',
  },
  supplNameContainer: {
    width: 230,
    height: 60,
    borderRadius: 7,
    marginLeft: 15,
  },
  countValueContainer: {
    width: 20,
    borderColor: 'black',
    borderWidth: 1,
  },
  countValueText: {
    fontSize: 22,
  },
  badgeContainer: {
    height: 30,
    width: 30,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: screenThemeColor.suppli,
    borderRadius: 20,
    shadowColor: screenThemeColor.suppli,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.7,
    shadowRadius: 4,
    elevation: 1,
  },
  badgeText: {
    color: 'white',
    fontSize: 20,
  },
  counterIcon: {
    padding: 0,
    borderRadius: 20,
    shadowColor: screenThemeColor.suppli,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  nameText: {
    textDecorationLine: 'underline',
    textDecorationColor: screenThemeColor.suppli,
  },
});
