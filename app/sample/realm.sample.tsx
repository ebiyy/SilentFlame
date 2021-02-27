import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
// import Realm from 'realm';

export const SampleRealm = () => {
  // const [realm, setRealm] = useState<Realm>();

  // useEffect(() => {
  //   Realm.open({
  //     schema: [{name: 'Dog', properties: {name: 'string'}}],
  //   }).then((realm2: Realm) => {
  //     realm2.write(() => {
  //       // let allDogs = realm2.objects('Dog');
  //       // realm2.delete(allDogs); // すべてのBookオブジェクトを削除します
  //       realm2.create('Dog', {name: 'Rex'});
  //     });
  //     setRealm(realm2);
  //   });

  //   // 【終了処理】処理が終了したらデータベースを閉じる
  //   const cleanup = () => {
  //     if (realm !== undefined && !realm.isClosed) {
  //       realm.close();
  //     }
  //   };

  //   // return する関数が終了処理(componentWillUnmountに相当)
  //   return cleanup;
  // }, []);

  // const info = realm
  //   ? 'Number of dogs in this Realm: '
  //   : +realm.objects('Dog').length;
  // ('Loading...');

  // console.log(realm?.path);

  return (
    <>
      <SafeAreaView>
        {/* <Text>{info}</Text> */}
        <Text>---</Text>
        {/* <Text>{realm?.path}</Text> */}
      </SafeAreaView>
    </>
  );
};
