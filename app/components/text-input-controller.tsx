import React from 'react';
import {Controller, Control, DeepMap, FieldError} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';
import {useRecoilState} from 'recoil';
import {shadowStyles} from '../global/styles';
import {isScrollState} from '../features/suppli/suppli.hook';

type Props = {
  control: Control<Record<string, any>>;
  controlName: string;
  placeholder: string;
  defaultValue: string;
  errors: DeepMap<Record<string, any>, FieldError>;
  isNum?: boolean;
  editable: boolean;
  borderColor?: string;
  required?: boolean;
};

export const TextInputController = (props: Props) => {
  const {
    control,
    controlName,
    placeholder,
    defaultValue,
    errors,
    isNum = false,
    editable,
    borderColor = 'black',
    required = true,
  } = props;
  const [isScroll, setIsScroll] = useRecoilState(isScrollState);

  return (
    <Controller
      control={control}
      render={({onChange, onBlur, value}) => (
        <TextInput
          style={[
            styles.input,
            shadowStyles(borderColor).boxShadow,
            errors[controlName] ? styles.invalid : styles.valid,
          ]}
          onBlur={onBlur}
          onChangeText={(v) => onChange(v)}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="lightgray"
          keyboardType={isNum ? 'numeric' : 'default'}
          editable={editable}
          onFocus={() => {
            setIsScroll(true);
          }}
        />
      )}
      name={controlName}
      rules={{required: required}}
      defaultValue={defaultValue}
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
  },
  valid: {
    // borderColor: 'gray',
    color: 'black',
  },
  invalid: {
    borderColor: '#fa98b1',
    color: 'red',
  },
});
