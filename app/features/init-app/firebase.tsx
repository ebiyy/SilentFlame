import React, {useEffect} from 'react';
import {useRecoilState} from 'recoil';

import {clientId, appId, apiKey, projectId} from '@env';
import firebase from '@react-native-firebase/app';
import {userIdState, userInfoState} from './init-app.recoil';
import {NavigationScreen} from '../../routes/navigation';
import {
  storageLoad,
  storageRemove,
  STORAGE_KEYS,
} from '../../api/storage.helper';
import {firebaseAuth} from './functions';
import {VALEU} from '../setting/setting-list-item';
import {Platform} from 'react-native';
import {IOS, ANDROID} from '../../../firebase-init';

const initFirebase = async () => {
  console.log('ANDROID.clientId,', Platform.OS, ANDROID.clientId);
  const credentials = {
    clientId: Platform.OS === 'ios' ? IOS.clientId : ANDROID.clientId,
    appId: Platform.OS === 'ios' ? IOS.appId : ANDROID.appId,
    apiKey: Platform.OS === 'ios' ? IOS.apiKey : ANDROID.apiKey,
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
    initFirebase()
      .then(() => {
        console.log('fin initFirebase');
      })
      .catch((e) => console.warn('initFirebase', e))
      .finally(() => storageLoad(STORAGE_KEYS.userInfo, setUserInfo, VALEU));
  }, [setUserInfo]);

  useEffect(() => {
    if (userInfo && Object.keys(userInfo).includes('id')) {
      setUserId(userInfo.id);
    } else {
      firebaseAuth(setUserId);
    }
  }, [setUserId, userInfo]);

  return <NavigationScreen />;
};
