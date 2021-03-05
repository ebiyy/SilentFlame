import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {View, StyleSheet, Text, VirtualizedList} from 'react-native';
import {useRecoilValue} from 'recoil';
import {TitleText} from '../../components/title-text';
import {firestoreState} from '../../api/firebase.helper';
import {userIdState} from '../init-app/init-app.recoil';
import {MealsLsit} from './meals-linst';
import {addDays, addZero, dateToStr} from '../../api/utils';
import {storage} from '../../api/storage.helper';
import {dateState} from '../date-manager/data-manager.recoil';
import {MealLsit} from './meal-list';
import {screenThemeColor} from '../../global/styles';

type Props = {
  timePeriod: TimePeriodKey;
};

export const LogMeals = (props: Props) => {
  const navigation = useNavigation();
  const {timePeriod} = props;
  const userId = useRecoilValue(userIdState);
  const date = useRecoilValue(dateState);
  const [LogMeals, setLogMeals] = useState<Meal[]>([]);

  useEffect(() => {
    const currentDate = new Date(date);
    // ex. today:"2021-03-04"
    // ["2021-03-04", "2021-03-03", "2021-03-02",
    // "2021-03-01", "2021-02-28", "2021-02-27", "2021-02-26"]
    const monthIds = [...new Array(31)].map((v, i) =>
      dateToStr(addDays(currentDate, -i)),
    );

    monthIds.forEach((id) => {
      storage
        .load({
          key: 'meals',
          id,
        })
        .then((res) => {
          setLogMeals((preState) => Array.from(new Set([...preState, ...res])));
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
  }, []);

  const Item = ({meal, isLast}) => (
    <MealLsit meal={meal} timePeriod={timePeriod} isLast={isLast} />
  );

  const renderItem = ({item}) => {
    const isLast = LogMeals.indexOf(item) + 1 === LogMeals.length;
    if (item) {
      return <Item meal={{...item}} isLast={isLast} />;
    }
    return <Text>履歴なし</Text>;
  };

  return (
    <View>
      <VirtualizedList
        data={[]}
        renderItem={renderItem}
        keyExtractor={(item, i) => String(i)}
        getItemCount={() => (LogMeals.length > 0 ? LogMeals.length : 0)}
        getItem={(date, i) => LogMeals[i]}
        ListEmptyComponent={
          LogMeals ? (
            <View style={{margin: 20}}>
              <Text
                style={{
                  textDecorationLine: 'underline',
                  textDecorationColor: screenThemeColor.meals,
                }}>
                履歴なし
              </Text>
            </View>
          ) : null
        }
        ListHeaderComponent={
          <View style={styles.headerConteinr}>
            <TitleText title="履歴" />
            <View style={styles.headerSubTextConteinr}>
              <Text>（過去１ヶ月間で登録された食品）</Text>
            </View>
          </View>
        }
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerConteinr: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerSubTextConteinr: {
    alignSelf: 'center',
  },
});
