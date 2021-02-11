// import Realm from 'realm';
export const SUPPLEMENT_SCHEMA = 'SupplementList';
export const USER_SCHEMA = 'UserData';
export const NUTRIENT_SCHEMA = 'NutrientList';
export const WATER_SCHEMA = 'WaterList';

const UnitSign = {
  Quantity: 'count',
  Currency: '円',
  Weight: ['mcg', 'mg', 'g'],
};

interface WeightUnit {
  value: number;
  sign: typeof UnitSign.Weight[number];
}

interface QuantityUnit {
  value: number;
  sign: typeof UnitSign.Quantity;
}

interface CurrencyUnit {
  value: number;
  sign: typeof UnitSign.Currency;
}

interface Supplement {
  id: string;
  supplementName: string;
  customName?: string;
  brandName: string;
  nutrientId: string[];
  category: string;
  subCategory: string;
  price: CurrencyUnit;
  content: QuantityUnit;
  serving: QuantityUnit;
  productCode: string;
  UPCCode: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export const SupplementSchema = {
  name: SUPPLEMENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    supplementName: 'string',
    brandName: 'string',
    nutrientId: {type: 'string?[]'},
    category: 'string',
    sub_category: 'string',
    price: 'string',
    content: 'string',
    serving: 'string',
    productCode: 'string',
    UPCCode: 'string',
    imageUrl: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

interface Nutrient {
  id: string;
  name: string;
  perUnit: QuantityUnit;
  amountPerServing: WeightUnit;
  perDailyValue: number;
  createdAt: Date;
  updatedAt: Date;
}

export const NutrientSchema = {
  name: NUTRIENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
    perUnit: 'string',
    amountPerServing: 'string',
    perDailyValue: 'int',
    createdAt: 'data',
    updatedAt: 'data',
  },
};

export const WaterSchema = {
  name: WATER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    waterName: 'string',
    brandName: 'string',
    nutrientId: {type: 'string?[]'},
    classification: 'string',
    price: 'string',
    content: 'string',
    waterSamplingArea: 'string',
    productCode: 'string',
    barCode: 'string',
    imageUrl: 'string',
    createdAt: 'date',
    updatedAt: 'date',
  },
};

export const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
  },
};

// const createRealm = (
//   realm: Realm,
//   schemaName: string,
//   insertObj: any,
//   modified: boolean,
// ) => {
//   modified
//     ? realm.create(schemaName, insertObj, Realm.UpdateMode.Modified)
//     : realm.create(schemaName, insertObj);
// };

// // スキーマにインサート
// const writeRealm = (
//   schema: any,
//   schemaName: string,
//   insertObj: any,
//   modified = false,
// ) => {
//   Realm.open({
//     schema: [schema],
//   })
//     .then((realm: Realm) => {
//       realm.write(() => {
//         createRealm(realm, schemaName, insertObj, modified);
//       });
//       realm.close();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // DataListスキーマにデリート
// const deleteSchema = (schema: any, schemaName: string, schemaId: any) => {
//   Realm.open({
//     schema: [schema],
//   })
//     .then((realm: Realm) => {
//       realm.write(() => {
//         let deletingDataList = realm.objectForPrimaryKey(schemaName, schemaId);
//         realm.delete(deletingDataList);
//       });
//       realm.close();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

// // DataListスキーマを全デリート
// const allDeleteSchema = (schema: any, schemaName: string) => {
//   Realm.open({
//     schema: [schema],
//   })
//     .then((realm: Realm) => {
//       realm.write(() => {
//         let allTodoLists = realm.objects(schemaName);
//         realm.delete(allTodoLists);
//       });
//       realm.close();
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };
