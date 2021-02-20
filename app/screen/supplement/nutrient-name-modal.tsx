import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {screenThemeColor, shadowStyles, winHeight} from '../../global-style';

// プロテインはペプチドブレンドの詳細とかにもっと色々ある。。
const NUREIENT = {
  main: [
    'タンパク質',
    'アミノ酸',
    '総脂質',
    '総炭水化物',
    '食物繊維',
    // 'イヌリン',
    '飽和脂肪',
    '多価不飽和脂肪',
    '一価不飽和脂肪',
    '天然フィッシュオイル濃縮物',
    'EPA',
    'DHA',
  ],
  protein: [
    'BCAA',
    'グルタミン酸',
    'アラニン',
    'アルギニン',
    'アスパラギン酸',
    'オルニチン',
    'シスチン',
    'グルタミン酸',
    'グリシン',
    'ヒスチジン',
    'イソロイシン',
    'ロイシン',
    'リジン',
    'メチオニン',
    'フェニルアラニン',
    'プロリン',
    'セリン',
    'トレオニン',
    'トリプトファン',
    'チロシン',
    'バリン',
  ],
  vitamin: [
    'ビタミンA',
    'ビタミンD',
    'ビタミンD3',
    'ビタミンE',
    'ビタミンK',
    'ビタミンK2',
    'ビタミンC',
    'ビタミンB1',
    'ビタミンB2',
    'ビタミンB6',
    'ビタミンB12',
    'ナイアシン',
    '葉酸',
    'パントテン酸',
    'ビオチン',
    'コリン',
    'ニアシン',
    'イノシトール',
    'PABA',
  ],
  mineral: [
    'ナトリウム',
    'カリウム',
    'カルシウム',
    'マグネシウム',
    'リン',
    '鉄',
    '亜鉛',
    '銅',
    'マンガン',
    'ヨウ素',
    'セレン',
    'クロム',
    'モリブデン',
  ],
};

const TAB = [
  {dispName: '主な要素', key: 'main'},
  {dispName: 'たんぱく質', key: 'protein'},
  {dispName: 'ビタミン', key: 'vitamin'},
  {dispName: 'ミネラル', key: 'mineral'},
];

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  nutrientNameValue: string;
  nutrientNameOnChange: (...event: any[]) => void;
};

const NutrientNameModal = (props: Props) => {
  const {
    modalVisible,
    setModalVisible,
    nutrientNameValue,
    nutrientNameOnChange,
  } = props;
  const [tab, setTab] = useState(TAB[0].key);

  return (
    <View>
      {modalVisible && (
        <View style={styles.container}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
            }}>
            <View style={[styles.container]}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitleText}>栄養素を選択</Text>
                <View>
                  <View style={{flexDirection: 'row'}}>
                    {TAB.map((obj, i) => (
                      <TouchableOpacity key={i} onPress={() => setTab(obj.key)}>
                        <View style={styles.tabs}>
                          <Text style={styles.tabText}>{obj.dispName}</Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                  <ScrollView>
                    <View style={styles.modalBody}>
                      {NUREIENT[tab].map((nutrient, i) => (
                        <TouchableOpacity
                          key={i}
                          style={styles.openButton}
                          onPress={() => {
                            nutrientNameOnChange(nutrient);
                            setModalVisible(false);
                          }}>
                          <Text style={styles.nutrientText}>{nutrient}</Text>
                        </TouchableOpacity>
                      ))}
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
    ...shadowStyles(screenThemeColor.suppl).boxShadow,
    backgroundColor: 'rgba(221, 221, 221, 0.8)',
  },
  modalContainer: {
    overflow: 'hidden',
    marginHorizontal: 15,
    marginVertical: 130,
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
    elevation: 5,
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
    elevation: 2,
    height: 40,
    ...shadowStyles(screenThemeColor.suppl).boxShadow,
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
    textDecorationColor: screenThemeColor.suppl,
  },
  tabs: {
    minWidth: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 5,
    ...shadowStyles(screenThemeColor.suppl).boxShadow,
    backgroundColor: screenThemeColor.suppl,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 18,
  },
  tabText: {
    color: 'black',
    fontWeight: '500',
  },
});

export default NutrientNameModal;
