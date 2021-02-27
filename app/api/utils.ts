// ex. "2月26日(金)"
export const formatJPDate = (date: Date) =>
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

export const formatJpMonthDay = (date: Date | string) =>
  new Intl.DateTimeFormat('ja-JP', {
    month: 'numeric',
    day: 'numeric',
  }).format(new Date(date));
