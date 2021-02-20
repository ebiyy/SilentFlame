import {ImagePickerResponse} from 'react-native-image-picker';

type PriceUnit = '¥' | '$';

type ContentSizeUnit = '個' | 'mcg' | 'mg' | 'g' | 'μg';

interface Suppli extends SuppliBaseInfo, SuppliNutrients {
  delete?: boolean;
  createdAt: Date;
  updateAt: Date;
  author: string;
}

interface SuppliBaseInfo {
  id: number;
  suppliName: string;
  imageRes: ImagePickerResponse | {};
  // category: string;
  // subCategory: string;
  priceValue: number;
  priceUnit: PriceUnit;
  contentSizeValue: number;
  contentSizeUnit: ContentSizeUnit;
  servingSize: number;
}

interface SuppliNutrients {
  nutrients: SuppliNutrient[];
}

interface SuppliNutrient {
  nutrientName: string;
  amountPerServingValue: number;
  amountPerServingUnit: string;
  perDailyValue: number | undefined;
}
