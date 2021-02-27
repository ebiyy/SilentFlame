import AppleHealthKit, {
  HealthKitPermissions,
  HealthUnit,
  HealthValue,
} from 'react-native-health';
import {AppleHealthKitPlus, HealthData} from './apple-health-kit';
import {
  mockWeight,
  mockBodyFatPercentage,
  mockLeanBodyMass,
  gramOptions,
  percentOptions,
} from './constants';

const PERMISSIONS = AppleHealthKit.Constants.Permissions;

export const getLossQuantityData = (
  setWeightState: React.Dispatch<React.SetStateAction<any>>,
  setBodyFatState: React.Dispatch<React.SetStateAction<any>>,
  setLeanBodyMassState: React.Dispatch<React.SetStateAction<any>>,
) => {
  console.log(HealthUnit);
  const permissions = {
    permissions: {
      read: [
        PERMISSIONS.Weight,
        PERMISSIONS.BodyFatPercentage,
        PERMISSIONS.LeanBodyMass,
      ],
    },
  } as HealthKitPermissions;

  AppleHealthKit.initHealthKit(permissions, (error: string) => {
    /* Called after we receive a response from the system */
    if (error) {
      console.log('[ERROR] Cannot grant permissions!');
    }
    //@typeの宣言がおかしい
    AppleHealthKit.getWeightSamples(gramOptions, (err, res: HealthValue[]) => {
      setHealthData(err, res, setWeightState, mockWeight);
    });
    (AppleHealthKit as AppleHealthKitPlus).getBodyFatPercentageSamples(
      percentOptions,
      (err, res: HealthValue[]) => {
        setHealthData(err, res, setBodyFatState, mockBodyFatPercentage);
      },
    );
    (AppleHealthKit as AppleHealthKitPlus).getLeanBodyMassSamples(
      gramOptions,
      (err, res: HealthValue[]) => {
        setHealthData(err, res, setLeanBodyMassState, mockLeanBodyMass);
      },
    );
  });
};

const setHealthData = (
  err: string,
  res: HealthValue[],
  setState: React.Dispatch<React.SetStateAction<HealthData[]>>,
  mock: HealthData[],
) => {
  if (err) {
    console.error(err);
    return;
  }
  if (res.length > 0) {
    const healthArr = res.map((obj) => {
      return {
        startDate: obj.startDate,
        value: obj.value,
      };
    });
    setState(healthArr);
  } else {
    setState(mock);
  }
};
