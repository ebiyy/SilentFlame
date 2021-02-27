import firestore from '@react-native-firebase/firestore';
import {atom} from 'recoil';

export const firestoreState = atom({
  key: 'firestore', // unique ID (with respect to other atoms/selectors)
  default: firestore(), // default value (aka initial value)
});

// ex. 2021-2-12
export const toDay = new Intl.DateTimeFormat('ja-JP', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
})
  .format(new Date())
  .replaceAll('/', '-');

export const getOtherDay = (num: number) => {
  const date = new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  })
    .format(new Date().setDate(new Date().getDate() + num))
    .replaceAll('/', '-');
  return replaceDate(date);
};

export const getDocRef = (docName: string | undefined, userId: string) =>
  firestore().collection('Meal').doc(userId).collection('Meal').doc(docName);
