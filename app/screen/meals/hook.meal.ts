import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useRecoilState, useRecoilValue} from 'recoil';
import {firestoreState, getDocRef, toDay} from '../../firebase/meal';
import {cloudMealsState, localMealsState, mealsState} from './recoil.meal';
import {userIdState} from '../../recoil/user';

type ActionMealType = 'set' | 'delete';

interface ActionMeal {
  item: CloudMeal | LocalMeal;
  action: ActionMealType;
}

export const useMargeMealState = () => {
  const [actionMeal, setActionMeal] = useState<ActionMeal>();
  const [meals, setMeals] = useRecoilState(mealsState);
  const [localMeals, setLocalMeals] = useRecoilState(localMealsState);
  const [cloudMeals, setCloudMeals] = useRecoilState(cloudMealsState);
  const userId = useRecoilValue(userIdState);
  const firestore = useRecoilValue(firestoreState);
  const [value, loading, error] = useCollection(
    firestore.collection('Meal').doc(userId).collection(toDay),
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
        setLocalMeals((preState) => preState.concat([item]));
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
        preState.filter((meal) => meal.addedAt !== item.addedAt),
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
        break;
      case 'delete':
        console.log('useMargeMealState::actionMeal::delete');
        deleteItem(actionMeal.item);
        break;
    }
  }, [actionMeal]);

  // ローカルデータとクラウドデータをマージ
  useEffect(() => {
    console.log('useMargeMealState::marge::start');
    setMeals(localMeals.concat(cloudMeals));
  }, [localMeals, cloudMeals]);

  return {meals, setActionMeal};
};
