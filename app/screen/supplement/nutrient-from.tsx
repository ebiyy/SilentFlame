import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import NutrientNameModal from './nutrient-name-modal';
import {Nutrient, UnitOfWeight} from './constant';

type Props = {
  index: number;
  nutrientObj: Nutrient | null;
  isEditable: boolean;
  setNutrientArr: React.Dispatch<React.SetStateAction<Nutrient[]>>;
};

const NutrientForm = (props: Props) => {
  const [singleIsEditable, setSingleIsEditable] = useState(false);
  const {control, handleSubmit, errors} = useForm();
  const [pickerVal, setPickerVal] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (props.isEditable) {
      setSingleIsEditable(true);
    } else {
      props.nutrientObj?.nutrientName === '' &&
        props.setNutrientArr((preState) =>
          preState.filter((item) => item.nutrientName !== ''),
        );
    }
  }, [props.isEditable]);

  const onSubmit = (data) => {
    const tmp: Nutrient = {
      nutrientName: data.nutrientName,
      amountPerServing: {
        value: data.amountPerServingValue,
        unit: data.amountPerServingUnit,
      },
      perDailyValue: data.perDailyValue,
    };
    props.setNutrientArr((preState) => {
      preState[props.index] = tmp;
      return preState;
    });
    setPickerVal(data.amountPerServingUnit);
    setSingleIsEditable(!singleIsEditable);
  };

  return (
    <>
      <View style={styles.nutrientContainer}>
        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <>
              <NutrientNameModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                nutrientNameValue={value}
                nutrientNameOnChange={onChange}
              />
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                placeholder="栄養素名"
                editable={props.isEditable && singleIsEditable}
                onFocus={() => {
                  Keyboard.dismiss();
                  setModalVisible((bool) => !bool);
                  // By using ScrollView when the user taps outside of textInput, keyboard dismissed.
                  // https://stackoverflow.com/questions/43431896/unfocus-a-textinput-in-react-native
                }}
              />
            </>
          )}
          name="nutrientName"
          rules={{required: true}}
          defaultValue={
            (props.nutrientObj && props.nutrientObj.nutrientName) || ''
          }
        />
        {errors.nutrientName && <Text>入力してください</Text>}

        <View style={styles.splitForm}>
          <View style={{width: '66%'}}>
            <Controller
              control={control}
              render={({onChange, onBlur, value}) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  placeholder="1回分の成分量"
                  editable={props.isEditable && singleIsEditable}
                />
              )}
              name="amountPerServingValue"
              rules={{required: true}}
              defaultValue={
                (props.nutrientObj &&
                  props.nutrientObj.amountPerServing.value.toString()) ||
                ''
              }
            />
            {errors.amountPerServingValue && <Text>入力してください</Text>}
          </View>

          {(props.isEditable && singleIsEditable && (
            <View style={styles.pickerView}>
              <Controller
                control={control}
                render={({onChange, onBlur, value}) => (
                  <Picker
                    selectedValue={value || UnitOfWeight.mcg}
                    onValueChange={(value) => onChange(value)}>
                    {Object.values(UnitOfWeight).map((v, index) => (
                      <Picker.Item key={index} label={v} value={v} />
                    ))}
                  </Picker>
                )}
                name="amountPerServingUnit"
                rules={{required: true}}
                defaultValue={
                  (props.nutrientObj &&
                    props.nutrientObj.amountPerServing.unit) ||
                  ''
                }
              />
              {errors.amountPerServingUnit && <Text>選択してください</Text>}
            </View>
          )) ||
            (props.nutrientObj && props.nutrientObj.amountPerServing.unit && (
              <View style={styles.unitConteiner}>
                <Text style={styles.unitText}>
                  {pickerVal || props.nutrientObj.amountPerServing.unit}
                </Text>
              </View>
            ))}
        </View>

        <Controller
          control={control}
          render={({onChange, onBlur, value}) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              placeholder="1日の推奨摂取量に対する割合（％）"
              editable={props.isEditable && singleIsEditable}
            />
          )}
          name="perDailyValue"
          defaultValue={
            (props.nutrientObj && props.nutrientObj.perDailyValue.toString()) ||
            ''
          }
        />
      </View>

      {props.isEditable && (
        <View style={styles.button}>
          <Button
            color="#FFFFFF"
            title={
              singleIsEditable ? 'この栄養素の編集を保存' : 'この栄養素を編集'
            }
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
  },
  button: {
    backgroundColor: 'purple',
    marginHorizontal: 40,
    padding: 15,
    borderRadius: 10,
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
  nutrientContainer: {
    marginTop: 20,
  },
  unitConteiner: {
    margin: 20,
  },
  unitText: {
    fontSize: 20,
  },
});

export default NutrientForm;
