import {DotMarkingData} from './date-manager';

export const changeMarkedDate = (
  preState: DotMarkingData,
  strDate: string,
  selectedDate: string,
) => {
  let assignObj = {};
  // 選択済みの日付の背景をリセット
  if (selectedDate) {
    assignObj = {
      [selectedDate]: {
        selected: false,
        disableTouchEvent: false,
        selectedColor: 'transparent',
      },
    };
  }
  assignObj = Object.assign(assignObj, {
    [strDate]: {
      selected: true,
      disableTouchEvent: true,
      selectedColor: 'orange',
    },
  });
  return {...preState, ...assignObj};
};
