import {DotMarkingData} from './date-manager';

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
      },
    };
  }
  assignObj = Object.assign(assignObj, {
    [selectedDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: 'orange',
    },
  });
  return {...preState, ...assignObj};
};
