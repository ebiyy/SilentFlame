import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Control, DeepMap, FieldError} from 'react-hook-form';
import PickerController from '../../components/picker-controller';
import TextInputController from '../../components/text-input-controller';
import {CONTENT_SIZE_UNIT} from './constant';
import CameraFormController from '../../components/camera-form-controller';
import {SuppliBaseInfo} from './suppli';

type Props = {
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  suppliBaseInfo: SuppliBaseInfo | undefined;
};

const SupplementForm = (props: Props) => {
  const {control, errors, editable, suppliBaseInfo} = props;

  return (
    <>
      <TextInputController
        control={control}
        controlName="suppliName"
        placeholder="サプリ名"
        defaultValue={suppliBaseInfo ? suppliBaseInfo.suppliName : ''}
        errors={errors}
        editable={editable}
      />
      <CameraFormController
        control={control}
        errors={errors}
        editable={editable}
        defaultValue={suppliBaseInfo ? suppliBaseInfo.imageRes : undefined}
      />
      {/* <View style={styles.splitForm}>
              <View style={{width: '50%'}}>
                <TextInputController
                  control={control}
                  controlName="category"
                  placeholder="カテゴリー"
                  defaultValue=""
                  errors={errors}
                  editable={editable}
                />
              </View>
              <View style={{width: '50%'}}>
                <TextInputController
                  control={control}
                  controlName="clindCategory"
                  placeholder="子カテゴリー"
                  defaultValue=""
                  errors={errors}
                  editable={editable}
                />
              </View>
            </View> */}

      <View style={styles.splitForm}>
        <View style={{width: '66%'}}>
          <TextInputController
            control={control}
            controlName="priceValue"
            placeholder="金額"
            defaultValue={
              suppliBaseInfo ? String(suppliBaseInfo.priceValue) : ''
            }
            errors={errors}
            isNum={true}
            editable={editable}
            required={false}
          />
        </View>
        <View style={styles.pickerView}>
          <PickerController
            control={control}
            controlName="priceUnit"
            items={
              editable
                ? ['¥', '$']
                : suppliBaseInfo
                ? [suppliBaseInfo.priceUnit]
                : ['¥']
            }
            defaultValue={suppliBaseInfo ? suppliBaseInfo.priceUnit : '¥'}
            errors={errors}
            marginTop={-78}
          />
        </View>
      </View>

      <View style={[styles.splitForm, {marginTop: 30}]}>
        <View style={{width: '66%'}}>
          <TextInputController
            control={control}
            controlName="contentSizeValue"
            placeholder="内容量"
            defaultValue={
              suppliBaseInfo ? String(suppliBaseInfo.contentSizeValue) : ''
            }
            errors={errors}
            isNum={true}
            editable={editable}
            required={false}
          />
        </View>
        <View style={styles.pickerView}>
          <PickerController
            control={control}
            controlName="contentSizeUnit"
            items={
              editable
                ? Object.values(CONTENT_SIZE_UNIT)
                : suppliBaseInfo
                ? [suppliBaseInfo.contentSizeUnit]
                : ['個']
            }
            defaultValue={
              suppliBaseInfo ? suppliBaseInfo.contentSizeUnit : '個'
            }
            errors={errors}
            marginTop={-40}
          />
        </View>
      </View>

      <View style={styles.splitForm}>
        <View style={{width: '66%'}}>
          <TextInputController
            control={control}
            controlName="servingSize"
            placeholder="1日分の量"
            defaultValue={
              suppliBaseInfo ? String(suppliBaseInfo.servingSize) : ''
            }
            errors={errors}
            isNum={true}
            editable={editable}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  splitForm: {
    flexDirection: 'row',
  },
  pickerView: {
    width: '33%',
    padding: 0,
    maxHeight: 60,
    zIndex: 0,
  },
});

export default SupplementForm;
