import {atom, selector} from 'recoil';
import {storageSaveDateData} from '../../api/storage.helper';
import {dateToStr} from '../../api/utils';
import {sumMeal} from '../../components/functions';
import {WaterIntak} from '../../helpers/interface';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {suppliToMealState} from '../suppli/suppli.hook';
import {waterToMealState} from '../water/water.hook';

export const mealsState = atom<Meal[]>({
  key: 'mealsState',
  default: [],
});

export const actionMealState = atom<ActionMeal | undefined>({
  key: 'actionMealState',
  default: undefined,
});

export const waterIntakeState = atom<WaterIntak[]>({
  key: 'waterIntakeState',
  default: [],
});

export const isMealsStorageState = selector({
  key: 'isMealsStorageState',
  get: ({get}) => {
    const meals = get(mealsState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    if (meals.length > 0 && editable) {
      console.log('Run isSupplisStorageState');
      storageSaveDateData('meals', dateToStr(currentDate), meals);

      return true;
    }
    return false;
  },
});

export const sumValues = (meals: Meal[], nutrientKey: string) => {
  if (meals && meals.length > 0) {
    const valuesArr: number[] = formatArr(
      meals.map((meal) => meal[nutrientKey]),
    );
    if (valuesArr.length > 0) {
      const sumValue = sum(valuesArr);
      if (String(Math.floor(sumValue)).length > 1) {
        return Number(sumValue.toFixed(0));
      } else {
        return Number(sumValue.toFixed(1));
      }
    }
  }
  return 0;
};

const sum = (arr): number => {
  return arr.reduce((prev: number, current: number) => {
    return prev + current;
  });
};

const formatArr = (arr: number[] | string[]): any[] =>
  arr
    .map((num: number | string) => {
      if (Number.isFinite(Number(num))) {
        return Number(num);
      } else if (num === '-' || num === 'Tr') {
        return [];
      } else {
        const toNum = Number((num as string).replace('(', '').replace(')', ''));
        const isParenthesesNum = typeof toNum === 'number' && !isNaN(toNum);
        if (isParenthesesNum) {
          return toNum;
        } else {
          return [];
        }
      }
    })
    .flat();

export const mealsProteinState = selector({
  key: 'mealsProteinState',
  get: ({get}) => {
    const nutrientKey = 'PROT';
    const meals = get(mealsState);
    const suppliToMeals = Object.values(get(suppliToMealState)).filter(
      (suppliToMeal) => suppliToMeal[nutrientKey],
    );
    const waterToMeals = get(waterToMealState).filter(
      (waterToMeal) => waterToMeal[nutrientKey],
    );
    return sumValues(
      [...meals, ...suppliToMeals, ...waterToMeals],
      nutrientKey,
    );
  },
});

export const mealsFatState = selector({
  key: 'mealsFatState',
  get: ({get}) => {
    const nutrientKey = 'FAT';
    const meals = get(mealsState);
    const suppliToMeals = Object.values(get(suppliToMealState)).filter(
      (suppliToMeal) => suppliToMeal[nutrientKey],
    );
    const waterToMeals = get(waterToMealState).filter(
      (waterToMeal) => waterToMeal[nutrientKey],
    );
    return sumValues(
      [...meals, ...suppliToMeals, ...waterToMeals],
      nutrientKey,
    );
  },
});

export const mealsCHOCDFState = selector({
  key: 'mealsCHOCDFState',
  get: ({get}) => {
    const nutrientKey = 'CHOCDF';
    const meals = get(mealsState);
    const suppliToMeals = Object.values(get(suppliToMealState)).filter(
      (suppliToMeal) => suppliToMeal[nutrientKey],
    );
    const waterToMeals = get(waterToMealState).filter(
      (waterToMeal) => waterToMeal[nutrientKey],
    );
    return sumValues(
      [...meals, ...suppliToMeals, ...waterToMeals],
      nutrientKey,
    );
  },
});

export const mealsCHOAVState = selector({
  key: 'mealsCHOAVState',
  get: ({get}) => {
    const nutrientKey = 'CHOAVLM';
    const meals = get(mealsState);
    const suppliToMeals = Object.values(get(suppliToMealState)).filter(
      (suppliToMeal) => suppliToMeal[nutrientKey],
    );
    const waterToMeals = get(waterToMealState).filter(
      (waterToMeal) => waterToMeal[nutrientKey],
    );
    return sumValues(
      [...meals, ...suppliToMeals, ...waterToMeals],
      nutrientKey,
    );
  },
});

export const mealsENERC_KCALState = selector({
  key: 'mealsENERC_KCALState',
  get: ({get}) => {
    const nutrientKey = 'ENERC_KCAL';
    const meals = get(mealsState);
    const suppliToMeals = Object.values(get(suppliToMealState)).filter(
      (suppliToMeal) => suppliToMeal[nutrientKey],
    );
    const waterToMeals = get(waterToMealState).filter(
      (waterToMeal) => waterToMeal[nutrientKey],
    );

    return sumValues(
      [...meals, ...suppliToMeals, ...waterToMeals],
      nutrientKey,
    );
  },
});

export const mealsWATERState = selector({
  key: 'mealsWATERState',
  get: ({get}) => {
    const nutrientKey = 'WATER';
    const meals = get(mealsState);
    const waterToMeals = get(waterToMealState).filter(
      (waterToMeal) => waterToMeal[nutrientKey],
    );

    return sumValues([...meals, ...waterToMeals], nutrientKey) / 1000;
  },
});

export const concatNutrientState = selector({
  key: 'concatNutrientState',
  get: ({get}) => {
    const meals = get(mealsState);
    const suppliToMeal = get(suppliToMealState);
    const waterToMeal = get(waterToMealState);

    const marge = ([] as Meal[])
      .concat(meals, Object.values(suppliToMeal), waterToMeal)
      .flat();

    const currentDate = get(dateState);
    const editable = get(editableState);

    if (marge.length > 0 && editable) {
      console.log('Run save concatNutrientState');
      storageSaveDateData('weekly', dateToStr(currentDate), sumMeal(marge));
      return true;
    } else {
      return false;
    }
  },
});
