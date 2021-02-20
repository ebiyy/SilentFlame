import React from 'react';
import {Controller, Control, DeepMap, FieldError} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';

type Props = {
  control: Control<Record<string, any>>;
  controlName: string;
  items: string[];
  defaultValue: string;
  errors: DeepMap<Record<string, any>, FieldError>;
  marginTop: number;
};

const PickerController = (props: Props) => {
  const {control, controlName, items, defaultValue, errors, marginTop} = props;
  return (
    <Controller
      control={control}
      render={({onChange, onBlur, value}) => (
        <Picker
          selectedValue={value}
          onValueChange={(v) => onChange(v)}
          style={{
            marginTop: marginTop,
          }}>
          {items.map((str, i) => (
            <Picker.Item key={i} label={str} value={str} />
          ))}
        </Picker>
      )}
      name={controlName}
      rules={{required: true}}
      defaultValue={defaultValue}
    />
  );
};

export default PickerController;
