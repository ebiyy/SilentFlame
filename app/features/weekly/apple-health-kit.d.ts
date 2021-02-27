import {
  HealthInputOptions,
  HealthValue,
  AppleHealthKit,
} from 'react-native-health';

export interface AppleHealthKitPlus extends AppleHealthKit {
  getBodyFatPercentageSamples(
    options: HealthInputOptions,
    callback: (err: string, results: HealthValue[]) => void,
  ): void;

  getLeanBodyMassSamples(
    options: HealthInputOptions,
    callback: (err: string, results: HealthValue[]) => void,
  ): void;
}

export interface HealthData {
  startDate: string;
  value: number;
}
