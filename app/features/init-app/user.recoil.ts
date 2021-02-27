import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {atom, selector} from 'recoil';

export const userState = atom<FirebaseAuthTypes.UserCredential>({
  key: 'userState',
  default: {} as FirebaseAuthTypes.UserCredential,
});

export const userIdState = selector({
  key: 'userIdState',
  get: ({get}) => {
    const user = get(userState);
    console.log(user.user ? user.user.uid : '');
    return user.user ? user.user.uid : '';
  },
});
