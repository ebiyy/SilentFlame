import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import {screenThemeColor, shadowStyles, winWidth} from '../../global/styles';
import {Control, DeepMap, FieldError} from 'react-hook-form';
import {FormType, SuppliNutrient} from './suppli';
import {NutrientForm} from './nutrient-from';

type Props = {
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  suppliNutrients: SuppliNutrient[] | undefined;
  formType: FormType;
};

export const NutrientFormController = (props: Props) => {
  const {control, errors, editable, suppliNutrients, formType} = props;
  const [nutrientArrLen, setNutrientArrLen] = useState(
    suppliNutrients ? suppliNutrients.length : 1,
  );

  const isDeleteBtn = () => {
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
        shadowStyles(screenThemeColor[formType]).boxShadow,
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
          formType={formType}
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
