import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import {useState, useEffect} from 'react';
import {useCollection} from 'react-firebase-hooks/firestore';
import {useRecoilState, useRecoilValue} from 'recoil';
import {firestoreState, getDocRef, getFormatDate} from '../../firebase/meal';
import {actionMealState, mealsState} from './recoil.meal';
import {userIdState} from '../../recoil/user';
import {dateState, weeksBeginningDateState} from '../date.recoil';
import {appVersion} from '../../global-constant';
import storage from '../../helpers/custom-async-storage';

export const useMargeMealState = () => {
  const [actionMeal, setActionMeal] = useRecoilState(actionMealState);
  const [meals, setMeals] = useRecoilState(mealsState);
  const [localMeals, setLocalMeals] = useState<Meal[]>();
  const [cloudMeals, setCloudMeals] = useState<Meal[]>();
  const date = useRecoilValue(dateState);
  const weeksBeginningDate = useRecoilValue(weeksBeginningDateState);
  const userId = useRecoilValue(userIdState);
  const [docRef, setDocRef] = useState(getDocRef(weeksBeginningDate, userId));
  const [value, loading, error] = useCollection(docRef, {
    snapshotListenOptions: {includeMetadataChanges: true},
  });

  const dateKey = getFormatDate(date);

  const createDateObj = {
    [dateKey]: {
      meals: [],
      author: userId,
      createAt: new Date(),
      updatedAt: new Date(),
      appVersion: appVersion,
    },
  };

  useEffect(() => {
    storage
      .load({
        key: 'meals',
        // autoSync (default: true) means if data is not found or has expired,
        // then invoke the corresponding sync method
        autoSync: true,
        // syncInBackground (default: true) means if data expired,
        // return the outdated data first while invoking the sync method.
        // If syncInBackground is set to false, and there is expired data,
        // it will wait for the new data and return only after the sync completed.
        // (This, of course, is slower)
        syncInBackground: true,
        // you can pass extra params to the sync method
        // see sync example below
        syncParams: {
          extraFetchOptions: {
            // blahblah
          },
          someFlag: true,
        },
      })
      .then((ret: {[date: string]: Meal}) => {
        // found data go to then()
        console.log('----async-storage----');
        console.log(Object.keys(ret).map((key) => key));
        console.log('----async-storage----');
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
  }, []);

  useState(() => {
    storage.save({
      key: 'meals', // Note: Do not use underscore("_") in key!
      data: {
        [dateKey]: meals,
      },
      // if expires not specified, the defaultExpires will be applied instead.
      // if set to null, then it will never expire.
      expires: 1000 * 3600,
    });
  }, [meals]);

  // 下記の用途で使用
  // アプリ起動時にcloudからデータを取得
  // cloudでデータの更新があったときにデータを取得
  useEffect(() => {
    // console.log(dateKey);
    if (userId === '') console.error('useMargeMealState::value::uidNull');
    console.log('useMargeMealState::value::start');
    if (value) {
      console.log('useMargeMealState::value::createDocs');
      const cloudocs = (value as FirebaseFirestoreTypes.DocumentSnapshot<MealDocs>).data();
      if (cloudocs === undefined) {
        console.log('date', date);
        console.log('weeksBeginningDate', weeksBeginningDate);
        console.log('docRef.path', docRef.path);
        docRef
          .set({
            author: userId,
            createAt: new Date(),
            updatedAt: new Date(),
            appVersion: '1.0.0',
            ...createDateObj,
          })
          .then(() => {
            console.log('useMargeMealState::value::createDocs::');
          })
          .catch((e) => {
            console.warn(e, 'ERROR::useMargeMealState::value::created');
          });
      } else if (cloudocs[dateKey] === undefined) {
        docRef
          .update(createDateObj)
          .then(() => {
            console.log('useMargeMealState::value::created');
          })
          .catch((e) => {
            console.warn(e, 'ERROR::useMargeMealState::value::created');
          });
      } else {
        // console.log('cloudocs.meals', cloudocs[dateKey].meals);
        setCloudMeals(cloudocs[dateKey].meals);
      }
    }
  }, [value]);

  // 新しい食品をfirebaseにupload、できなかった場合はmemoryに保存
  const addItem = (item: Meal) => {
    docRef
      .update({
        [dateKey]: {meals: meals.length > 0 ? [...meals, item] : [item]},
      })
      .then(() => {
        console.log('added item', item.id);
      })
      .catch((e) => {
        console.error(e, 'dont add', item.foodName);
        const localAdd: Meal = {...item, failed: 'add'};
        setLocalMeals((preState) =>
          // 存在確認必要
          preState ? preState.concat([localAdd]) : [localAdd],
        );
      });
  };

  const updateItem = (item: Meal) => {
    console.log(
      'id check',
      meals.map((meal) => meal.id),
    );
    console.log('id check', item.id);
    docRef
      .update({
        [dateKey]: {
          meals: meals.map((meal) => (meal.id === item.id ? item : meal)),
        },
      })
      .then(() => {
        console.log('updated item', item.id);
      })
      .catch((e) => {
        console.error(e, 'dont upload', item.foodName);
        const localAdd: Meal = {...item, failed: 'update'};
        setLocalMeals((preState) =>
          // 存在確認必要
          preState ? preState.concat([localAdd]) : [localAdd],
        );
      });
  };

  const deleteItem = (item: Meal) => {
    docRef
      .update({[dateKey]: {meals: meals.filter((meal) => meal.id !== item.id)}})
      .then(() => console.log('delete complite!', item.id))
      .catch((e) => {
        console.warn(e, 'delete Error');
        const localDelete: Meal = {...item, failed: 'delete'};
        setLocalMeals((preState) =>
          preState
            ? preState.map((meal) => meal.id).includes(localDelete.id)
              ? preState.map((meal) =>
                  meal.id === localDelete.id ? localDelete : meal,
                )
              : preState.concat([localDelete])
            : [localDelete],
        );
      });
  };

  useEffect(() => {
    console.log('useMargeMealState::addMeal::start');
    if (actionMeal === undefined) return;
    switch (actionMeal.action) {
      case 'add':
        console.log('useMargeMealState::actionMeal::update');
        addItem(actionMeal.item);
        setActionMeal(undefined);
        break;
      case 'update':
        console.log('useMargeMealState::actionMeal::update');
        updateItem(actionMeal.item);
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
    if (cloudMeals && localMeals === undefined) {
      // console.log('cloudMeals', cloudMeals)
      console.log('useMargeMealState::marge::cloudMeals');
      setMeals(cloudMeals);
    } else if (cloudMeals && localMeals) {
      console.log('useMargeMealState::marge::Marge');
      const cloudMealIds = cloudMeals.map((meal) => meal.id);

      // add logic
      const addItemIds = localMeals
        .filter((meal) => meal.failed === 'add')
        .map((meal) => meal.id);
      if (addItemIds.length > 0) {
        const addedItems = addItemIds.filter((itemId) =>
          cloudMealIds.includes(itemId),
        );
        if (addedItems.length > 0) {
          localMeals.filter((meal) => !addedItems.includes(meal));
        }
      }

      // update logic
      // 削除したitemのidを配列化
      const updateItemIds = localMeals
        .filter((meal) => meal.failed === 'update')
        .map((meal) => meal.id);
      if (updateItemIds.length > 0) {
        const updatedItems = updateItemIds.filter((itemId) =>
          cloudMealIds.includes(itemId),
        );
        if (updatedItems.length > 0) {
          updatedItems.forEach((itemId) => {
            const cloudItemIndex = cloudMeals[cloudMeals.indexOf(itemId)];
            const localItemIndex = localMeals[localMeals.indexOf(itemId)];
            const cloudItem = cloudMeals[cloudItemIndex];
            const localItem = localMeals[localItemIndex];
            if (cloudItem.updatedAt > localItem.updatedAt) {
              localMeals.filter((m, i) => i !== localItemIndex);
            }
            if (cloudItem.updatedAt < localItem.updatedAt) {
              cloudMeals.filter((m, i) => i !== cloudItemIndex);
            }
          });
        }
      }

      // delete logic
      // 削除したitemのidを配列化
      const deleteItemIds = localMeals
        .filter((meal) => meal.failed === 'delete')
        .map((meal) => meal.id);
      if (deleteItemIds.length > 0) {
        // 削除したitemIdに一致するcloudMealsがあれば削除
        // 削除したitemIdに一致するものがなければlocalMealsを削除
        deleteItemIds.forEach((itemId) => {
          const deletedCloudMealIdIndex = cloudMealIds.indexOf(itemId);
          if (deletedCloudMealIdIndex > -1) {
            const cloudItemIndex = cloudMeals[cloudMeals.indexOf(itemId)];
            cloudMeals.slice(cloudItemIndex, 1);
          } else {
            const localItemIndex = localMeals[localMeals.indexOf(itemId)];
            localMeals.slice(localItemIndex, 1);
          }
        });
      }
      setMeals(localMeals.concat(cloudMeals));
    } else if (localMeals && cloudMeals === undefined) {
      console.log('useMargeMealState::marge::localMeals');
      setMeals(localMeals);
    }
  }, [localMeals, cloudMeals]);

  return meals.filter((meal) => meal.failed !== 'delete');
};
