import {ImagePickerResponse} from 'react-native-image-picker';
import {PriceUnit} from '../suppli/suppli';

interface WaterCount {
  [waterId: string]: {
    '120': number;
    '200': number;
    '500': number;
  };
}

interface WaterWeight {
  [waterId: string]: number;
}

interface Water {
  id: number;
  waterName: string;
  imageRes: ImagePickerResponse | {};
  priceValue: number;
  priceUnit: PriceUnit;
  contentSizeValue: number;
  servingSize: number;
  nutrients: {
    nutrientName: string;
    amountPerServingValue: number;
    amountPerServingUnit: string;
    nutrientKey: string;
  }[];
}
