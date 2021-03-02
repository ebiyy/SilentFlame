import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-community/async-storage';

export const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

export const STORAGE_KEYS = {
  userInfo: 'userInfo',
};

export const storageSave = (key: string, data: any) => {
  console.log('storageSave', key);
  storage.save({
    key,
    data,
  });
};

export const storageSaveDateData = (key: string, id: string, data: any) => {
  console.log('storageSaveDateData', key, id);
  storage.save({
    key,
    id,
    data,
  });
};

export const storageRemove = (key: string) => {
  storage.remove({
    key,
  });
};

export const storageLoad = (
  key: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  initState: any,
) => {
  console.log('storageLoad', key);
  storage
    .load({
      key: key,
      autoSync: true,
      syncInBackground: true,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((res) => {
      console.log(`get ${key} data`, res);
      setState(res);
    })
    .catch((err) => {
      console.warn(err);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          if (initState) {
            setState(initState);
          }
          break;
        case 'ExpiredError':
          break;
      }
    });
};

export const storageLoadDateData = (
  key: string,
  id: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  initState: any,
) => {
  console.log('storageLoadDateData', key, id);
  storage
    .load({
      key,
      id,
      autoSync: false,
      syncInBackground: false,
      syncParams: {
        extraFetchOptions: {},
        someFlag: true,
      },
    })
    .then((res) => {
      console.log(`get ${key} data`, res);
      setState(res);
    })
    .catch((err) => {
      console.warn(err);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          if (initState) {
            setState(initState);
          }
          break;
        case 'ExpiredError':
          break;
      }
    });
};
