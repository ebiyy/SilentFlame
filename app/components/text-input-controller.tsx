import React, {useEffect, useState} from 'react';
import {Controller, Control, DeepMap, FieldError} from 'react-hook-form';
import {StyleSheet, TextInput} from 'react-native';

type Props = {
  control: Control<Record<string, any>>;
  controlName: string;
  placeholder: string;
  defaultValue: string;
  errors: DeepMap<Record<string, any>, FieldError>;
};

const TextInputController = (props: Props) => {
  const [isError, setIsError] = useState(props.errors[props.controlName]);

  useEffect(() => {
    setIsError(props.errors[props.controlName]);
  }, [props.errors]);

  return (
    <Controller
      control={props.control}
      render={({onChange, onBlur, value}) => (
        <TextInput
          style={[styles.input, isError ? styles.invalid : styles.valid]}
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
          placeholder={props.placeholder}
          placeholderTextColor="lightgray"
        />
      )}
      name={props.controlName}
      rules={{required: true}}
      defaultValue={props.defaultValue}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    zIndex: 999,
  },
  valid: {
    borderColor: 'gray',
    color: 'black',
  },
  invalid: {
    borderColor: 'red',
    color: 'red',
  },
});

export default TextInputController;
