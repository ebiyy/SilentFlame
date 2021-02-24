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
import {ComStyles, screenThemeColor, shadowStyles} from '../../global-style';
import DeleteConfirmationModal from '../../components/delete-confirmation-modal';
import {imageResState, supplisState} from './suppli.hook';
import {Suppli} from './suppli';
import InputValueModal from './components/input-value-modal';
import storage from '../../helpers/custom-async-storage';
import {NUTRIENT_KEY} from './constant';

type Props = {
  suppli: Suppli;
  switchCount: boolean;
  isDelete: boolean;
};

const CountSupplement = (props: Props) => {
  const {suppli, switchCount, isDelete} = props;
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const [supplis, setSuppls] = useRecoilState(supplisState);
  const [deleteModal, setDeleteModal] = useState(false);
  const [inputModal, setInputModal] = useState(false);
  const [imageRes, setImageRes] = useRecoilState(imageResState);

  useEffect(() => {
    console.log(suppli.nutrients);
    const sum = suppli.nutrients.map((o) => {
      return {
        sum: o.amountPerServingValue * count,
        nutrientName: o.nutrientName,
        amountPerServingUnit: o.amountPerServingUnit,
        nutrientKey: o.nutrientKey,
      };
    });
    let t = {};
    sum.forEach((s) => {
      const defaultUnit = NUTRIENT_KEY[s.nutrientKey].unit;
      const suppliUnit = s.amountPerServingUnit;
      if (
        defaultUnit === suppliUnit ||
        (['mcg', 'μg'].includes(defaultUnit) &&
          ['mcg', 'μg'].includes(defaultUnit))
      ) {
        t[s.nutrientKey] = s.sum;
      } else if (['mcg', 'μg'].includes(defaultUnit) && suppliUnit === 'mg') {
        t[s.nutrientKey] = s.sum / (10 ^ 6);
      } else if (['mcg', 'μg'].includes(defaultUnit) && suppliUnit === 'g') {
        t[s.nutrientKey] = s.sum / (10 ^ 9);
      } else if (defaultUnit === 'g' && ['mcg', 'μg'].includes(suppliUnit)) {
        t[s.nutrientKey] = s.sum * (10 ^ 9);
      } else if (defaultUnit === 'mg' && ['mcg', 'μg'].includes(suppliUnit)) {
        t[s.nutrientKey] = s.sum * (10 ^ 6);
      }
    });
    console.log('t', t);
    console.log(count);
    // storage.save({
    //   key: 'suppliCount',
    //   data: supplis,
    // });
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
            shadowStyles(screenThemeColor.suppl).boxShadow,
          ]}>
          <TouchableOpacity
            style={[ComStyles.centeringContainer]}
            onPress={() => {
              setImageRes(suppli.imageRes);
              navigation.navigate('SupplFormScreen', {
                mode: 'view',
                suppli: suppli,
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
          setSuppls((preState) =>
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
    backgroundColor: screenThemeColor.suppl,
    borderRadius: 20,
    shadowColor: screenThemeColor.suppl,
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
    shadowColor: screenThemeColor.suppl,
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
    textDecorationColor: screenThemeColor.suppl,
  },
});

export default CountSupplement;
