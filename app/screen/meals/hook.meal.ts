import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useRecoilState, useRecoilValue} from 'recoil';
import {firestoreState, getDocRef, getOtherDay} from '../../firebase/meal';
import {actionMealState, mealsState} from './recoil.meal';
import {userIdState} from '../../recoil/user';

export const useMargeMealState = () => {
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);
  const [meals, setMeals] = useRecoilState(mealsState);
  const [localMeals, setLocalMeals] = useState<LocalMeal[]>();
  const [cloudMeals, setCloudMeals] = useState<CloudMeal[]>();
  const userId = useRecoilValue(userIdState);
  const firestore = useRecoilValue(firestoreState);
  const [value, loading, error] = useCollection(
    firestore
      .collection('Meal')
      .doc(userId)
      .collection('Meal')
      .where('addedAt', '>', new Date(getOtherDay(-1)))
      .where('addedAt', '<', new Date(getOtherDay(1))),
    {
      snapshotListenOptions: {includeMetadataChanges: true},
    },
  );
  // 下記の用途で使用
  // アプリ起動時にcloudからデータを取得
  // cloudでデータの更新があったときにデータを取得
  useEffect(() => {
    console.log('useMargeMealState::value::start');
    if (value) {
      console.log('useMargeMealState::value::add');
      const cloudData = (value as FirebaseFirestoreTypes.QuerySnapshot<CloudMeal>).docs.map(
        (obj) => obj.data(),
      );
      setCloudMeals(cloudData);
    }
  }, [value]);

  // 新しい食品をfirebaseにupload、できなかった場合はmemoryに保存
  const setItem = (item: CloudMeal | LocalMeal) => {
    let addItem: CloudMeal;
    let docRef: FirebaseFirestoreTypes.DocumentReference<FirebaseFirestoreTypes.DocumentData>;
    if (item.hasOwnProperty('id')) {
      docRef = getDocRef((item as CloudMeal).id, userId);
      addItem = item as CloudMeal;
    } else {
      docRef = getDocRef(undefined, userId);
      addItem = {
        ...(item as LocalMeal),
        id: docRef.id,
      };
    }
    docRef
      .set(addItem)
      .then(() => {
        console.log('added item', addItem.id);
      })
      .catch((e) => {
        console.log(e, item.foodName);
        setLocalMeals((preState) =>
          preState ? preState.concat([item]) : [item],
        );
      });
  };

  const deleteItem = (item: CloudMeal | LocalMeal) => {
    if (item.hasOwnProperty('id')) {
      const docRef = getDocRef((item as CloudMeal).id, userId);
      docRef
        .delete()
        .then(() => console.log('delete complite!', (item as CloudMeal).id))
        .catch((e) => console.warn(e, 'delete Error'));
    } else {
      setLocalMeals((preState) =>
        preState
          ? preState.filter((meal) => meal.addedAt !== item.addedAt)
          : [item],
      );
    }
  };

  useEffect(() => {
    console.log('useMargeMealState::addMeal::start');
    if (actionMeal === undefined) return;
    switch (actionMeal.action) {
      case 'set':
        console.log('useMargeMealState::actionMeal::set');
        setItem(actionMeal.item);
        setActionMeal(undefined);
        break;
      case 'delete':
        console.log('useMargeMealState::actionMeal::delete');
        deleteItem(actionMeal.item);
        setActionMeal(undefined);
        break;
    }
  }, [actionMeal]);

  // ローカルデータとクラウドデータをマージ
  useEffect(() => {
    console.log('useMargeMealState::marge::start');
    if (localMeals && cloudMeals) {
      setMeals(localMeals.concat(cloudMeals));
    } else if (cloudMeals) {
      setMeals(cloudMeals);
    } else if (localMeals) {
      setMeals(localMeals);
    }
  }, [localMeals, cloudMeals]);

  return meals;
};
