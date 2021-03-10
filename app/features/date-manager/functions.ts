import {DotMarkingData} from './date-manager';

const getDots = (state, date) => {
  if (state) {
    if (state[date]) {
      if (state[date]['dots']) {
        return state[date]['dots'];
      }
    }
  }
  return [];
};

export const changeMarkedDate = (
  preState: DotMarkingData,
  selectedDate: string,
  beforeDate: string,
) => {
  let assignObj = {};
  // 選択済みの日付の背景をリセット
  if (beforeDate) {
    assignObj = {
      [beforeDate]: {
        selected: false,
        disableTouchEvent: false,
        selectedColor: 'transparent',
        dots: getDots(preState, beforeDate),
      },
    };
  }
  assignObj = Object.assign(assignObj, {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: '#ddd',
      dots: getDots(preState, selectedDate),
    },
  });
  return {...preState, ...assignObj};
};
