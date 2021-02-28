import {AppStateStatus, AppState} from 'react-native';
import {atom, selector} from 'recoil';

export const appState = atom<AppStateStatus>({
  key: 'recoilAppState',
  default: AppState.currentState,
});

export const userInfoState = atom<UserInfo | {} | undefined>({
  key: 'userInfoState',
  default: undefined,
});

export const userIdState = atom<string | undefined>({
  key: 'userIdState',
  default: undefined,
});

// export const userIdState = selector({
//   key: 'userIdState',
//   get: ({get}) => {
//     const user = get(userInfoState);
//     if (user) {
//       console.log(user.id ? user.id : '');
//       return user.id;
//     }
//   },
// });
