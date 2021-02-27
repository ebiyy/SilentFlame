type LossQuantityViewValue = '体重' | '体脂肪' | '除脂肪体重';
type LossQuantityViewKey = 'weight' | 'bodyFat' | 'leanBodyMass';

type LossQuantityView = {
  [key in LossQuantityViewKey]: LossQuantityViewValue;
};

interface HealthData {
  startDate: string;
  value: number;
}
