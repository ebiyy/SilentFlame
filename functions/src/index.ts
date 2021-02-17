import * as functions from 'firebase-functions';
// @ts-ignore
import * as MeCab from 'mecab-async';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', {structuredData: true});
  response.send('Hello from Firebase!');
});

// exports.makeUppercase = functions.firestore
//   .document('/messages/{documentId}')
//   .onCreate((snap, context) => {
//     const original = snap.data().original;
//     console.log('Uppercasing', context.params.documentId, original);
//     const uppercase = original.toUpperCase();
//     return snap.ref.set({uppercase}, {merge: true});
//   });

exports.mecab = functions.https.onRequest((request, response) => {
  // const MeCab = new require('mecab-async');
  const mecab = new MeCab();
  mecab.parse(
    'いつもニコニコあなたの隣に這い寄る混沌ニャルラトホテプです！',
    (err: any, result: any) => {
      if (err) throw err;
      return response.send(result);
    },
  );
});
