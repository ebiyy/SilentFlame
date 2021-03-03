import React, {useEffect, useState} from 'react';
import {useRecoilState} from 'recoil';
import {storageLoad, storageLoadDateData} from '../../api/storage.helper';
import {dateToStr, isToday} from '../../api/utils';
import {dateState, editableState} from '../date-manager/data-manager.recoil';
import {mealsState} from '../meal/recoil.meal';
import {
  supplisState,
  suppliToMealState,
  suppliCountState,
} from '../suppli/suppli.hook';
import {initialWater} from '../water/constans';
import {
  watersState,
  waterCountState,
  waterToMealState,
} from '../water/water.hook';

// const [suppli, setSuppli] = useRecoilState(supplisState);
// const [suppliToMeal, setSuppliToMeal] = useRecoilState(suppliToMealState);
// const [suppliCount, setSuppliCount] = useRecoilState(suppliCountState);
// const [meals, setMeals] = useRecoilState(mealsState);
// const [waters, setWaters] = useRecoilState(watersState);
// const [waterCount, setWaterCount] = useRecoilState(waterCountState);
// const [waterToMeal, setWaterToMeal] = useRecoilState(waterToMealState);
// const [editable, setEditable] = useRecoilState(editableState);
// const [date, setDate] = useRecoilState(dateState);

export const useDataManager = () => {
  const [currentDate, setCurrentDate] = useState<Date>();
  const setSuppli = useRecoilState(supplisState)[1];
  const setSuppliToMeal = useRecoilState(suppliToMealState)[1];
  const setSuppliCount = useRecoilState(suppliCountState)[1];
  const setMeals = useRecoilState(mealsState)[1];
  const setWaters = useRecoilState(watersState)[1];
  const setWaterCount = useRecoilState(waterCountState)[1];
  const setWaterToMeal = useRecoilState(waterToMealState)[1];
  const setEditable = useRecoilState(editableState)[1];
  const setDate = useRecoilState(dateState)[1];

  useEffect(() => {
    if (currentDate) {
      const getSuppliData = () => {
        if (isToday(currentDate)) {
          storageLoad('mySuppli', setSuppli, []);
        } else {
          storageLoadDateData(
            'mySuppli',
            dateToStr(currentDate),
            setSuppli,
            [],
          );
        }
        storageLoadDateData(
          'suppliToMeal',
          dateToStr(currentDate),
          setSuppliToMeal,
          {},
        );
        storageLoadDateData(
          'suppliCount',
          dateToStr(currentDate),
          setSuppliCount,
          {},
        );
      };

      const getMealsData = () => {
        storageLoadDateData('meals', dateToStr(currentDate), setMeals, []);
      };

      const getWaterData = () => {
        if (isToday(currentDate)) {
          storageLoad('myWater', setWaters, initialWater);
        } else {
          storageLoadDateData('myWater', dateToStr(currentDate), setWaters, []);
        }
        storageLoadDateData(
          'waterCount',
          dateToStr(currentDate),
          setWaterCount,
          {},
        );
        storageLoadDateData(
          'waterToMeal',
          dateToStr(currentDate),
          setWaterToMeal,
          [],
        );
      };

      setEditable(false);
      getSuppliData();
      getMealsData();
      getWaterData();
      setDate(currentDate);
    }
  }, [currentDate]);

  return setCurrentDate;
};
