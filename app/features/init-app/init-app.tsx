import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {useRecoilState} from 'recoil';
import {FirebaseSetting} from './firebase';
import {appState} from './init-app.recoil';

export const InitApp = () => {
  const appCurrentState = useRef(AppState.currentState);
  const [app, setApp] = useRecoilState(appState);

  useEffect(() => {
    console.log('hook init', appCurrentState.current, appCurrentState);
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appCurrentState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
    }
    appCurrentState.current = nextAppState;
    setApp(appCurrentState.current);
    console.log('appCurrentState.current', appCurrentState.current);
  };

  return <FirebaseSetting />;
};
