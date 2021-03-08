import {atom} from 'recoil';

export const weeklyDataState = atom<WeeklyData[]>({
  key: 'weeklyDataState',
  default: [],
});
