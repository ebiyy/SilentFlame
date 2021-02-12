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
          // ex. 0.1, 0.1000000001
          const smallNumberPart = String(result).split('.')[1];
          if (smallNumberPart === undefined) return result;
          if (smallNumberPart.length > 5) {
            // ex. 0.1000000001
            return result.toFixed(2);
          }
          // ex. 0.1
          return result;
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
    return str.substring(
      str.indexOf(str1),
      str.indexOf(str2) > 0 ? str.indexOf(str2) + str2.length + 1 : -1,
    );
  };
  // console.log(name, name.toString()); // =>  <牛乳及び乳製品> (チーズ ) ナチュラルチーズ エダム
  // console.log('name.indexOf(str2)', name.indexOf('類)')); // => 14
  // console.log('name.indexOf(str2)', name.indexOf('類)')); // => -1
  const replaceName = name
    .replace(replaceStr(name, '<', '>'), '')
    .replace(replaceStr(name, '[', ']'), '')
    .replace(replaceStr(name, '(', '類)'), '');
  return replaceName;
};
