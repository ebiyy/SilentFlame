import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {RecoilState, useRecoilState} from 'recoil';
import DeleteConfirmationModal from '../../components/delete-confirmation-modal';
import {screenThemeColor} from '../../global-style';

type Props = {
  selectItem: any;
  index: number;
  color: string;
  setWaters: SetterOrUpdater<any[]>;
  onPress: () => void;
  isMinus: boolean;
  setIsMinus: React.Dispatch<React.SetStateAction<boolean>>;
};

const CardEditIcons = (props: Props) => {
  const {
    selectItem,
    index,
    setWaters,
    onPress,
    color,
    isMinus,
    setIsMinus,
  } = props;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={Styles.iconContainer}>
        <TouchableOpacity
          style={[
            Styles.icon,
            {backgroundColor: isMinus ? 'lightpink' : color},
          ]}
          onPress={() => setIsMinus(!isMinus)}>
          <Icon
            name={isMinus ? 'minuscircleo' : 'pluscircleo'}
            size={22}
            color="white"
          />
        </TouchableOpacity>
        <View style={[Styles.icon, {backgroundColor: color}]}>
          <Icon
            name="infocirlceo"
            size={22}
            color="white"
            onPress={onPress}
            // onPress={() =>
            //   navigation.navigate('NutrientsScreen', {
            //     selectNutrient: selectItem,
            //     index: index,
            //     parentScreen: 'MealsScreen',
            //   })
            // }
          />
        </View>
        <View style={[Styles.icon, Styles.closeIcon]}>
          <Icon
            name="closecircleo"
            size={22}
            color="white"
            onPress={() => setModalVisible(true)}
          />
        </View>
      </View>
      <DeleteConfirmationModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        deleteFunc={() =>
          setWaters((preState) =>
            preState.filter((water) => water.id !== selectItem.id),
          )
        }
      />
    </>
  );
};

const Styles = StyleSheet.create({
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
    backgroundColor: screenThemeColor.meals,
  },
  closeIcon: {
    backgroundColor: '#ddd',
  },
});

export default CardEditIcons;
