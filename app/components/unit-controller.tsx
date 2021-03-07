import React, {useRef} from 'react';
import {Controller, Control, DeepMap, FieldError} from 'react-hook-form';
import {TextInput, Keyboard, StyleSheet} from 'react-native';
import {shadowStyles} from '../global/styles';
import {SamplePickerModule} from '../sample/picker-module';

type Props = {
  control: Control<Record<string, any>>;
  controlName: string;
  items: string[];
  defaultValue: string;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  required?: boolean;
};

export const UnitController = (props: Props) => {
  const {
    control,
    controlName,
    items,
    defaultValue,
    errors,
    editable,
    required = true,
  } = props;
  const pickerRef = useRef();

  return (
    <Controller
      control={control}
      render={({onChange, onBlur, value}) => (
        <>
          <TextInput
            style={[
              styles.input,
              {height: controlName === 'contentSizeUnit' ? '100%' : 50},
              shadowStyles('black').boxShadow,
              errors[controlName] ? styles.invalid : styles.valid,
            ]}
            onBlur={onBlur}
            onChangeText={(v) => onChange(v)}
            value={value}
            placeholder="単位"
            placeholderTextColor="lightgray"
            editable={editable}
            onFocus={() => {
              Keyboard.dismiss();
              if (pickerRef && pickerRef.current) {
                pickerRef.current.show();
              }
            }}
          />
          <SamplePickerModule
            pickerRef={pickerRef}
            dataset={items}
            defaultValue={value}
            onChange={onChange}
          />
        </>
      )}
      name={controlName}
      rules={{required: required}}
      defaultValue={defaultValue ? defaultValue : ''}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 4,
    padding: 10,
    zIndex: 999,
    marginLeft: 8,
    fontSize: 15,
    textAlign: 'center',
  },
  valid: {
    color: 'black',
  },
  invalid: {
    borderColor: '#fa98b1',
    color: 'red',
  },
});
