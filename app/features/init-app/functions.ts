import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {SetterOrUpdater} from 'recoil';
import {storageSave, STORAGE_KEYS} from '../../api/storage.helper';
import {setNowUtcDate, getTimeZone} from '../../api/utils';
import {VALEU} from '../setting/setting-list-item';

/**
 * firebaseからID取得し、ローカルに保持。ローカル情報がなくなった場合の保管にも利用。
 * @param setUserId
 */
export const firebaseAuth = (
  setUserId: SetterOrUpdater<string | undefined>,
) => {
  auth()
    .signInAnonymously()
    .then((u) => {
      console.log('User signed in anonymously', u);
      const docRef = firestore().collection('Users').doc(u.user.uid);
      docRef.get().then((doc) => {
        if (doc.exists) {
          // console.log('doc.exists', doc.data());
          storageSave(STORAGE_KEYS.userInfo, {...VALEU, ...doc.data()});
        } else {
          // console.log('!doc.exists');
          const info = {
            id: u.user.uid,
            createdAt: setNowUtcDate,
            timeZone: getTimeZone,
            ...VALEU,
          };
          docRef.set(info);
          storageSave(STORAGE_KEYS.userInfo, info);
        }
      });
      setUserId(u.user.uid);
    })
    .catch((error) => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error('auth', error);
    });
};
