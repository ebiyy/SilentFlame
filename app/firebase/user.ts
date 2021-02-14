import firestore from '@react-native-firebase/firestore';

export const userExistenceCheck = (userId: string) => {
  const docRef = firestore().collection('Users').doc(userId);
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        docRef.update({
          updatedAt: new Date().toUTCString(),
        });
      } else {
        docRef.set({
          id: userId,
          createdAt: new Date().toUTCString(),
          updatedAt: new Date().toUTCString(),
        });
      }
    })
    .catch((error) => {
      console.log('Error getting document:', error);
    });
};
