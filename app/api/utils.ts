export const toFixedToNum = (num: number, fixed: number) =>
  Number(num.toFixed(fixed));

// ---------date---------

// ex. 1/21 ~ 1/27
export const weekPeriod = (date: Date) =>
  `${formatJpMonthDay(
    new Date(date.getTime() - 6 * 24 * 60 * 60 * 1000),
  )} ~ ${formatJpMonthDay(date)}`;

// ex. "2月26日(金)"
export const formatJpDate = (date: Date) =>
  new Intl.DateTimeFormat('ja-JP', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(date);

// 2021年のみ対応
const replaceDate = (date: string) =>
  date.length === 9 ? date.replace('21-', '21-0') : date;

// ex. "2021-02-25"
export const formatShortStrDate = (date: Date) => {
  const temp = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
    .format(date)
    .replaceAll('/', '-');
  return replaceDate(temp);
};

export const getOtherDay = (num: number) => {
  const date = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
    .format(new Date().setDate(new Date().getDate() + num))
    .replaceAll('/', '-');
  return replaceDate(date);
};

// ex. 2021-2-12
export const toDay = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})
  .format(new Date())
  .replaceAll('/', '-');

// ex. 1/21
export const formatJpMonthDay = (date: Date | string) =>
  new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(date));

export const setNowUtcDate = new Date().toUTCString();

export const convToLocalDate = (date: Date) => new Date(date.toLocaleString());

const hourToMunits = 60;
// ex. -9 (ja)
export const getTimeZone = toFixedToNum(
  new Date().getTimezoneOffset() / hourToMunits,
  1,
);

export const isToday = (date: Date) =>
  formatShortStrDate(date) === formatShortStrDate(new Date());

const addZero = (num: number) =>
  String(num).length === 2 ? String(num) : `0${String(num)}`;

export const dateToStr = (date: Date | string) => {
  const targetDate = new Date(date);
  const year = targetDate.getFullYear();
  const month = targetDate.getMonth() + 1;
  const day = targetDate.getDate();
  const monthStr = addZero(month);
  const dayStr = addZero(day);
  return `${year}-${monthStr}-${dayStr}`;
};

export const addDays = (date: Date, days: number) => {
  const day = new Date(date);
  day.setDate(day.getDate() + days);
  return day;
};
