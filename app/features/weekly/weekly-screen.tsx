import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useRecoilState, useRecoilValue} from 'recoil';
import {FadeInView} from '../../components/fade-in-view';
import {RateProgressBar} from '../../components/rate-progress-bar';
import {screenThemeColor, winHeight} from '../../global/styles';
import {PfcPieChart} from '../../components/pfc-pie-chart';
import {
  concatNutrientState,
  mealsENERC_KCALState,
  mealsWATERState,
} from '../meal/recoil.meal';
import {LossQuantityController} from './loss-quantity-controller';
import {storage, storageSave, STORAGE_KEYS} from '../../api/storage.helper';
import {sumMeal} from '../../components/functions';
import {addDays, dateToStr} from '../../api/utils';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {weeklyDataState} from './recoil.weekly';
import {userInfoState} from '../init-app/init-app.recoil';
import {SamplePickerModule} from '../../sample/picker-module';
import {mockWeekData} from './constants';
import {SampleBaner} from '../../components/sample-baner';
import {callInAppReview} from './sample-in-app-review';
import {useRoute} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {isAndroid, isIOS} from '@freakycoder/react-native-helpers';

export const WeeklyScreen = () => {
  const route = useRoute();
  const navigate = useNavigation();
  const concatNutrient = useRecoilValue(concatNutrientState); // need
  const [weekData, setWeekData] = useRecoilState(weeklyDataState);
  const [calWeekData, setCalWeekData] = useState<Meal>();
  const date = useRecoilValue(dateState);
  const userInfo = useRecoilValue(userInfoState);
  const [isCallReview, setIsCallReview] = useState<boolean>(true);
  const editable = useRecoilValue(editableState);

  // useEffect(() => {
  //   [
  //     'meals',
  //     // STORAGE_KEYS.userInfo,
  //     'mySuppli',
  //     'suppliToMeal',
  //     'suppliCount',
  //     'myWater',
  //     'waterToMeal',
  //     'waterCount',
  //     'weekly',
  //   ].forEach((key) => {
  //     storage.remove({key, id: dateToStr(new Date())});
  //   });
  // }, []);

  // useEffect(() => {
  //   [
  //     'meals',
  //     // STORAGE_KEYS.userInfo,
  //     'mySuppli',
  //     'suppliToMeal',
  //     'suppliCount',
  //     'myWater',
  //     'waterToMeal',
  //     'waterCount',
  //     'weekly',
  //   ].forEach((key) => {
  //     storage.remove({
  //       key,
  //     });
  //   });
  //   storage.clearMap();
  // }, []);

  useEffect(() => {
    console.log('WeeklyScreen::userInfo', userInfo, userInfo.water);
  }, [userInfo]);

  const callReview = () => {
    if (isCallReview) {
      callInAppReview();
    }
  };

  const getWeeklyData = () => {
    console.log('WeeklyScreen::getWeeklyData');
    setWeekData([]);
    const currentDate = new Date(date);
    // ex. today:"2021-03-04"
    // ["2021-03-04", "2021-03-03", "2021-03-02",
    // "2021-03-01", "2021-02-28", "2021-02-27", "2021-02-26"]
    const weeks = [...new Array(7)].map((v, i) =>
      dateToStr(addDays(currentDate, -i)),
    );
    // console.log('WeeklyScreen::weeks', weeks);

    weeks.forEach((id) => {
      storage
        .load({
          key: 'weekly',
          id,
        })
        .then((res) => {
          setWeekData((preState) => [...preState, {id, data: res}]);
        })
        .catch((err) => {
          // any exception including data not found
          // goes to catch()
          console.warn(err.message);
          switch (err.name) {
            case 'NotFoundError':
              // TODO;
              break;
            case 'ExpiredError':
              // TODO
              break;
          }
        });
    });
  };

  useEffect(() => {
    getWeeklyData();
  }, [date]);

  useEffect(() => {
    // console.log('WeeklyScreen::concatNutrient', concatNutrient, weekData);
    // weekDataのデータ取得前に動作するとまずいが大丈夫そう
    if (editable) {
      if (concatNutrient) {
        if (weekData.filter((v) => v.id === dateToStr(date)).length === 0) {
          setWeekData((preState) => [
            ...preState,
            {id: dateToStr(date), data: concatNutrient},
          ]);
        } else {
          setWeekData((preState) =>
            preState.map((v) =>
              v.id === dateToStr(date)
                ? {id: dateToStr(date), data: concatNutrient}
                : v,
            ),
          );
        }
      }
    }
  }, [concatNutrient]);

  useEffect(() => {
    if (weekData && weekData.flat().length > 0) {
      // console.log('WeeklyScreen::weekData', weekData);
      // console.log(
      //   'WeeklyScreen::weekData::map',
      //   weekData.flat().map((v) => v.data),
      // );
      setCalWeekData(
        sumMeal(
          weekData.flat().map((v) => v.data),
          weekData.flat().length,
        ),
      );
    }

    // 表示タイミングは1.5週、1ヶ月,1.25ヶ月分のデータができたら
    // TODO: 初期表示時以外で出したい、出たことを確認せずカウントアップしているが、連続して表示することを防止するのでそれはそれであり、だがなんとかしたい
    if (isCallReview) {
      setIsCallReview(false);
      storage.getIdsForKey('weekly').then((ids) => {
        console.log('weekly', ids, ids.length);
        if (ids.length >= 12 && userInfo.revieCount === undefined) {
          callReview();
          storageSave(STORAGE_KEYS.userInfo, {...userInfo, ...{revieCount: 1}});
        } else if (ids.length >= 30 && userInfo.revieCount === 1) {
          callReview();
          storageSave(STORAGE_KEYS.userInfo, {
            ...userInfo,
            ...{revieCount: userInfo.revieCount + 1},
          });
        } else if (ids.length === 37 && userInfo.revieCount === 2) {
          callReview();
          storageSave(STORAGE_KEYS.userInfo, {
            ...userInfo,
            ...{revieCount: userInfo.revieCount + 1},
          });
        }
      });
    }
  }, [weekData]);

  return (
    <FadeInView>
      <ScrollView scrollEnabled={winHeight < 800}>
        <View style={{marginTop: isAndroid ? winHeight * 0.1 : 0}}>
          {isIOS ? (
            <LossQuantityController />
          ) : (
            <View style={{marginTop: winHeight * 0.04}}></View>
          )}
          <View style={calWeekData ? {position: 'relative'} : {}}>
            <PfcPieChart
              weekData={calWeekData ? calWeekData : mockWeekData}
              boxShadow="black"
            />
            <View>
              <View style={styles.progressBarContainer}>
                <RateProgressBar
                  title="今週のカロリー平均"
                  rimit={
                    userInfo && userInfo.calorie
                      ? Number(userInfo.calorie)
                      : 2200
                  }
                  unit="kcal"
                  color="#FF6E6B"
                  recoilSelector={mealsENERC_KCALState}
                  value={Number(
                    calWeekData
                      ? calWeekData.ENERC_KCAL
                      : mockWeekData.ENERC_KCAL,
                  )}
                />
              </View>
              <View style={styles.progressBarContainer}>
                <RateProgressBar
                  title="今週の水分平均"
                  rimit={
                    userInfo && userInfo.water ? Number(userInfo.water) : 2
                  }
                  unit="L"
                  color={screenThemeColor.water}
                  recoilSelector={mealsWATERState}
                  value={Number(
                    (
                      Number(
                        calWeekData ? calWeekData.WATER : mockWeekData.WATER,
                      ) / 1000
                    ).toFixed(1),
                  )}
                />
              </View>
            </View>
            {!calWeekData && <SampleBaner type="bottom" />}
          </View>
        </View>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: winHeight * (isAndroid ? 0.065 : 0.03),
  },
});
