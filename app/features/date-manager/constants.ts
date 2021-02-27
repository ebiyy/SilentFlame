import {DotMarkingData} from './date-manager';

export const LOCALES = {
  monthNames: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  monthNamesShort: [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ],
  dayNames: [
    '日曜日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
  ],
  dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};

export const mockMarkedDates: DotMarkingData = {
  '2021-02-16': {marked: true, selectedColor: 'blue'},
  '2021-02-17': {marked: true, selected: false},
  '2021-02-18': {marked: true, dotColor: 'red', activeOpacity: 0},
  '2021-02-19': {disabled: true, disableTouchEvent: true},
};
