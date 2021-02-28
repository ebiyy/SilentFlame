import {ImagePickerResponse} from 'react-native-image-picker';
import {atom, selector} from 'recoil';
import {storage} from '../../api/storage.helper';
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
    if (supplis.length > 0) {
      console.log('Run isSupplisStorageState');
      storage.save({
        key: 'mySuppli',
        data: supplis,
      });
      return true;
    }
    return false;
  },
});

export const isSuppliToMealState = selector({
  key: 'isSuppliToMealState',
  get: ({get}) => {
    const suppliToMeal = get(suppliToMealState);
    if (Object.entries(suppliToMeal).length > 0) {
      console.log('Run isSuppliToMealState');
      storage.save({
        key: 'suppliToMeal',
        data: suppliToMeal,
      });
      return true;
    }
    return false;
  },
});

export const isSupplisCountState = selector({
  key: 'isSupplisStorageState',
  get: ({get}) => {
    const suppliCount = get(suppliCountState);
    if (Object.entries(suppliCount).length > 0) {
      console.log('Run isSupplisCountState');
      storage.save({
        key: 'suppliCount',
        data: suppliCount,
      });
      return true;
    }
    return false;
  },
});
