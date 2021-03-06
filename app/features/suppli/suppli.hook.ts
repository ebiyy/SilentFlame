import {ImagePickerResponse} from 'react-native-image-picker';
import {atom, selector} from 'recoil';
import {
  storage,
  storageSave,
  storageSaveDateData,
} from '../../api/storage.helper';
import {dateToStr, selectorSaveStore} from '../../api/utils';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {
  MOCK_BASE_INFO,
  MOCK_BASE_INFO2,
  MOCK_NUTRIENTS,
  MOCK_NUTRIENTS2,
} from './constant';
import {Suppli} from './suppli';

const MOCK = [
  {
    ...MOCK_BASE_INFO,
    ...MOCK_NUTRIENTS,
    createdAt: new Date(),
    updateAt: new Date(),
    author: 'mock',
  },
  {
    ...MOCK_BASE_INFO2,
    ...MOCK_NUTRIENTS2,
    createdAt: new Date(),
    updateAt: new Date(),
    author: 'mock',
  },

  // {supplementName: 'Mega D-3 & MK-7'},
  // {supplementName: 'Vitamin A'},
  // {supplementName: 'AMINO COMPLETE'},
  // {supplementName: 'Ultra Omega-3'},
  // {supplementName: 'E-400'},
  // {supplementName: 'B-50'},
  // {supplementName: 'Magnesium Citrate'},
  // {supplementName: 'NO-FlUSH NAIACIN 500MG'},
];

export const supplisState = atom<Suppli[]>({
  key: 'supplsState',
  default: [],
});

export const isScrollState = atom<boolean>({
  key: 'isScrollState',
  default: true,
});

export const imageResState = atom<ImagePickerResponse | {}>({
  key: 'imageResState',
  default: {},
});

export const suppliToMealState = atom({
  key: 'suppliToMealState',
  default: {},
});

export const suppliCountState = atom({
  key: 'suppliCountState',
  default: {},
});

export const isSupplisStorageState = selector({
  key: 'isSupplisStorageState',
  get: ({get}) => {
    const supplis = get(supplisState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    if (editable) {
      console.log('Run isSupplisStorageState');
      storageSaveDateData('mySuppli', dateToStr(currentDate), supplis);
      storageSave('mySuppli', supplis);
      return true;
    }
    return false;
  },
});

export const isSuppliToMealState = selector({
  key: 'isSuppliToMealState',
  get: ({get}) => {
    const suppliToMeal = get(suppliToMealState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    return selectorSaveStore(
      editable,
      currentDate,
      'suppliToMeal',
      suppliToMeal,
      {},
    );
  },
});

export const isSupplisCountState = selector({
  key: 'isSupplisCountState',
  get: ({get}) => {
    const suppliCount = get(suppliCountState);
    const currentDate = get(dateState);
    const editable = get(editableState);
    return selectorSaveStore(
      editable,
      currentDate,
      'suppliCount',
      suppliCount,
      {},
    );
  },
});
