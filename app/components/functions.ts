import {excludeKeyGroup} from '../features/meal/function.meal';

const invalidValues = ['-', 'Tr', '(Tr)', undefined];

export const sumMeal = (meals: Meal[], weekIndex?: number) => {
  console.log('sumMeal', meals);
  // 特定の栄養素群を持っていないobjectが存在するため要素の大きいものを確認
  const countEntries = meals.map((meal) => Object.keys(meal).length);
  const biggestEnries = countEntries.indexOf(Math.max.apply(0, countEntries));
  // console.log('sumMeal', countEntries, biggestEnries);
  const nurientKeys = Object.keys(meals[biggestEnries]).filter(
    (key) => !excludeKeyGroup.includes(key),
  );
  // console.log('sumMeal', nurientKeys);
  let meal = {} as Meal;
  nurientKeys.forEach((key) => {
    meal[key] = meals.map((meal) => meal[key]).reduce(mealsReducer);
    meal[key] = Number(meal[key])
      ? (Number(meal[key]) / (weekIndex ? weekIndex : 1)).toFixed(0)
      : invalidValues.includes(meal[key])
      ? meal[key]
      : isparenthesis(meal[key]);
  });
  meal = {...meal, foodName: '摂取食品の合計', remarks: '', intake: 100};
  // console.log(meal);
  return meal;
};

const mealsReducer = (acc: string, cur: string) => {
  if (invalidValues.includes(acc) && !invalidValues.includes(cur)) {
    return isparenthesis(cur);
  } else if (!invalidValues.includes(acc) && invalidValues.includes(cur)) {
    return isparenthesis(acc);
  } else if (invalidValues.includes(acc) && invalidValues.includes(cur)) {
    return '0';
  } else {
    return String(Number(isparenthesis(cur)) + Number(isparenthesis(acc)));
  }
};

const isparenthesis = (str: string | number) => {
  const temp = String(str);
  return temp.indexOf('(') > -1
    ? temp.replace('(', '').replace(')', '')
    : String(temp);
};
