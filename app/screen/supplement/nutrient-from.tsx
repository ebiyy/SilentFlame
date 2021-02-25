import React, {useEffect, useState} from 'react';
import {View, TextInput, StyleSheet, Keyboard} from 'react-native';
import {Controller, Control, DeepMap, FieldError} from 'react-hook-form';
import NutrientNameModal from './nutrient-name-modal';
import TextInputController from '../../components/text-input-controller';
import PickerController from '../../components/picker-controller';
import {FormType, SuppliNutrient} from './suppli';
import {CONTENT_SIZE_UNIT} from './constant';
import {shadowStyles} from '../../global-style';
import {useRecoilState} from 'recoil';
import {isScrollState} from './suppli.hook';

type Props = {
  index: number;
  nutrient: SuppliNutrient | undefined;
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  formType: FormType;
};

const NutrientForm = (props: Props) => {
  const {index, nutrient, control, errors, editable, formType} = props;
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <>
            <TextInput
              style={[
                styles.input,
                shadowStyles('black').boxShadow,
                errors[`${index}nutrientName`] ? styles.invalid : styles.valid,
              ]}
              onBlur={onBlur}
              onChangeText={(v) => onChange(v)}
              value={value}
              placeholder="栄養素名"
              placeholderTextColor="lightgray"
              editable={formType === 'water' && index === 0 ? false : editable}
              onFocus={() => {
                Keyboard.dismiss();
                setIsScroll(false);
                setModalVisible(true);
              }}
            />
            <NutrientNameModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              nutrientNameValue={value}
              nutrientNameOnChange={onChange}
            />
            {/* <DeleteConfirmationModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              deleteFunc={() => {}}
            /> */}
          </>
        )}
        name={`${index}nutrientName`}
        rules={{required: true}}
        defaultValue={nutrient ? nutrient.nutrientName : ''}
      />

      <View style={styles.splitForm}>
        <View style={{width: '66%'}}>
          <TextInputController
            control={control}
            controlName={`${index}amountPerServingValue`}
            placeholder="1回分の成分量"
            defaultValue={
              nutrient ? String(nutrient.amountPerServingValue) : ''
            }
            errors={errors}
            editable={formType === 'water' && index === 0 ? false : editable}
            isNum={true}
          />
        </View>
        <View style={styles.pickerView}>
          <PickerController
            control={control}
            controlName={`${index}amountPerServingUnit`}
            items={
              formType === 'water' && index === 0 && nutrient
                ? [nutrient.amountPerServingUnit]
                : editable
                ? Object.values(CONTENT_SIZE_UNIT)
                : nutrient
                ? [nutrient.amountPerServingUnit]
                : ['個']
            }
            defaultValue={
              nutrient ? nutrient.amountPerServingUnit : CONTENT_SIZE_UNIT.mcg
            }
            errors={errors}
            marginTop={-5}
          />
        </View>
      </View>

      {formType === 'suppli' && (
        <TextInputController
          control={control}
          controlName={`${index}perDailyValue`}
          placeholder="1日の推奨摂取量に対する割合（％）"
          defaultValue={
            nutrient && nutrient.perDailyValue
              ? String(nutrient.perDailyValue)
              : ''
          }
          errors={errors}
          isNum={true}
          editable={editable}
          required={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 4,
    padding: 10,
    zIndex: 999,
  },
  valid: {
    // borderColor: 'gray',
    color: 'black',
  },
  invalid: {
    borderColor: '#fa98b1',
    color: 'red',
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
});

export default NutrientForm;
