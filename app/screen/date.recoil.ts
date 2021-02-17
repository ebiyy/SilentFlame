import {atom, selector} from 'recoil';
import {getFormatDate} from '../firebase/meal';

export const dateState = atom<Date>({
  key: 'dateState',
  default: new Date(),
});

export const weeksBeginningDateState = selector({
  key: 'weeksBeginningDateState',
  get: ({get}) => {
    const date = get(dateState);
    console.log('weeksBeginningDateState', 'date', date);
    const weeksBeginningDate = new Date(date);
    weeksBeginningDate.setDate(date.getDate() - date.getDay());
    console.log('weeksBeginningDateState', 'date', date);
    return getFormatDate(weeksBeginningDate);
  },
});
