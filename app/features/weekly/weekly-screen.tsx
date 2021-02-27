import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {useRecoilValue} from 'recoil';
import {FadeInView} from '../../components/fade-in-view';
import {RateProgressBar} from '../../components/rate-progress-bar';
import {screenThemeColor, winHeight} from '../../global/styles';
import {PfcPieChart} from '../../components/pfc-pie-chart';
import {
  mealsENERC_KCALState,
  mealsState,
  mealsWATERState,
} from '../meal/recoil.meal';
import {LossQuantityController} from './loss-quantity-controller';

export const WeeklyScreen = () => {
  const meals = useRecoilValue(mealsState);

  return (
    <FadeInView>
      <ScrollView scrollEnabled={winHeight < 800}>
        <LossQuantityController />
        <PfcPieChart meals={meals} boxShadow="black" />
        <View>
          <View style={styles.progressBarContainer}>
            <RateProgressBar
              title="今週のカロリー"
              rimit={2200}
              unit="kcal"
              color="#FF6E6B"
              recoilSelector={mealsENERC_KCALState}
            />
          </View>
          <View style={styles.progressBarContainer}>
            <RateProgressBar
              title="今週の水分"
              rimit={2}
              unit="L"
              color={screenThemeColor.water}
              recoilSelector={mealsWATERState}
            />
          </View>
        </View>
      </ScrollView>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    marginTop: winHeight * 0.03,
  },
});
