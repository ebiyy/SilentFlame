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
import Divider from '../../components/divider';
import TitleText from '../../components/title-text';
import {screenThemeColor, shadowStyles, winWidth} from '../../global-style';
import NutrientFormController from './nutrient-from-controller';
import SupplementForm from './supplement-form';
import {MOCK_BASE_INFO, MOCK_NUTRIENTS} from './constant';
import {useRecoilState, useRecoilValue} from 'recoil';
import {imageResState, isScrollState, supplisState} from './suppli.hook';
import {Suppli, SuppliBaseInfo, SuppliNutrient} from './suppli';
import {userIdState} from '../../recoil/user';

type Params = {
  mode: 'add' | 'view';
  suppli?: Suppli;
};

// mode => edit, add, look
const SupplFormScreen = ({navigation, route}) => {
  const {mode, suppli = undefined} = route.params as Params;
  const {control, handleSubmit, errors} = useForm();
  const [editable, setEditable] = useState(mode === 'add');
  const isScroll = useRecoilValue(isScrollState);
  const [supplis, setSupplis] = useRecoilState(supplisState);
  const imageRes = useRecoilValue(imageResState);
  const userId = useRecoilValue(userIdState);

  const onSubmit = (formValus) => {
    console.log('SupplementForm', formValus, errors);
    if (Object.entries(errors).length === 0) {
      const nutrients: SuppliNutrient[] = [];
      Object.keys(formValus).forEach((key) => {
        // ex. `${index}amountPerServingUnit`
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
          ['priceValue', 'contentSizeValue', 'servingSize'].includes(key)
        ) {
          formValus[key] = Number(formValus[key]);
        }
      });
      formValus['nutrients'] = nutrients;
      formValus['updateAt'] = new Date();
      const margeFormValus = Object.assign(
        {...formValus},
        {imageRes: imageRes},
      );
      if (suppli) {
        const updateSuppli = Object.assign(suppli, margeFormValus);
        console.log('SupplFormScreen::updateSuppli', updateSuppli);
        setSupplis((preState) =>
          preState.map((obj) => (obj.id === suppli.id ? updateSuppli : obj)),
        );
      } else {
        margeFormValus['id'] = Math.floor(new Date().getTime() / 1000);
        margeFormValus['createdAt'] = new Date();
        margeFormValus['author'] = userId;
        console.log('SupplFormScreen::margeFormValus', margeFormValus);
        setSupplis((preState) => [...preState, margeFormValus]);
      }
      navigation.goBack();
    }
  };

  const SubmitBtn = () => (
    <View style={Styles.btnSection}>
      <View
        style={[
          shadowStyles(screenThemeColor.suppl).boxShadow,
          Styles.buttonContainer,
        ]}>
        <Button
          color="black"
          title={editable ? (suppli ? '編集終了' : '登録') : '編集'}
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
        extraScrollHeight={150}
        enableAutomaticScroll={isScroll}>
        <ScrollView style={Styles.container} scrollEnabled={isScroll}>
          <SubmitBtn />

          <TitleText title="基本情報" />
          <SupplementForm
            control={control}
            errors={errors}
            editable={editable}
            suppliBaseInfo={(() => {
              if (suppli) {
                const suppliBaseInfo = {...suppli};
                delete suppliBaseInfo.nutrients;
                return suppliBaseInfo as SuppliBaseInfo;
              } else {
                return undefined;
              }
            })()}
          />

          <Divider borderColor="white" />

          <TitleText title="栄養素情報(1回分)" />
          <NutrientFormController
            control={control}
            errors={errors}
            editable={editable}
            suppliNutrients={suppli ? suppli.nutrients : undefined}
          />

          <SubmitBtn />
        </ScrollView>
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

const Styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
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

export default SupplFormScreen;
