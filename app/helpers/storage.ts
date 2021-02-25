import storage from './custom-async-storage';

export const load = (
  key: string,
  setState: React.Dispatch<React.SetStateAction<any>>,
  initState?: any,
) => {
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
      console.log('get supplis data', res);
      setState(res);
    })
    .catch((err) => {
      console.error(err);
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
