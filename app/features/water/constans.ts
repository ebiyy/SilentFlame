import {Image} from 'react-native';
import tapWater from '../../assets/img/water_640.jpg';

export const initialWater = [
  {
    id: Math.floor(new Date().getTime() / 1000),
    waterName: '水道水',
    imageRes: {
      uri: Image.resolveAssetSource(tapWater).uri,
      width: 200,
      height: 200,
    },
    updateAt: new Date('2021-02-01'),
    priceValue: '1000',
    priceUnit: '¥',
    contentSizeValue: '0',
    nutrients: [
      {
        nutrientName: '水分',
        amountPerServingValue: '100',
        amountPerServingUnit: 'g',
        nutrientKey: 'WATER',
      },
    ],
  },
];
