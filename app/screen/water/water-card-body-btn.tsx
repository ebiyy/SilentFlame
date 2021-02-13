import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {shadowStyles} from '../../global-style';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {waterIntakeState} from '../meals/recoil.meal';
import {useRecoilState} from 'recoil';

type Props = {
  patten: {
    name: string;
    label: number;
  };
  waterName: string;
  isMinus: boolean;
};

const WaterCardBodyBtn = (props: Props) => {
  const {patten, waterName, isMinus} = props;
  const [waterIntake, setwWterIntake] = useRecoilState(waterIntakeState);

  const addWater = () => {
    setwWterIntake((preState) => [
      ...preState,
      {name: waterName, intake: patten.label},
    ]);
  };

  const minusWater = () => {
    setwWterIntake((preState) => {
      const notMatchObj = preState.filter(
        (obj) => obj.name !== waterName || obj.intake !== patten.label,
      );
      const matchObj = preState.filter(
        (obj) => obj.name === waterName && obj.intake === patten.label,
      );
      matchObj.pop();
      return notMatchObj.concat(matchObj);
    });
  };

  const badge = waterIntake.filter(
    (water) => water.name === waterName && water.intake === patten.label,
  ).length;

  return (
    <TouchableOpacity onPress={isMinus ? minusWater : addWater}>
      <View
        style={[Styles.iconBtnConatiner, shadowStyles('lightblue').boxShadow]}>
        <MaterialCommunityIcons
          name={patten.name}
          color="lightblue"
          size={45}
        />
        <Text style={Styles.labelText}>{patten.label} ml</Text>
        <View style={Styles.badgeContainer}>
          <Text style={Styles.badgeText}>{badge}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Styles = StyleSheet.create({
  iconBtnConatiner: {
    marginTop: 20,
    margin: 5,
    padding: 5,
    borderRadius: 10,
    justifyContent: 'center',
    position: 'relative',
  },
  labelText: {
    color: 'black',
    alignSelf: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: -12,
    right: -8,
    backgroundColor: 'lightpink',
    borderRadius: 10,
    shadowColor: 'lightblue',
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
    paddingVertical: 1,
    paddingHorizontal: 7,
    fontSize: 18,
  },
});

export default WaterCardBodyBtn;
