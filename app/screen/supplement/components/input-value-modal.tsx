import React, {useState} from 'react';
import {Alert, Button, Modal, StyleSheet, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {shadowStyles} from '../../../global-style';
import {ContentSizeUnit} from '../suppli';

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  contentSizeUnit: ContentSizeUnit;
  switchCount: boolean;
};

const InputValueModal = (props: Props) => {
  const {
    modalVisible,
    setModalVisible,
    setCount,
    contentSizeUnit,
    switchCount,
  } = props;
  const [inputText, setInputText] = useState('');
  return (
    <View>
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.modalContent}>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.textInput}
                    onChangeText={(v) => {
                      setInputText(v);
                    }}
                    value={inputText}
                    placeholder="数値を入力"
                    placeholderTextColor="lightgray"
                    clearButtonMode="always"
                    keyboardType="numeric"
                  />
                  <View style={styles.contentSizeTextContainer}>
                    <Text style={{fontSize: 24}}>{contentSizeUnit}</Text>
                  </View>
                </View>
                <View style={styles.btnConteiner}>
                  <View style={styles.btn}>
                    <Button
                      title="入力"
                      onPress={() => {
                        setCount((preState) =>
                          switchCount
                            ? preState + Number(inputText)
                            : preState - Number(inputText) >= 0
                            ? preState - Number(inputText)
                            : 0,
                        );
                        setInputText('');
                        setModalVisible(!modalVisible);
                      }}
                    />
                  </View>
                  <View style={styles.btn}>
                    <Button
                      title="キャンセル"
                      color="red"
                      onPress={() => setModalVisible(!modalVisible)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(221, 221, 221, 0.7)',
    // opacity: 0.7,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    // padding: 15,
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
  modalContent: {
    marginTop: 10,
  },
  btnConteiner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    margin: 10,
    padding: 12,
    borderRadius: 10,
    ...shadowStyles('#ddd').boxShadow,
  },
  textInput: {
    height: 40,
    paddingLeft: 10,
    width: '65%',
    borderColor: '#000000',
    borderBottomWidth: 1,
    // marginBottom: 36,
    marginTop: 10,
    marginLeft: 15,
    fontSize: 18,
  },
  textInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  contentSizeTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    paddingTop: 10,
  },
});

export default InputValueModal;
