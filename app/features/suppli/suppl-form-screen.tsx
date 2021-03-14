import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  screenThemeColor,
  shadowStyles,
  winHeight,
  winWidth,
} from '../../global/styles';
import {SetterOrUpdater, useRecoilValue} from 'recoil';
import {imageResState, isScrollState} from './suppli.hook';
import {FormType, Suppli, SuppliBaseInfo, SuppliNutrient} from './suppli';
import {userIdState} from '../init-app/init-app.recoil';
import {FORM_TYPE_CONTENT, NUTRIENT_KEY} from './constant';
import {Divider} from '../../components/divider';
import {TitleText} from '../../components/title-text';
import {NutrientFormController} from './nutrient-from-controller';
import {SupplementForm} from './supplement-form';
import {isAndroid} from '@freakycoder/react-native-helpers';

type Params = {
  mode: 'add' | 'view' | 'edit';
  viewTarget?: Suppli | any;
  setMarge: SetterOrUpdater<any[]>;
  btnColor: string;
};

export const SupplFormScreen = ({navigation, route}) => {
  const {
    mode,
    viewTarget = undefined,
    setMarge,
    btnColor,
  } = route.params as Params;
  const {control, handleSubmit, errors} = useForm();
  const [editable, setEditable] = useState(mode === 'add');
  const isScroll = useRecoilValue(isScrollState);
  const imageRes = useRecoilValue(imageResState);
  const userId = useRecoilValue(userIdState);
  const [formType, setFormType] = useState<FormType>(
    btnColor === screenThemeColor.suppli ? 'suppli' : 'water',
  );

  const onSubmit = (formValus) => {
    console.log('SupplementForm', formValus, errors);
    if (Object.entries(errors).length === 0) {
      const nutrients: SuppliNutrient[] = [];
      // 栄養素のformNameを`${index}amountPerServingUnit`
      // に設定しているので、indexを元に配列化
      Object.keys(formValus).forEach((key) => {
        const firstNum = Number(key.slice(0, 1));
        if (!isNaN(firstNum)) {
          const addObj = {
            [key.slice(1, key.length)]: formValus[key],
          };
          nutrients[firstNum] = nutrients[firstNum]
            ? Object.assign(nutrients[firstNum], addObj)
            : addObj;
          delete formValus[key];
        } else if (
          // 文字列で持っている数値を数値化
          ['priceValue', 'contentSizeValue', 'servingSize'].includes(key)
        ) {
          formValus[key] = Number(formValus[key]);
        }
      });
      nutrients.map((nutrient) => {
        Object.entries(NUTRIENT_KEY).forEach(([key, value]) => {
          if (value.label === nutrient.nutrientName) {
            nutrient['nutrientKey'] = key;
          }
        });
      });
      formValus['nutrients'] = nutrients;
      formValus['updateAt'] = new Date();
      const margeFormValus = Object.assign(
        {...formValus},
        {imageRes: imageRes},
      );
      // edit modeのみ
      if (mode === 'edit') {
        const updateSuppli = Object.assign({...viewTarget}, margeFormValus);
        console.log('SupplFormScreen::updateSuppli', updateSuppli);
        setMarge((preState) =>
          preState.map((obj) =>
            obj.id === viewTarget.id ? updateSuppli : obj,
          ),
        );
      } else {
        margeFormValus['id'] = Math.floor(new Date().getTime() / 1000);
        margeFormValus['createdAt'] = new Date();
        margeFormValus['author'] = userId;
        console.log('SupplFormScreen::margeFormValus', margeFormValus);
        setMarge((preState) => {
          return [...preState, margeFormValus];
        });
      }
      navigation.goBack();
    }
  };

  const SubmitBtn = () => (
    <View style={Styles.btnSection}>
      <View style={[shadowStyles(btnColor).boxShadow, Styles.buttonContainer]}>
        <Button
          color="black"
          title={editable ? (mode === 'edit' ? '編集終了' : '登録') : '編集'}
          onPress={
            editable
              ? handleSubmit(onSubmit)
              : () => {
                  setEditable((state) => !state);
                }
          }
        />
      </View>
    </View>
  );

  useEffect(() => {
    console.log('SupplementForm::error', errors);
    // console.log('SupplementForm::control', control);
  }, [errors]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        extraScrollHeight={100}
        enableAutomaticScroll={isScroll}>
        <ScrollView style={Styles.container} scrollEnabled={isScroll}>
          {mode !== 'view' && <SubmitBtn />}

          <TitleText title="基本情報" />
          <SupplementForm
            control={control}
            errors={errors}
            editable={editable}
            suppliBaseInfo={(() => {
              if (viewTarget && viewTarget.id) {
                const suppliBaseInfo = {...viewTarget};
                delete suppliBaseInfo.nutrients;
                return suppliBaseInfo as SuppliBaseInfo;
              } else {
                return undefined;
              }
            })()}
            formType={formType}
          />

          <Divider borderColor="white" />

          <TitleText title={FORM_TYPE_CONTENT[formType].nutirientsTitle} />
          <NutrientFormController
            control={control}
            errors={errors}
            editable={editable}
            suppliNutrients={viewTarget ? viewTarget.nutrients : undefined}
            formType={formType}
          />

          {mode !== 'view' && <SubmitBtn />}
        </ScrollView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: isAndroid ? winHeight * 0.1 : 20,
    flex: 1,
  },
  btnSection: {
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonContainer: {
    height: 75,
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: winWidth / 3,
  },
});
