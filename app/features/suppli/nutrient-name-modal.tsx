import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {screenThemeColor, shadowStyles, winHeight} from '../../global/styles';
import {
  carbohydrateNutrientKeys,
  fatNutrientKeys,
  mineralNutrientKeys,
  proteinNutrientKeys,
  vitaminNutrientKeys,
} from './constant';
import Modal from 'react-native-modal';
import {getStatusBarHeight, isAndroid} from '@freakycoder/react-native-helpers';

// プロテインはペプチドブレンドの詳細とかにもっと色々ある。。
const NUREIENT = {
  main: ['エネルギー', 'たんぱく質', '脂質', '炭水化物', '食物繊維'],
  protein: [
    ...Object.keys(proteinNutrientKeys).map(
      (key) => proteinNutrientKeys[key].label,
    ),
    // 'オルニチン', // not
  ],
  // fat: Object.keys(fatNutrientKeys).map(key=>{name: fatNutrientKeys[key].label, key: key}),
  fat: Object.keys(fatNutrientKeys).map((key) => fatNutrientKeys[key].label),
  carbohydrate: Object.keys(carbohydrateNutrientKeys).map(
    (key) => carbohydrateNutrientKeys[key].label,
  ),
  vitamin: [
    ...Object.keys(vitaminNutrientKeys).map(
      (key) => vitaminNutrientKeys[key].label,
    ),
    // 'コリン',
    // 'イノシトール',
    // 'PABA',
  ],
  mineral: Object.keys(mineralNutrientKeys).map(
    (key) => mineralNutrientKeys[key].label,
  ),
};

const TAB = [
  {dispName: '主な要素', key: 'main'},
  {dispName: 'たんぱく質', key: 'protein'},
  {dispName: '脂質', key: 'fat'},
  {dispName: '炭水化物', key: 'carbohydrate'},
  {dispName: 'ビタミン', key: 'vitamin'},
  {dispName: 'ミネラル', key: 'mineral'},
  {dispName: '手入力', key: 'manual'},
];

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  nutrientNameValue: string;
  nutrientNameOnChange: (...event: any[]) => void;
};

export const NutrientNameModal = (props: Props) => {
  const {
    modalVisible,
    setModalVisible,
    nutrientNameValue,
    nutrientNameOnChange,
  } = props;
  const [tab, setTab] = useState(TAB[0].key);
  const [value, onChangeText] = useState('');

  return (
    <View style={{position: 'absolute'}}>
      {modalVisible && (
        <View style={styles.container}>
          <Modal
            animationIn="zoomIn"
            animationOut="zoomOut"
            // transparent={true}
            isVisible={modalVisible}
            onBackdropPress={() => setModalVisible(false)}
            // onRequestClose={() => {
            //   Alert.alert('Modal has been closed.');
            // }}
          >
            <View style={[styles.container]}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitleText}>栄養素を選択</Text>
                <View>
                  <View style={styles.modalHeader}>
                    {TAB.map((obj, i) => (
                      <Pressable
                        key={i}
                        onPress={() => {
                          console.log('setTab(obj.key)', obj.key);
                          setTab(obj.key);
                        }}>
                        <View style={styles.tabs}>
                          <Text style={styles.tabText}>{obj.dispName}</Text>
                        </View>
                      </Pressable>
                    ))}
                  </View>
                  <ScrollView>
                    <View style={styles.modalBody}>
                      {tab !== 'manual' ? (
                        NUREIENT[tab].map((nutrient, i) => (
                          <Pressable
                            key={i}
                            style={styles.openButton}
                            onPress={() => {
                              nutrientNameOnChange(nutrient);
                              setModalVisible(false);
                            }}>
                            <Text style={styles.nutrientText}>{nutrient}</Text>
                          </Pressable>
                        ))
                      ) : (
                        <View style={styles.modalFormContainer}>
                          <TextInput
                            onChangeText={(text) => onChangeText(text)}
                            value={value}
                            style={[
                              styles.modalTextForm,
                              shadowStyles('black').boxShadow,
                            ]}
                          />
                          <View style={styles.modalBtnContainer}>
                            <View
                              style={[
                                shadowStyles(screenThemeColor.suppli).boxShadow,
                                styles.modalBtn,
                              ]}>
                              <Pressable
                                onPress={
                                  value
                                    ? () => {
                                        nutrientNameOnChange(value);
                                        setModalVisible(false);
                                      }
                                    : () => {}
                                }>
                                <Text style={styles.modalBtnText}>
                                  栄養素を追加
                                </Text>
                              </Pressable>
                            </View>
                            <Text
                              style={{paddingTop: 40, paddingHorizontal: 20}}>
                              ※ここで登録された栄養素は栄養素一覧には表示されません。
                              メモ用としてご利用ください。
                            </Text>
                          </View>
                        </View>
                      )}
                    </View>
                  </ScrollView>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop:
      winHeight * 0.15 -
      (isAndroid ? (getStatusBarHeight() ? getStatusBarHeight() : 0) : 0),
    marginBottom: winHeight * 0.15,
    // elevation: 10,
    // backgroundColor: 'rgba(221, 221, 221, 0.8)',
  },
  modalContainer: {
    overflow: 'hidden',
    // marginHorizontal: 15,
    // marginVertical: 130,
    ...shadowStyles(screenThemeColor.suppli).boxShadow,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 18,
  },
  modalBody: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingBottom: 30,
  },
  openButton: {
    borderRadius: 20,
    padding: 10,
    margin: 5,
    // elevation: 2,
    height: 40,
    ...shadowStyles(screenThemeColor.suppli).boxShadow,
    borderWidth: 2,
  },
  nutrientText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalTitleText: {
    margin: 13,
    marginBottom: 25,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    textDecorationLine: 'underline',
    textDecorationColor: screenThemeColor.suppli,
  },
  tabs: {
    minWidth: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    ...shadowStyles(screenThemeColor.suppli).boxShadow,
    backgroundColor: screenThemeColor.suppli,
    borderColor: 'white',
    borderWidth: 1,
  },
  tabText: {
    color: 'black',
    fontWeight: '500',
  },
  modalFormContainer: {
    marginTop: 20,
    width: '100%',
  },
  modalTextForm: {
    margin: 20,
    paddingHorizontal: 10,
    height: 50,
    fontSize: 20,
    borderRadius: 10,
  },
  modalBtnContainer: {
    alignItems: 'center',
  },
  modalBtn: {
    padding: 20,
    borderRadius: 10,
  },
  modalBtnText: {
    fontSize: 20,
  },
});
