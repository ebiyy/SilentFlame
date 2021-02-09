import React, {useEffect, useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import NutrientForm from './nutrient-from';
import {ScrollView} from 'react-native-gesture-handler';
import {Nutrient, UnitOfWeight} from './constant';

const Mode = {
  read: 'read',
  write: 'write',
};

type Props = {
  mode: typeof Mode[keyof typeof Mode];
  nutrientObj?: Nutrient[];
};

export interface MySuppli {
  mySppliId: number;
  nutrient: Nutrient[];
}

// 'Mega D-3 & MK-7'
const MOCK: MySuppli[] = [
  {
    mySppliId: 1,
    nutrient: [
      {
        nutrientName: 'ビタミンD3',
        amountPerServing: {
          value: 125,
          unit: UnitOfWeight.mcg,
        },
        perDailyValue: 625,
      },
      {
        nutrientName: 'ビタミンK2',
        amountPerServing: {
          value: 180,
          unit: UnitOfWeight.g,
        },
        perDailyValue: 150,
      },
    ],
  },
];

export const BLANK_NUTRIENT: Nutrient = {
  nutrientName: '',
  amountPerServing: {
    value: 0,
    unit: UnitOfWeight.mcg,
  },
  perDailyValue: 0,
};

const isNutrientArr = (mySppliId: number): Nutrient[] => {
  const check = MOCK.filter((obj) => obj.mySppliId === mySppliId);
  if (check.length > 0) {
    return check[0].nutrient;
  } else {
    return [BLANK_NUTRIENT];
  }
};

const NutrientFormController = ({navigation, route}) => {
  const {mySppliId, isEditable} = route.params;
  const [isEditableState, setIsEditableState] = useState(isEditable);
  const [nutrientArr, setNutrientArr] = useState(isNutrientArr(mySppliId));

  useEffect(() => {
    navigation.setOptions({
      title: '栄養素情報',
    });
  }, []);

  return (
    <ScrollView style={styles.header}>
      <View style={styles.inputContainer}>
        {!isEditable && (
          <View style={styles.button}>
            <Button
              color="#FFFFFF"
              title={isEditableState ? '編集終了' : '編集'}
              onPress={() => {
                setIsEditableState(!isEditableState);
              }}
            />
          </View>
        )}
        {nutrientArr.map((nutrientObj, i) => (
          <NutrientForm
            // key: Needed to revert from unsaved edited values.
            key={`${isEditableState}${i}`}
            index={i}
            nutrientObj={nutrientObj}
            isEditable={isEditableState}
            setNutrientArr={setNutrientArr}
          />
        ))}
        {isEditableState && (
          <View style={styles.button}>
            <Button
              color="#FFFFFF"
              title="栄養素を追加"
              // onPress={handleSubmit(onSubmit)}
              onPress={() =>
                setNutrientArr((preState) => [...preState, BLANK_NUTRIENT])
              }
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
  },
  inputContainer: {
    marginHorizontal: 30,
  },
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'purple',
    marginHorizontal: 100,
    marginTop: 40,
    padding: 15,
    borderRadius: 10,
  },
  wideButton: {
    backgroundColor: 'purple',
    marginHorizontal: 50,
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  splitForm: {
    flexDirection: 'row',
  },
  pickerView: {
    width: '33%',
    marginTop: -72,
    padding: 0,
    maxHeight: 60,
  },
  nutrientContainer: {
    marginBottom: 30,
  },
});

export default NutrientFormController;
