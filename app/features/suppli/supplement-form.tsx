import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Control, DeepMap, FieldError} from 'react-hook-form';
import {FORM_TYPE_CONTENT} from './constant';
import {FormType, SuppliBaseInfo} from './suppli';
import {CameraFormController} from '../../components/camera-form-controller';
import {TextInputController} from '../../components/text-input-controller';
import {UnitController} from '../../components/unit-controller';

type Props = {
  control: Control<Record<string, any>>;
  errors: DeepMap<Record<string, any>, FieldError>;
  editable: boolean;
  suppliBaseInfo: SuppliBaseInfo | undefined;
  formType: FormType;
};

export const SupplementForm = (props: Props) => {
  const {control, errors, editable, suppliBaseInfo, formType} = props;

  return (
    <>
      <TextInputController
        control={control}
        controlName={FORM_TYPE_CONTENT[formType].controlName.name}
        placeholder={FORM_TYPE_CONTENT[formType].placeholder.name}
        defaultValue={
          suppliBaseInfo
            ? suppliBaseInfo.suppliName || suppliBaseInfo.waterName
            : ''
        }
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
              suppliBaseInfo && suppliBaseInfo.priceValue
                ? String(suppliBaseInfo.priceValue)
                : ''
            }
            errors={errors}
            isNum={true}
            editable={editable}
            required={false}
          />
        </View>
        <View style={styles.pickerView}>
          <UnitController
            control={control}
            controlName="priceUnit"
            items={['¥', '$']}
            defaultValue={suppliBaseInfo ? suppliBaseInfo.priceUnit : '¥'}
            errors={errors}
            editable={editable}
          />
        </View>
      </View>

      <View
        style={[styles.splitForm, {marginTop: formType === 'suppli' ? 30 : 0}]}>
        <View style={{width: '66%'}}>
          <TextInputController
            control={control}
            controlName="contentSizeValue"
            placeholder="内容量"
            defaultValue={
              suppliBaseInfo && suppliBaseInfo.contentSizeValue
                ? String(suppliBaseInfo.contentSizeValue)
                : ''
            }
            errors={errors}
            isNum={true}
            editable={editable}
            required={false}
          />
          {formType === 'suppli' && (
            <>
              <TextInputController
                control={control}
                controlName="servingSize"
                placeholder="1日分の量"
                defaultValue={
                  suppliBaseInfo && suppliBaseInfo.servingSize
                    ? String(suppliBaseInfo.servingSize)
                    : ''
                }
                errors={errors}
                isNum={true}
                editable={editable}
                required={false}
              />
              <TextInputController
                control={control}
                controlName="amountPerServing"
                placeholder="1回分の量"
                defaultValue={
                  suppliBaseInfo && suppliBaseInfo.amountPerServing
                    ? String(suppliBaseInfo.amountPerServing)
                    : ''
                }
                errors={errors}
                isNum={true}
                editable={editable}
              />
            </>
          )}
        </View>

        <View
          style={[
            styles.pickerView,
            {maxHeight: formType === 'suppli' ? 165 : 50},
          ]}>
          <View style={{height: '100%'}}>
            <UnitController
              control={control}
              controlName="contentSizeUnit"
              items={formType === 'suppli' ? ['個', 'g'] : ['ml', 'L']}
              defaultValue={
                suppliBaseInfo ? suppliBaseInfo.contentSizeUnit : ''
              }
              errors={errors}
              editable={editable}
              required={formType === 'suppli' ? true : false}
            />
          </View>
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
    maxHeight: 165,
    zIndex: 0,
  },
});
