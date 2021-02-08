import {atom, selector} from 'recoil';

export const mealsState = atom({
  key: 'mealsState',
  default: [],
});

const sum = (arr) => {
  console.log('arr', arr);
  return arr.reduce((prev: number, current: number) => {
    return prev + current;
  });
};

const formatArr = (arr: number[] | string[]) =>
  arr
    .map((num: number | string) => {
      console.log(1, num);
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
    return (
      meals.length > 0 &&
      (sum(formatArr(meals.map((meal) => meal.WATER))) / 1000).toFixed(1)
    );
  },
});
