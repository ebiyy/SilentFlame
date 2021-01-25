import React, {useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {UnitOfWeight} from './nutrient-from-controller';
import {Picker} from '@react-native-picker/picker';

const styles = StyleSheet.create({
  header: {
    marginTop: 50,
    marginHorizontal: 30,
  },
  input: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  imageContainer: {
    backgroundColor: '#d1d1d1',
    padding: 55,
    alignItems: 'center',
    marginBottom: 15,
  },
  splitForm: {
    flexDirection: 'row',
  },
  pickerView: {
    width: '50%',
    marginTop: -80,
    padding: 0,
    maxHeight: 60,
  },
  button: {
    backgroundColor: 'purple',
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
  },
});

const SupplementForm = ({navigation, route}) => {
  const {control, handleSubmit, errors} = useForm();
  const onSubmit = (data) => console.log(data);

  useEffect(() => {
    navigation.setOptions({
      title: 'サプリを登録',
    });
  }, []);

  return (
    <View style={styles.header}>
      <Controller
        control={control}
        render={({onChange, onBlur, value}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            placeholder="サプリ名"
          />
        )}
        name="supplementName"
        rules={{required: true}}
        defaultValue=""
      />
      {errors.supplementName && <Text>This is required.</Text>}

      <View style={styles.imageContainer}>
        <Icon name="image" size={100} color="#000" solid={true} />
      </View>

      <View style={styles.splitForm}>
        <View style={{width: '50%'}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="カテゴリー"
              />
            )}
            name="category"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.category && <Text>入力してください</Text>}
        </View>
        <View style={{width: '50%'}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="子カテゴリー"
              />
            )}
            name="clindCategory"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.clindCategory && <Text>入力してください</Text>}
        </View>
      </View>

      <View style={styles.splitForm}>
        <View style={{width: '50%'}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="金額"
              />
            )}
            name="priceValue"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.priceValue && <Text>入力してください</Text>}
        </View>
        <View style={styles.pickerView}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Picker
                selectedValue={value || UnitOfWeight.mcg}
                onValueChange={(value) => onChange(value)}>
                {/* {Object.values(UnitOfWeight).map((v, index) => (
                  <Picker.Item key={index} label={v} value={v} />
                ))} */}
                <Picker.Item label="¥" value="¥" />
                <Picker.Item label="$" value="$" />
              </Picker>
            )}
            name="priceUnit"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.priceUnit && <Text>選択してください</Text>}
        </View>
      </View>

      <View style={{...styles.splitForm, marginTop: 20}}>
        <View style={{width: '50%'}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="内容量"
              />
            )}
            name="contentSizeValue"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.contentSizeValue && <Text>入力してください</Text>}
        </View>
        <View style={{...styles.pickerView, paddingTop: 10}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <Picker
                selectedValue={value || 'コ'}
                onValueChange={(value) => onChange(value)}>
                <Picker.Item label="コ" value="コ" />
                {Object.values(UnitOfWeight).map((v, index) => (
                  <Picker.Item key={index} label={v} value={v} />
                ))}
              </Picker>
            )}
            name="contentSizeUnit"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.contentSizeUnit && <Text>選択してください</Text>}
        </View>
      </View>

      <View style={styles.splitForm}>
        <View style={{width: '50%'}}>
          <Controller
            control={control}
            render={({onChange, onBlur, value}) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="1日分の値"
              />
            )}
            name="servingSize"
            rules={{required: true}}
            defaultValue=""
          />
          {errors.servingSize && <Text>入力してください</Text>}
        </View>
      </View>

      <View style={styles.button}>
        <Button
          color="#FFFFFF"
          title="続けて栄養素も登録"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

export default SupplementForm;
