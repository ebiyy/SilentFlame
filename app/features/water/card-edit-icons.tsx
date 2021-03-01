import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import {SetterOrUpdater, useRecoilValue} from 'recoil';
import {DeleteConfirmationModal} from '../../components/delete-confirmation-modal';
import {screenThemeColor} from '../../global/styles';
import {editableState} from '../date-manager/data-manager.recoil';

type Props = {
  selectItem: any;
  index: number;
  color: string;
  setWaters: SetterOrUpdater<any[]>;
  isMinus: boolean;
  setIsMinus: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CardEditIcons = (props: Props) => {
  const {selectItem, index, setWaters, color, isMinus, setIsMinus} = props;

  const [modalVisible, setModalVisible] = useState(false);
  const editable = useRecoilValue(editableState);
  const navigation = useNavigation();

  useEffect(() => {
    console.log('CardEditIcons', selectItem);
  }, [selectItem]);

  return (
    <>
      <View style={Styles.iconContainer}>
        {editable && (
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
        )}

        <View style={[Styles.icon, {backgroundColor: color}]}>
          <Icon
            name="infocirlceo"
            size={22}
            color="white"
            // onPress={onPress}
            onPress={() =>
              navigation.navigate('SupplFormScreen', {
                mode: editable ? 'edit' : 'view',
                viewTarget: selectItem,
                setMarge: setWaters,
                btnColor: screenThemeColor.water,
              })
            }
          />
        </View>
        {editable && (
          <View style={[Styles.icon, Styles.closeIcon]}>
            <Icon
              name="closecircleo"
              size={22}
              color="white"
              onPress={() => setModalVisible(true)}
            />
          </View>
        )}
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
