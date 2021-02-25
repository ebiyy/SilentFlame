import {atom, selector} from 'recoil';
import storage from '../../helpers/custom-async-storage';

export const watersState = atom<any[]>({
  key: 'watersState',
  default: [],
});

export const waterCountState = atom<{}>({
  key: 'waterCountState',
  default: {},
});

export const waterToMealState = atom<any[]>({
  key: 'waterToMealState',
  default: [],
});

export const isWaterStorageState = selector({
  key: 'isWaterStorageState',
  get: ({get}) => {
    const waters = get(watersState);
    if (waters.length > 0) {
      console.log('Run isWaterStorageState');
      storage.save({
        key: 'myWater',
        data: waters,
      });
      return true;
    }
    return false;
  },
});

export const isWaterToMealState = selector({
  key: 'isWaterToMealState',
  get: ({get}) => {
    const waterToMeal = get(waterToMealState);
    if (waterToMeal.length > 0) {
      console.log('Run isWaterToMealState');
      storage.save({
        key: 'waterToMeal',
        data: waterToMeal,
      });
      return true;
    }
    return false;
  },
});

export const isWaterCountState = selector({
  key: 'isWaterCountState',
  get: ({get}) => {
    const waterCount = get(waterCountState);
    if (Object.entries(waterCount).length > 0) {
      console.log('Run isWaterCountState');
      storage.save({
        key: 'waterCount',
        data: waterCount,
      });
      return true;
    }
    return false;
  },
});
