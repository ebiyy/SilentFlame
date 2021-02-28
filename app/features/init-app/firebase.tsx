import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {clientId, appId, apiKey, projectId} from '@env';
import firebase from '@react-native-firebase/app';
import {userIdState, userInfoState} from './init-app.recoil';
import {NavigationScreen} from '../../routes/navigation';
import {storageLoad, STORAGE_KEYS} from '../../api/storage.helper';
import {firebaseAuth} from './functions';

const initFirebase = async () => {
  const credentials = {
    clientId: clientId,
    appId: appId,
    apiKey: apiKey,
    databaseURL: '',
    storageBucket: '',
    messagingSenderId: '',
    projectId: projectId,
  };
  const config = {
    name: 'Blue Flame',
  };
  if (firebase.apps && firebase.apps.length === 0) {
    await firebase.initializeApp(credentials, config);
  }
  // await inAppMessaging().setMessagesDisplaySuppressed(true);
};

export const FirebaseSetting = () => {
  const [userId, setUserId] = useRecoilState(userIdState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    // storageRemove(STORAGE_KEYS.userInfo);
    initFirebase()
      .then(() => {
        console.log('fin initFirebase');
      })
      .catch((e) => console.warn('initFirebase', e))
      .finally(() => storageLoad(STORAGE_KEYS.userInfo, setUserInfo, {}));
  }, [setUserInfo]);

  useEffect(() => {
    console.log('userInfo', userInfo);
    if (userInfo === undefined) {
      return;
    } else if (Object.keys(userInfo).length > 0) {
      setUserId((userInfo as UserInfo).id);
    } else {
      firebaseAuth(setUserId);
    }
  }, [setUserId, userInfo]);

  return <NavigationScreen />;
};
