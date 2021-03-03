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
import {storage} from '../../api/storage.helper';
import {sumMeal} from '../../components/functions';
import {addDays, dateToStr} from '../../api/utils';
import {dateState} from '../date-manager/data-manager.recoil';
import {weeklyDataState} from './recoil.weekly';

export const WeeklyScreen = () => {
  const concatNutrient = useRecoilValue(concatNutrientState); // need
  const [weekData, setWeekData] = useRecoilState(weeklyDataState);
  const [calWeekData, setCalWeekData] = useState<Meal>();
  const date = useRecoilValue(dateState);

  useEffect(() => {
    console.log('WeeklyScreen::useEffect');
    setWeekData([]);
    const currentDate = new Date(date);
    // ex. today:"2021-03-04"
    // ["2021-03-04", "2021-03-03", "2021-03-02",
    // "2021-03-01", "2021-02-28", "2021-02-27", "2021-02-26"]
    const weeks = [...new Array(7)].map((v, i) =>
      dateToStr(addDays(currentDate, -i)),
    );
    console.log('WeeklyScreen::weeks', weeks);

    weeks.forEach((id) => {
      storage
        .load({
          key: 'weekly',
          id,
        })
        .then((res) => {
          setWeekData((preState) => [...preState, res]);
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
  }, [date]);

  useEffect(() => {
    if (weekData && weekData.length > 0) {
      setCalWeekData(sumMeal(weekData.flat(), weekData.length));
    }
  }, [weekData]);

  return (
    <FadeInView>
      <ScrollView scrollEnabled={winHeight < 800}>
        <LossQuantityController />
        {calWeekData && (
          <>
            <PfcPieChart weekData={calWeekData} boxShadow="black" />
            <View>
              <View style={styles.progressBarContainer}>
                <RateProgressBar
                  title="今週のカロリー平均"
                  rimit={2200}
                  unit="kcal"
                  color="#FF6E6B"
                  recoilSelector={mealsENERC_KCALState}
                  value={Number(calWeekData.ENERC_KCAL)}
                />
              </View>
              <View style={styles.progressBarContainer}>
                <RateProgressBar
                  title="今週の水分平均"
                  rimit={2}
                  unit="L"
                  color={screenThemeColor.water}
                  recoilSelector={mealsWATERState}
                  value={Number(calWeekData.WATER)}
                />
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: winHeight * 0.03,
  },
});
