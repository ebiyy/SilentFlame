import {atom, selector} from 'recoil';
import {WaterIntak} from '../../helpers/interface';

export const mealsState = atom<MargeMeal[]>({
  key: 'mealsState',
  default: [],
});

export const cloudMealsState = atom<CloudMeal[]>({
  key: 'cloudMealsState',
  default: [],
});

export const localMealsState = atom<LocalMeal[]>({
  key: 'localMealsState',
  default: [],
});

export const waterIntakeState = atom<WaterIntak[]>({
  key: 'waterIntakeState',
  default: [],
});

const sum = (arr) => {
  return arr.reduce((prev: number, current: number) => {
    return prev + current;
  });
};

const formatArr = (arr: number[] | string[]) =>
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
    return meals.length > 0 && sum(formatArr(meals.map((meal) => meal.PROT)));
  },
});

export const mealsFatState = selector({
  key: 'mealsFatState',
  get: ({get}) => {
    const meals = get(mealsState);
    return meals.length > 0 && sum(formatArr(meals.map((meal) => meal.FAT)));
  },
});

export const mealsCHOCDFState = selector({
  key: 'mealsCHOCDFState',
  get: ({get}) => {
    const meals = get(mealsState);
    return meals.length > 0 && sum(formatArr(meals.map((meal) => meal.CHOCDF)));
  },
});

export const mealsCHOAVState = selector({
  key: 'mealsCHOAVState',
  get: ({get}) => {
    const meals = get(mealsState);
    return (
      meals.length > 0 &&
      sum(
        formatArr(
          meals.map((meal) =>
            meal.CHOAVLM !== '-' ? meal.CHOAVLM : meal.CHOAVLDF,
          ),
        ),
      )
    );
  },
});

export const mealsENERC_KCALState = selector({
  key: 'mealsENERC_KCALState',
  get: ({get}) => {
    const meals = get(mealsState);
    return (
      meals.length > 0 && sum(formatArr(meals.map((meal) => meal.ENERC_KCAL)))
    );
  },
});

export const mealsWATERState = selector({
  key: 'mealsWATERState',
  get: ({get}) => {
    const meals = get(mealsState);
    const waterIntake = get(waterIntakeState);
    const waterIntakeNumArr = waterIntake.map((obj) => obj.intake);

    if (meals.length > 0 && waterIntakeNumArr.length > 0) {
      return (
        sum(
          formatArr(meals.map((meal) => meal.WATER)).concat(waterIntakeNumArr),
        ) / 1000
      ).toFixed(1);
    } else if (waterIntakeNumArr.length > 0) {
      return (sum(waterIntakeNumArr) / 1000).toFixed(1);
    } else if (meals.length > 0) {
      return (sum(formatArr(meals.map((meal) => meal.WATER))) / 1000).toFixed(
        1,
      );
    } else {
      return 0;
    }
  },
});
