import {atom, selector} from 'recoil';
import {
  storage,
  storageSave,
  storageSaveDateData,
} from '../../api/storage.helper';
import {dateToStr} from '../../api/utils';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {Water, WaterCount} from './water';

export const watersState = atom<Water[]>({
  key: 'watersState',
  default: [],
});

export const waterCountState = atom<WaterCount>({
  key: 'waterCountState',
  default: {},
});

export const waterToMealState = atom<Meal[]>({
  key: 'waterToMealState',
  default: [],
});

export const isWaterStorageState = selector({
  key: 'isWaterStorageState',
  get: ({get}) => {
    const waters = get(watersState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    if (waters.length > 0 && editable) {
      console.log('Run isWaterStorageState');
      storageSaveDateData('myWater', dateToStr(currentDate), waters);
      storageSave('myWater', waters);
      return true;
    }
    return false;
  },
});

export const isWaterToMealState = selector({
  key: 'isWaterToMealState',
  get: ({get}) => {
    const waterToMeal = get(waterToMealState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    if (waterToMeal.length > 0 && editable) {
      console.log('Run isWaterToMealState');
      storageSaveDateData('waterToMeal', dateToStr(currentDate), waterToMeal);
      storageSave('waterToMeal', {});
      return true;
    }
    return false;
  },
});

export const isWaterCountState = selector({
  key: 'isWaterCountState',
  get: ({get}) => {
    const waterCount = get(waterCountState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    if (Object.entries(waterCount).length > 0 && editable) {
      console.log('Run isWaterCountState');
      storageSaveDateData('waterCount', dateToStr(currentDate), waterCount);
      storageSave('waterCount', {});
      return true;
    }
    return false;
  },
});

export const isWaterDeleteState = selector({
  key: 'isWaterDeleteState',
  get: ({get}) => {
    const waters = get(watersState);
    const waterCount = get(waterCountState);
    const editable = get(editableState);
    if (!editable) return [{}, []];
    console.log(`run isWaterDeleteState`);
    let newWaterCount = {};

    const hasWaterIds = waters.map((water) => water.id);
    const hasWaterCountIds = Object.keys(waterCount);

    hasWaterCountIds.forEach((id) => {
      if (hasWaterIds.includes(Number(id))) {
        newWaterCount[id] = waterCount[id];
      }
    });

    const waterToMeal = get(waterToMealState).filter((wtm) =>
      hasWaterIds.includes(wtm.indexNumber),
    );
    // console.log('get(waterToMealState)', get(waterToMealState), waterToMeal);
    return [newWaterCount, waterToMeal];
  },
});
