import React, {useState} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import NutrientForm from './nutrient-from';
import {screenThemeColor, shadowStyles, winWidth} from '../../global-style';
import {Control, DeepMap, FieldError} from 'react-hook-form';
import {SuppliNutrient} from './suppli';

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
            shadowStyles(screenThemeColor.suppl).boxShadow,
            styles.buttonContainer,
          ]}>
          <Button
            color="black"
            title="栄養素を追加"
            onPress={() => setNutrientArrLen((preState) => ++preState)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    height: 75,
    margin: 3,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    width: winWidth / 2,
  },
});

export default NutrientFormController;
