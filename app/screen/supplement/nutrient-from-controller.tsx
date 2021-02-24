import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import NutrientForm from './nutrient-from';
import {screenThemeColor, shadowStyles, winWidth} from '../../global-style';
import {Control, DeepMap, FieldError} from 'react-hook-form';
import {SuppliNutrient} from './suppli';
import {Text} from 'react-native-svg';

type Props = {
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  suppliNutrients: SuppliNutrient[] | undefined;
};

const NutrientFormController = (props: Props) => {
  const {control, errors, editable, suppliNutrients} = props;
  const [nutrientArrLen, setNutrientArrLen] = useState(
    suppliNutrients ? suppliNutrients.length : 1,
  );

  const isDeleteBtn = () => {
    console.log('suppliNutrients', suppliNutrients);
    if (suppliNutrients) {
      if (suppliNutrients.length < nutrientArrLen) {
        return true;
      }
    } else {
      if (nutrientArrLen > 1) {
        return true;
      }
    }
    return false;
  };

  type Props = {
    title: string;
    action: () => void;
  };

  const Btn = ({title, action}: Props) => (
    <View
      style={[
        shadowStyles(screenThemeColor.suppl).boxShadow,
        styles.buttonContainer,
      ]}>
      <Button color="black" title={title} onPress={action} />
    </View>
  );

  return (
    <>
      {[...Array(nutrientArrLen)].map((v, i) => (
        <NutrientForm
          key={i}
          index={i}
          control={control}
          errors={errors}
          nutrient={suppliNutrients ? suppliNutrients[i] : undefined}
          editable={editable}
        />
      ))}
      {editable && (
        <View
          style={[
            isDeleteBtn()
              ? {flexDirection: 'row', justifyContent: 'center'}
              : {},
          ]}>
          <Btn
            title="栄養素を追加"
            action={() => setNutrientArrLen((preState) => ++preState)}
          />
          {isDeleteBtn() && (
            <Btn
              title="栄養素を削除"
              action={() => setNutrientArrLen((preState) => --preState)}
            />
          )}
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 65,
    margin: 3,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: winWidth / 2.5,
    alignSelf: 'center',
  },
});

export default NutrientFormController;
