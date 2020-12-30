import Realm from 'realm';
export const DATA_SCHEMA = 'DataList';
export const USER_SCHEMA = 'UserData';

export const DataSchema = {
  name: DATA_SCHEMA,
  primaryKey: 'id',
  properties: {
    id: 'string',
    genre: 'string',
    word: {type: 'string', indexed: true***REMOVED***,
    detail: 'string',
    title: 'string',
    author: 'string',
    memo: 'string',
    isLike: 'bool',
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

// DataListスキーマにインサート
export const insertNewDataList = (newDataList) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          realm.create(DATA_SCHEMA, newDataList);
          resolve(newDataList);
        ***REMOVED***
      ***REMOVED***)
      .catch((error) => reject(error));
  ***REMOVED***
Realm.open(databaseOptions).then((realm: Realm) => {
  realm.write(() => {
    realm.create(DATA_SCHEMA, newDataList);
  ***REMOVED***
  // setRealm(realmState);
***REMOVED***

// DataListスキーマにアップデート
export const updateDataList = (dataList) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let updatingDataList = realm.objectForPrimaryKey(
            DATA_SCHEMA,
            dataList.id,
        ***REMOVED***
          updatingDataList.name = dataList.name;
          resolve();
        ***REMOVED***
      ***REMOVED***)
      .catch((error) => reject(error));
  ***REMOVED***

// DataListスキーマにデリート
export const deleteDataList = (dataListId) =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let deletingDataList = realm.objectForPrimaryKey(
            DATA_SCHEMA,
            dataListId,
        ***REMOVED***
          realm.delete(deletingDataList);
          resolve();
        ***REMOVED***
      ***REMOVED***)
      .catch((error) => reject(error));
  ***REMOVED***

// DataListスキーマを全デリート
export const deleteAllDataList = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        realm.write(() => {
          let allTodoLists = realm.objects(DATA_SCHEMA);
          realm.delete(allTodoLists);
          resolve();
        ***REMOVED***
      ***REMOVED***)
      .catch((error) => reject(error));
  ***REMOVED***

// DataListスキーマからセレクト
export const queryAllDataList = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then((realm) => {
        let allTodoLists = realm.objects(DATA_SCHEMA);
        resolve(allTodoLists);
      ***REMOVED***)
      .catch((error) => reject(error));
  ***REMOVED***
export default new Realm(databaseOptions);
