import {PriceUnit, ContentSizeUnit} from './suppli';

export const PRICE_UNIT: {[x: string]: PriceUnit} = {
  jpy: '¥',
  usd: '$',
};

export const CONTENT_SIZE_UNIT: {[x: string]: ContentSizeUnit} = {
  piece: '個',
  mcg: 'mcg',
  mg: 'mg',
  g: 'g',
  μg: 'μg',
};

export const MOCK_BASE_INFO = {
  id: Math.floor(new Date().getTime() / 1000),
  suppliName: 'アルギニン + オルニチン',
  imageRes: {
    fileName: 'FAA048E8-44BF-4F9D-A6BC-CEA9A4BCE4C2.jpg',
    fileSize: 46116,
    height: 200,
    type: 'image/jpg',
    uri:
      'file:///var/mobile/Containers/Data/Application/6CCF655B-9959-4DFD-A06A-B52658CC54AD/tmp/FAA048E8-44BF-4F9D-A6BC-CEA9A4BCE4C2.jpg',
    width: 150,
  },
  category: 'サプリメント',
  subCategory: 'アミノ酸',
  priceValue: 1193,
  priceUnit: PRICE_UNIT.jpy,
  contentSizeValue: 100,
  contentSizeUnit: CONTENT_SIZE_UNIT.piece,
  servingSize: 6,
};

export const MOCK_NUTRIENTS = {
  nutrients: [
    {
      nutrientName: 'アルギニン',
      amountPerServingValue: 500,
      amountPerServingUnit: CONTENT_SIZE_UNIT.mg,
      perDailyValue: undefined,
    },
    {
      nutrientName: 'オルニチン',
      amountPerServingValue: 250,
      amountPerServingUnit: CONTENT_SIZE_UNIT.mg,
      perDailyValue: undefined,
    },
  ],
};
