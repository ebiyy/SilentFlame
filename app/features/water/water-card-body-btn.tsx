import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {shadowStyles} from '../../global/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {waterIntakeState} from '../meal/recoil.meal';
import {useRecoilState, useRecoilValue} from 'recoil';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {dateState, editableState} from '../date-manager/data-manager.recoil';

type Props = {
  patten: {
    name: string;
    label: number;
    iconElm: string;
  };
  water: any;
  isMinus: boolean;
  holdCount: Object;
  setHoldCount: React.Dispatch<React.SetStateAction<Object>>;
};

export const WaterCardBodyBtn = (props: Props) => {
  const {patten, water, isMinus, holdCount, setHoldCount} = props;
  const [waterIntake, setwWterIntake] = useRecoilState(waterIntakeState);
  const [count, setCount] = useState(0);
  const editable = useRecoilValue(editableState);
  const date = useRecoilValue(dateState);

  useEffect(() => {
    setCount(0);
  }, [date]);

  useEffect(() => {
    // const temp = holdCount[water.id] && holdCount[water.id][patten.label];
    // setCount(temp ? temp : 0);
    if (
      holdCount[water.id] &&
      holdCount[water.id][patten.label] >= 0 &&
      count === 0
    ) {
      setCount(holdCount[water.id][patten.label]);
    }
    // if (Object.entries(holdCount).length === 0 && count !== 0) {
    //   setCount(0);
    // }
  }, [holdCount]);

  useEffect(() => {
    if (Object.entries(holdCount).length > 0 || count > 0) {
      const waterCount = holdCount[water.id];
      if (waterCount) {
        const marge = {...waterCount, ...{[patten.label]: count}};
        setHoldCount((preState) => {
          return {...preState, ...{[water.id]: marge}};
        });
      } else {
        setHoldCount((preState) => {
          return {...preState, ...{[water.id]: {[patten.label]: count}}};
        });
      }
    }
  }, [count]);

  const addWater = () => setCount(count + 1);

  const minusWater = () => setCount(count - 1 >= 0 ? count - 1 : 0);

  return (
    <TouchableOpacity
      onPress={editable ? (isMinus ? minusWater : addWater) : () => {}}>
      <View
        style={[Styles.iconBtnConatiner, shadowStyles('lightblue').boxShadow]}>
        {patten.iconElm === 'MaterialCommunityIcons' ? (
          <MaterialCommunityIcons
            name={patten.name}
            color="lightblue"
            size={45}
          />
        ) : (
          <SimpleLineIcons name={patten.name} color="lightblue" size={45} />
        )}

        <Text style={Styles.labelText}>{patten.label} ml</Text>
        <View style={Styles.badgeContainer}>
          <Text style={Styles.badgeText}>{count}</Text>
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
