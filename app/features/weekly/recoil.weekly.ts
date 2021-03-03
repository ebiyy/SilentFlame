import {atom} from 'recoil';

export const weeklyDataState = atom<Meal[]>({
  key: 'weeklyDataState',
  default: [],
});
