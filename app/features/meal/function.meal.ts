import {NUTRIENT_KEY} from '../suppli/constant';

export const nutrientRecalculation = (
  nutrientValue: string,
  intake: string,
  beforeIntake: number,
) => {
  if (nutrientValue === undefined) return;
  const cal = (num: number) => {
    const numIntake = Number(intake);
    if (numIntake > 0) {
      const result = (num / beforeIntake) * numIntake;
      if (result === 0) {
        return result;
      } else {
        const integerPart = Math.floor(result);
        if (String(integerPart).length > 1) {
          // ex. 100
          return result.toFixed(0);
        } else {
          return result.toFixed(1);
          // // ex. 0.1, 0.1000000001
          // const smallNumberPart = String(result).split('.')[1];
          // if (smallNumberPart === undefined) return result;
          // if (smallNumberPart.length > 1) {
          //   // ex. 0.1000000001
          //   return result.toFixed(1);
          // }
          // // ex. 0.1
          // return result;
        }
      }
    } else {
      return num;
    }
  };
  const numV = Number(nutrientValue);

  if (!numV) {
    // ex. foodName, (0.1)
    const toNum = Number(nutrientValue.replace('(', '').replace(')', ''));
    const isParenthesesNum = typeof toNum === 'number' && !isNaN(toNum);
    if (!isParenthesesNum) {
      // ex. foodName, not Number
      return nutrientValue;
    } else {
      // ex. (0.1)
      return `(${String(cal(toNum))})`;
    }
  }
  // ex. 100
  return cal(numV);
};

export const replaceFoodName = (name: string) => {
  const replaceStr = (str: string, str1: string, str2: string) => {
    const i1 = str.indexOf(str1);
    const i2 = str.indexOf(str2);
    if (i1 >= 0 && i2 > 0) {
      return str.substring(i1, i2 + str2.length + 1);
    } else {
      return '';
    }
  };
  // console.log(name, name.toString()); // =>  <牛乳及び乳製品> (チーズ ) ナチュラルチーズ エダム
  // console.log('name.indexOf(str2)', name.indexOf('類)')); // => 14
  // console.log('name.indexOf(str2)', name.indexOf('類)')); // => -1
  const replaceName = name
    .replace(replaceStr(name, '<', '>'), '')
    .replace(replaceStr(name, '[', '類]'), '') // ex. <畜肉類> ぶた [ひき肉] 焼き
    .replace(replaceStr(name, '(', '類)'), '')
    .replace(replaceStr(name, '(', '類)'), '') // ↑とは文字コードが違う
    .replace('[その他]', '')
    .replace('(その他)', '')
    .replace('<その他>', '')
    .replace(' その他 ', ' ');
  return replaceName;
};

export const excludeKeyGroup = [
  'foodGroup',
  'foodNumber',
  'indexNumber',
  'foodName',
  'remarks',
  'addedAt',
  'updatedAt',
  'timePeriod',
  'id',
  'author',
  'intake',
  'memo',
];

export const calNutrient = (meal: MargeMeal, intake: string) => {
  const temp = {} as MargeMeal;
  Object.keys(meal).forEach((key) => {
    if (excludeKeyGroup.includes(key)) {
      if (key === 'intake') {
        console.log(key, Number(intake));
        temp['intake'] = Number(intake);
      } else {
        temp[key] = meal[key];
      }
    } else {
      console.log(key, Number(intake));
      temp[key] = nutrientRecalculation(meal[key], intake, meal.intake);
    }
  });
  return temp;
};

export const generateMeal = (
  nutrient: Nutrients,
  intake: number,
  timePeriod: TimePeriodKey,
  userId: string,
): Meal => {
  console.log('generateMeal', {
    intake: intake,
    addedAt: new Date(),
    updatedAt: new Date(),
    timePeriod: timePeriod,
    id: Math.floor(new Date().getTime() / 1000),
    author: userId,
  });
  return {
    ...nutrient,
    intake: intake,
    addedAt: new Date(),
    updatedAt: new Date(),
    timePeriod: timePeriod,
    id: Math.floor(new Date().getTime() / 1000),
    author: userId,
  };
};

export const useFirestoreCollection = (
  collection: string,
  options?: {snapshotListenOptions?: any} | undefined,
) =>
  useCollection(firebase.firestore().collection(collection), options) as [
    firebase.firestore.QuerySnapshot | undefined,
    boolean,
    Error | undefined,
  ];

export const generateNutrientsLabel = (object: Object) => {
  return Object.keys(object)
    .map((key) => {
      return {
        [key]: {
          label: NUTRIENT_KEY[key].label,
          unit: NUTRIENT_KEY[key].unit,
        },
      };
    })
    .reduce((result, item) => {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});
};

export const nutrientLabels = (key: string) => {
  return {
    [key]: {
      label: NUTRIENT_KEY[key].label,
      unit: NUTRIENT_KEY[key].unit,
    },
  };
};

export const generateLabels = (arr: string[]) => {
  return arr
    .map((key) => nutrientLabels(key))
    .reduce((result, item) => {
      const key = Object.keys(item)[0];
      result[key] = item[key];
      return result;
    }, {});
};
