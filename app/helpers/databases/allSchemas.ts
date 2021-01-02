import Realm from 'realm';
export const SUPPLEMENT_SCHEMA = 'SupplementList';
export const USER_SCHEMA = 'UserData';
export const NUTRIENT_SCHEMA = 'NutrientList';
export const WATER_SCHEMA = 'WaterList';

const UnitSign = {
  Quantity: 'count',
  Currency: '円',
  Weight: ['mcg', 'mg', 'g'],
***REMOVED***

interface WeightUnit {
  value: number;
  sign: typeof UnitSign.Weight[number];
***REMOVED***

interface QuantityUnit {
  value: number;
  sign: typeof UnitSign.Quantity;
***REMOVED***

interface CurrencyUnit {
  value: number;
  sign: typeof UnitSign.Currency;
***REMOVED***

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
***REMOVED***

export const SupplementSchema = {
  name: SUPPLEMENT_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    supplementName: 'string',
    brandName: 'string',
    nutrientId: {type: 'string?[]'***REMOVED***,
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
***REMOVED***
***REMOVED***

interface Nutrient {
  id: string;
  name: string;
  perUnit: QuantityUnit;
  amountPerServing: WeightUnit;
  perDailyValue: number;
  createdAt: Date;
  updatedAt: Date;
***REMOVED***

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
***REMOVED***
***REMOVED***

export const WaterSchema = {
  name: WATER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    waterName: 'string',
    brandName: 'string',
    nutrientId: {type: 'string?[]'***REMOVED***,
    classification: 'string',
    price: 'string',
    content: 'string',
    waterSamplingArea: 'string',
    productCode: 'string',
    barCode: 'string',
    imageUrl: 'string',
    createdAt: 'date',
    updatedAt: 'date',
***REMOVED***
***REMOVED***

export const UserSchema = {
  name: USER_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    name: 'string',
***REMOVED***
***REMOVED***

const createRealm = (
  realm: Realm,
  schemaName: string,
  insertObj: any,
  modified: boolean,
) => {
  modified
    ? realm.create(schemaName, insertObj, Realm.UpdateMode.Modified)
    : realm.create(schemaName, insertObj);
***REMOVED***

// スキーマにインサート
const writeRealm = (
  schema: any,
  schemaName: string,
  insertObj: any,
  modified = false,
) => {
  Realm.open({
    schema: [schema],
  ***REMOVED***)
    .then((realm: Realm) => {
      realm.write(() => {
        createRealm(realm, schemaName, insertObj, modified);
      ***REMOVED***
      realm.close();
    ***REMOVED***)
    .catch((error) => {
      console.log(error);
    ***REMOVED***
***REMOVED***

// DataListスキーマにデリート
const deleteSchema = (schema: any, schemaName: string, schemaId: any) => {
  Realm.open({
    schema: [schema],
  ***REMOVED***)
    .then((realm: Realm) => {
      realm.write(() => {
        let deletingDataList = realm.objectForPrimaryKey(schemaName, schemaId);
        realm.delete(deletingDataList);
      ***REMOVED***
      realm.close();
    ***REMOVED***)
    .catch((error) => {
      console.log(error);
    ***REMOVED***
***REMOVED***

// DataListスキーマを全デリート
const allDeleteSchema = (schema: any, schemaName: string) => {
  Realm.open({
    schema: [schema],
  ***REMOVED***)
    .then((realm: Realm) => {
      realm.write(() => {
        let allTodoLists = realm.objects(schemaName);
        realm.delete(allTodoLists);
      ***REMOVED***
      realm.close();
    ***REMOVED***)
    .catch((error) => {
      console.log(error);
    ***REMOVED***
***REMOVED***
