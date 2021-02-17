import {atom, selector} from 'recoil';
import {WaterIntak} from '../../helpers/interface';

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

const sumValues = (meals: Meal[], nutrientKey: string) => {
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
    const meals = get(mealsState);
    // return 0;
    return sumValues(meals, 'PROT');
  },
});

export const mealsFatState = selector({
  key: 'mealsFatState',
  get: ({get}) => {
    const meals = get(mealsState);
    // return 0;
    return sumValues(meals, 'FAT');
  },
});

export const mealsCHOCDFState = selector({
  key: 'mealsCHOCDFState',
  get: ({get}) => {
    const meals = get(mealsState);
    // return 0;
    return sumValues(meals, 'CHOCDF');
  },
});

export const mealsCHOAVState = selector({
  key: 'mealsCHOAVState',
  get: ({get}) => {
    const meals = get(mealsState);
    // return 0;
    return sumValues(meals, 'CHOAVLM');
  },
});

export const mealsENERC_KCALState = selector({
  key: 'mealsENERC_KCALState',
  get: ({get}) => {
    const meals = get(mealsState);
    // return 0;
    return sumValues(meals, 'ENERC_KCAL');
  },
});

export const mealsWATERState = selector({
  key: 'mealsWATERState',
  get: ({get}) => {
    // return 0;
    const meals = get(mealsState);
    const waterIntake = get(waterIntakeState);
    const waterIntakeNumArr = waterIntake.map((obj) => obj.intake);
    const waterValueArr = formatArr(meals.map((meal) => meal.WATER));

    if (meals.length > 0 && waterIntakeNumArr.length > 0) {
      return (
        waterValueArr.length > 0 &&
        (sum(waterValueArr.concat(waterIntakeNumArr)) / 1000).toFixed(1)
      );
    } else if (waterIntakeNumArr.length > 0) {
      return (
        waterValueArr.length > 0 && (sum(waterIntakeNumArr) / 1000).toFixed(1)
      );
    } else if (meals.length > 0) {
      return waterValueArr.length > 0 && (sum(waterValueArr) / 1000).toFixed(1);
    } else {
      return 0;
    }
  },
});
