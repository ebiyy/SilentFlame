import React, {useEffect, useRef} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {useRecoilState, useRecoilValue} from 'recoil';
import {comparisonDate, dateToStr} from '../../api/utils';
import {dateState} from '../date-manager/data-manager.recoil';
import {useDataManager} from './data-manager.hook';
import {FirebaseSetting} from './firebase';
import {appState, userInfoState} from './init-app.recoil';

export const InitApp = () => {
  const appCurrentState = useRef(AppState.currentState);
  const [app, setApp] = useRecoilState(appState);
  const [date, setDate] = useRecoilState(dateState);
  const setCurrentDate = useDataManager();
  const userInfo = useRecoilValue(userInfoState);

  useEffect(() => {
    console.log('hook init', appCurrentState.current, appCurrentState);
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    if (userInfo && userInfo.time) {
      const hour = Number(userInfo.time.split(':')[0]);
      const minuts = Number(userInfo.time.split(':')[1]);
      setCurrentDate(comparisonDate(new Date(), hour, minuts)); // get storage data
    }
  }, [userInfo]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appCurrentState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');
      if (userInfo && userInfo.time) {
        const hour = Number(userInfo.time.split(':')[0]);
        const minuts = Number(userInfo.time.split(':')[1]);
        console.log(hour, minuts);
        if (
          comparisonDate(new Date(), hour, minuts) > new Date(dateToStr(date))
        ) {
          console.log('change date');
          setDate(new Date());
        }
      }
    }
    appCurrentState.current = nextAppState;
    setApp(appCurrentState.current);
    console.log('appCurrentState.current', appCurrentState.current);
  };

  return <FirebaseSetting />;
};
