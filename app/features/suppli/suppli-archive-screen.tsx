import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useRecoilState} from 'recoil';
import {ComStyles, screenThemeColor, shadowStyles} from '../../global/styles';
import {supplisState} from './suppli.hook';
import {Suppli} from './suppli';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TitleText} from '../../components/title-text';
import {ConfirmationModal} from './components/confirmation-modal';

export const SuppliArchiveScreen = () => {
  const navigation = useNavigation();
  const [supplis, setSupplis] = useRecoilState(supplisState);
  const [isModal, setIsModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalType, setModalType] = useState<'delete' | 'restore'>();
  const [tapButton, setTapButton] = useState<'yes' | 'no'>();
  const [selectSuppli, setSelectSuppli] = useState<Suppli>();

  useEffect(() => {
    if (tapButton === 'yes' && modalType === 'restore' && selectSuppli) {
      setSupplis((preState) =>
        preState.map((obj) =>
          obj.id !== selectSuppli.id
            ? obj
            : Object.assign({...obj}, {delete: false}),
        ),
      );
    }
    if (tapButton === 'yes' && modalType === 'delete' && selectSuppli) {
      setSupplis((preState) =>
        preState.filter((obj) => obj.id !== selectSuppli.id),
      );
    }
    setTapButton(undefined);
  }, [tapButton]);

  return (
    <>
      <View style={{marginVertical: 10}}>
        <TitleText title="アーカイブ済み" />
      </View>

      {supplis
        .filter((suppli) => suppli.delete)
        .map((suppli, i) => (
          <View key={i} style={Styles.countSupplContainer}>
            <TouchableHighlight
              style={{alignSelf: 'center'}}
              underlayColor="white"
              onPress={() => {
                setSelectSuppli(suppli);
                setModalType('delete');
                setModalTitle('このサプリを完全に削除しますか？');
                setIsModal(true);
              }}>
              <Fontisto name="close" size={35} color="lightpink" />
            </TouchableHighlight>

            <View
              style={[
                Styles.supplNameContainer,
                shadowStyles(screenThemeColor.suppli).boxShadow,
              ]}>
              <TouchableOpacity
                style={[ComStyles.centeringContainer]}
                onPress={() => {
                  navigation.navigate('SupplFormScreen', {
                    mode: 'view',
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

            <View style={[Styles.counterContainer]}>
              <TouchableOpacity
                onPress={() => {
                  setSelectSuppli(suppli);
                  setModalType('restore');
                  setModalTitle('このサプリを戻しますか？');
                  setIsModal(true);
                }}>
                <View style={Styles.counterIcon}>
                  <MaterialCommunityIcons name="backup-restore" size={40} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ))}

      <ConfirmationModal
        modalVisible={isModal}
        setModalVisible={setIsModal}
        modalFunc={setTapButton}
        modalTitle={modalTitle}
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
