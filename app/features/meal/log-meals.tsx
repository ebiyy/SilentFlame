import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {View, StyleSheet} from 'react-native';
import {useRecoilValue} from 'recoil';
import {TitleText} from '../../components/title-text';
import {firestoreState} from '../../api/firebase.helper';
import {userIdState} from '../init-app/init-app.recoil';
import {MealsLsit} from './meals-linst';

type Props = {
  timePeriod: TimePeriodKey;
};

export const LogMeals = (props: Props) => {
  const navigation = useNavigation();
  const {timePeriod} = props;
  const userId = useRecoilValue(userIdState);
  const firestore = useRecoilValue(firestoreState);
  const [value, loading, error] = useCollection(
    firestore
      .collection('Meal')
      .doc(userId)
      .collection('Meal')
      .orderBy('addedAt')
      .limit(25),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    },
  );
  const [meals, setMeal] = useState();

  useEffect(() => {
    console.log(
      value && (value as FirebaseFirestoreTypes.QuerySnapshot<CloudMeal>).size,
    );
    if (value) {
      setMeal(
        (value as FirebaseFirestoreTypes.QuerySnapshot<CloudMeal>).docs.map(
          (snap) => {
            const meal = snap.data();
            delete meal.id;
            delete meal.addedAt;
            delete meal.updatedAt;
            delete meal.timePeriod;
            return meal;
          },
        ),
      );
    }
  }, [value]);

  return (
    <View>
      <TitleText title="履歴" />
      {meals && <MealsLsit meals={meals} timePeriod={timePeriod} />}
    </View>
  );
};

const styles = StyleSheet.create({});
