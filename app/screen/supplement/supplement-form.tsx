import React from 'react';
import {Text, View, TextInput, Button, Alert, StyleSheet***REMOVED*** from 'react-native';
import {useForm, Controller***REMOVED*** from 'react-hook-form';

const styles = StyleSheet.create({
  header: {
    marginTop: 100,
***REMOVED***
  input: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    margin: 30,
    padding: 10,
***REMOVED***
***REMOVED***

const SupplementForm = () => {
  const {control, handleSubmit, errors***REMOVED*** = useForm();
  const onSubmit = (data) => console.log(data);

***REMOVED***
    <View style={styles.header***REMOVED***>
      <Controller
        control={control***REMOVED***
        render={({onChange, onBlur, value***REMOVED***) => (
          <TextInput
            style={styles.input***REMOVED***
            onBlur={onBlur***REMOVED***
            onChangeText={(value) => onChange(value)***REMOVED***
            value={value***REMOVED***
          />
        )***REMOVED***
        name="firstName"
        rules={{required: true***REMOVED******REMOVED***
        defaultValue=""
      />
      {errors.firstName && <Text>This is required.</Text>***REMOVED***

      <Controller
        control={control***REMOVED***
        render={({onChange, onBlur, value***REMOVED***) => (
          <TextInput
            style={styles.input***REMOVED***
            onBlur={onBlur***REMOVED***
            onChangeText={(value) => onChange(value)***REMOVED***
            value={value***REMOVED***
          />
        )***REMOVED***
        name="lastName"
        defaultValue=""
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)***REMOVED*** />
    </View>
***REMOVED***
***REMOVED***

export default SupplementForm;
