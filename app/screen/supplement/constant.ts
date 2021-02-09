export interface Nutrient {
  nutrientName: string;
  amountPerServing: {
    value: number;
    unit: typeof UnitOfWeight[keyof typeof UnitOfWeight];
  };
  perDailyValue: number;
}

export const UnitOfWeight = {
  mcg: 'mcg',
  mg: 'mg',
  g: 'g',
  μg: 'μg',
};
