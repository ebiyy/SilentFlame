import React, {useEffect} from 'react';
import {
  View,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {useForm} from 'react-hook-form';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ScrollView} from 'react-native-gesture-handler';
import {useHeaderHeight} from '@react-navigation/stack';
import PickerController from '../../components/picker-controller';
import TextInputController from '../../components/text-input-controller';
import {UnitOfWeight} from './constant';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginTop: 20,
    marginHorizontal: 30,
    flex: 1,
    justifyContent: 'space-around',
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    zIndex: 999,
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
    width: '33%',
    // marginTop: -72,
    padding: 0,
    maxHeight: 60,
    zIndex: 0,
  },
  button: {
    backgroundColor: 'purple',
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 10,
    marginTop: 40,
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
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={useHeaderHeight()}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView>
          <View style={styles.header}>
            <TextInputController
              control={control}
              controlName="supplementName"
              placeholder="サプリ名"
              defaultValue=""
              errors={errors}
            />
            <View style={styles.imageContainer}>
              <Icon name="image" size={100} color="#000" solid={true} />
            </View>

            <View style={styles.splitForm}>
              <View style={{width: '50%'}}>
                <TextInputController
                  control={control}
                  controlName="category"
                  placeholder="カテゴリー"
                  defaultValue=""
                  errors={errors}
                />
              </View>
              <View style={{width: '50%'}}>
                <TextInputController
                  control={control}
                  controlName="clindCategory"
                  placeholder="子カテゴリー"
                  defaultValue=""
                  errors={errors}
                />
              </View>
            </View>

            <View style={styles.splitForm}>
              <View style={{width: '66%'}}>
                <TextInputController
                  control={control}
                  controlName="priceValue"
                  placeholder="金額"
                  defaultValue=""
                  errors={errors}
                />
              </View>
              <View style={styles.pickerView}>
                <PickerController
                  control={control}
                  controlName="priceUnit"
                  items={['¥', '$']}
                  defaultValue={['¥', '$'][0]}
                  errors={errors}
                  marginTop={-78}
                />
              </View>
            </View>

            <View style={{...styles.splitForm, zIndex: 99, marginTop: 30}}>
              <View style={{width: '66%'}}>
                <TextInputController
                  control={control}
                  controlName="contentSizeValue"
                  placeholder="内容量"
                  defaultValue=""
                  errors={errors}
                />
              </View>
              <View style={styles.pickerView}>
                <PickerController
                  control={control}
                  controlName="contentSizeUnit"
                  items={['個', ...Object.values(UnitOfWeight)]}
                  defaultValue={['個', ...Object.values(UnitOfWeight)][0]}
                  errors={errors}
                  marginTop={-20}
                />
              </View>
            </View>

            <View style={styles.splitForm}>
              <View style={{width: '66%'}}>
                <TextInputController
                  control={control}
                  controlName="servingSize"
                  placeholder="1日分の値"
                  defaultValue=""
                  errors={errors}
                />
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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SupplementForm;
