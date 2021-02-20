import {ImagePickerResponse} from 'react-native-image-picker';
import {atom} from 'recoil';
import {MOCK_BASE_INFO, MOCK_NUTRIENTS} from './constant';
import {Suppli} from './suppli';

const MOCK = [
  {
    ...MOCK_BASE_INFO,
    ...MOCK_NUTRIENTS,
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
  default: MOCK,
});

export const isScrollState = atom<boolean>({
  key: 'isScrollState',
  default: true,
});

export const imageResState = atom<ImagePickerResponse | {}>({
  key: 'imageResState',
  default: {},
});
