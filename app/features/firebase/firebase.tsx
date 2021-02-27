import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';

import {clientId, appId, apiKey, projectId} from '@env';
import firebase from '@react-native-firebase/app';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import auth from '@react-native-firebase/auth';
import {userState} from '../init-app/user.recoil';
import {userExistenceCheck} from './user';
import {NavigationScreen} from '../../routes/navigation';

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
  await inAppMessaging().setMessagesDisplaySuppressed(true);
};

export const FirebaseSetting = () => {
  const [user, setUser] = useRecoilState(userState);
  useEffect(() => {
    // todo: ここで毎回の起動時にcallされるか要検証
    initFirebase()
      .then(() => {
        console.log('fin initFirebase');
        auth()
          .signInAnonymously()
          .then((u) => {
            console.log('User signed in anonymously', u);
            userExistenceCheck(u.user.uid);
            setUser(u);
          })
          .catch((error) => {
            if (error.code === 'auth/operation-not-allowed') {
              console.log('Enable anonymous in your firebase console.');
            }
            console.error('auth', error);
          });
      })
      .catch((e) => console.warn('initFirebase', e));
  }, []);

  return <NavigationScreen />;
};
