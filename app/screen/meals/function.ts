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
