import React from 'react';
import {Alert, Button, Modal, StyleSheet, Text, View} from 'react-native';

type Props = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalFunc: React.Dispatch<React.SetStateAction<'yes' | 'no' | undefined>>;
  modalTitle: string;
};

const ConfirmationModal = (props: Props) => {
  const {modalVisible, setModalVisible, modalFunc, modalTitle} = props;
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
              <Text style={styles.modalText}>{modalTitle}</Text>
              <View style={styles.modalContent}>
                <View style={styles.btnConteiner}>
                  <Button
                    title="はい"
                    onPress={() => {
                      modalFunc('yes');
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <View style={styles.btnConteiner}>
                  <Button
                    title="いいえ"
                    color="red"
                    onPress={() => {
                      modalFunc('no');
                      setModalVisible(!modalVisible);
                    }}
                  />
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  modalContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btnConteiner: {
    margin: 10,
    marginHorizontal: 20,
  },
});

export default ConfirmationModal;
