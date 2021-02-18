import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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
import {ComStyles, screenThemeColor, shadowStyles} from '../global-style';
import {supplsState} from '../screen/supplement/suppl.hook';
import DeleteConfirmationModal from './delete-confirmation-modal';
import FadeInView from './fade-in-view';

type Props = {
  supplementName: string;
  switchCount: boolean;
  isDelete: boolean;
};

const CountSupplement = (props: Props) => {
  const {supplementName, switchCount, isDelete} = props;
  const [count, setCount] = useState(0);
  const navigation = useNavigation();
  const [suppls, setSuppls] = useRecoilState(supplsState);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <View style={Styles.countSupplContainer}>
        {isDelete ? (
          <TouchableHighlight
            style={{alignSelf: 'center'}}
            underlayColor="white"
            onPress={() => {
              setModalVisible((state) => !state);
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
            onPress={() =>
              navigation.navigate('NutrientFormController', {
                mySppliId: 1,
                isEditable: false,
              })
            }>
            <View>
              <Text style={Styles.nameText}>{supplementName}</Text>
            </View>
          </TouchableOpacity>
        </View>
        {!isDelete && (
          <View style={[Styles.counterContainer]}>
            {switchCount ? (
              <TouchableOpacity onPress={() => setCount(count + 1)}>
                <View style={Styles.counterIcon}>
                  <FontAwesome5 name="plus-circle" size={40} />
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={Styles.counterIcon}
                onPress={() => setCount(count - 1 >= 0 ? count - 1 : 0)}>
                <View style={Styles.counterIcon}>
                  <FontAwesome5 name="minus-circle" size={40} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      <DeleteConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteFunc={() =>
          setSuppls((preState) =>
            preState.map((suppl) =>
              suppl.supplementName !== supplementName
                ? suppl
                : {...suppl, delete: true},
            ),
          )
        }
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
