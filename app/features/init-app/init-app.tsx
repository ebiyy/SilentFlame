import React, {useEffect, useRef, useState} from 'react';
import {AppState, AppStateStatus} from 'react-native';

import {useRecoilState, useRecoilValue} from 'recoil';
import {comparisonDate, dateToStr} from '../../api/utils';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {
  suppliCountState,
  supplisState,
  suppliToMealState,
} from '../suppli/suppli.hook';
import {useDataManager} from './data-manager.hook';
import {FirebaseSetting} from './firebase';
import {appState, userInfoState} from './init-app.recoil';
import RNRestart from 'react-native-restart';

export const InitApp = () => {
  const appCurrentState = useRef(AppState.currentState);
  const [app, setApp] = useRecoilState(appState);
  const [date, setDate] = useRecoilState(dateState);
  const setCurrentDate = useDataManager();
  const userInfo = useRecoilValue(userInfoState);
  const [editable, setEditable] = useRecoilState(editableState);
  const [currentUserInfo, setCurrentUserInfo] = useState();
  const [beforeDate, setBeforeDate] = useState();

  useEffect(() => {
    console.log('hook init', appCurrentState.current, appCurrentState);
    AppState.addEventListener('change', handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, []);

  useEffect(() => {
    console.log('InitApp::useEffect::userInfo', userInfo);
    if (userInfo && userInfo.time) {
      setCurrentUserInfo(userInfo);
      const hour = Number(userInfo.time.split(':')[0]);
      const minuts = Number(userInfo.time.split(':')[1]);
      setCurrentDate(comparisonDate(new Date(), hour, minuts)); // get storage data
    }
  }, [userInfo]);

  const getToday = () => {
    if (userInfo && userInfo.time) {
      const hour = Number(userInfo.time.split(':')[0]);
      const minuts = Number(userInfo.time.split(':')[1]);
      return comparisonDate(new Date(), hour, minuts);
    }
    return null;
  };

  useEffect(() => {
    if (getToday() && dateToStr(getToday()) === dateToStr(date)) {
      setEditable(true);
    }
  }, [date]);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (
      appCurrentState.current.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      console.log('App has come to the foreground!');

      // if (userInfo && userInfo.time) {
      //   const hour = Number(userInfo.time.split(':')[0]);
      //   const minuts = Number(userInfo.time.split(':')[1]);
      //   console.log('InitApp::hour, minuts', hour, minuts);
      //   console.log(
      //     'InitApp::comparisonDate',
      //     comparisonDate(new Date(), hour, minuts),
      //     new Date(dateToStr(date)),
      //     comparisonDate(new Date(), hour, minuts) > new Date(dateToStr(date)),
      //   );
      //   if (
      //     comparisonDate(new Date(), hour, minuts) > new Date(dateToStr(date))
      //   ) {
      //     console.log('change date');
      //     setEditable(false);
      //     setDate(new Date());
      //   }
      // }
    }
    if (
      appCurrentState.current.match(/inactive/) &&
      nextAppState === 'background'
    ) {
      RNRestart.Restart();
    }
    appCurrentState.current = nextAppState;
    setApp(appCurrentState.current);
    console.log('appCurrentState.current', appCurrentState.current);
  };

  return <FirebaseSetting />;
};
