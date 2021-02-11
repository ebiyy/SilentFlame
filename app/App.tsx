import React from 'react';
import {RecoilRoot} from 'recoil';
import NavigationScreen from './navigation';

import {clientId, appId, apiKey, projectId} from '@env';
import firebase from '@react-native-firebase/app';
import inAppMessaging from '@react-native-firebase/in-app-messaging';

console.log('pro', process.env.apiKey);
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
  await firebase.initializeApp(credentials, config);
  await inAppMessaging().setMessagesDisplaySuppressed(true);
};
initFirebase()
  .then(() => console.log('fin initFirebase'))
  .catch((e) => console.warn('initFirebase', e));

const App = () => (
  <RecoilRoot>
    <NavigationScreen />
  </RecoilRoot>
);

export default App;
