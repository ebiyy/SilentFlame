import {atom} from 'recoil';
import firestore from '@react-native-firebase/firestore';

export const firestoreState = atom({
  key: 'firestore', // unique ID (with respect to other atoms/selectors)
  default: firestore(), // default value (aka initial value)
});

export const getDocRef = (docName: string | undefined, userId: string) =>
  firestore().collection('Meal').doc(userId).collection('Meal').doc(docName);
