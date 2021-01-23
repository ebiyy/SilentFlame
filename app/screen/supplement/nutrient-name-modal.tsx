import React, {useState} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

// プロテインはペプチドブレンドの詳細とかにもっと色々ある。。
const NUREIENT = [
  'タンパク質',
  '結合ペプチドブレンド',
  '総脂質',
  '飽和脂肪',
  '多価不飽和脂肪',
  '一価不飽和脂肪',
  '総炭水化物',
  'イヌリン',
  '食物繊維',
  '天然フィッシュオイル濃縮物',
  'EPA',
  'DHA',
  'ビタミンA',
  'ビタミンD',
  'ビタミンD3',
  'ビタミンE',
  'ビタミンK',
  'ビタミンK2',
  'ビタミンB1',
  'ビタミンB2',
  'ビタミンB6',
  'ビタミンB12',
  'ビタミンC',
  'ナイアシン',
  '葉酸',
  'イチョウエキス',
  'パントテン酸',
  'ビオチン',
  'コリン',
  'PABA',
  'ニアシン',
  'イノシトール',
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
];

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  nutrientNameValue: string;
  nutrientNameOnChange: (...event: any[]) => void;
};

const NutrientNameModal = (props: Props) => {
  // const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <ScrollView>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>栄養素を選ぼう！</Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                {NUREIENT.map((nutrient, i) => (
                  <TouchableHighlight
                    key={i}
                    style={{...styles.openButton, backgroundColor: '#2196F3'}}
                    onPress={() => {
                      props.nutrientNameOnChange(nutrient);
                      props.setModalVisible((bool) => !bool);
                    }}>
                    <Text style={styles.textStyle}>{nutrient}</Text>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
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

export default NutrientNameModal;
