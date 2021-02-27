import React, {useState, useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {atom, useRecoilState} from 'recoil';
import {FirebaseSetting} from '../firebase/firebase';

export const recoilAppState = atom<AppStateStatus>({
  key: 'recoilAppState',
  default: AppState.currentState,
});

export const InitApp = () => {
  const appCurrentState = useRef(AppState.currentState);
  const [state, setState] = useRecoilState(recoilAppState);

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
    setState(appCurrentState.current);
    console.log('appCurrentState.current', appCurrentState.current);
  };

  return <FirebaseSetting />;
};
