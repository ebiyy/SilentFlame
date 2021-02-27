// カメラロールにアクセスできる。
// 全ての画像を取得など、画像を選択できないため削除ようかも

import CameraRoll, {PhotoIdentifier} from '@react-native-community/cameraroll';
import React, {useState} from 'react';
import {ScrollView} from 'react-native';
import {View, Button, Image} from 'react-native';

export const SampleCameraRoll = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>();

  const handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    })
      .then((r) => {
        setPhotos(r.edges);
      })
      .catch((err) => {
        //Error Loading Images
      });
  };

  return (
    <>
      <View>
        <Button title="Load Images" onPress={handleButtonPress} />
        <ScrollView>
          {photos
            ? photos.map((p, i) => {
                return (
                  <Image
                    key={i}
                    style={{
                      width: 300,
                      height: 100,
                    }}
                    source={{uri: p.node.image.uri}}
                  />
                );
              })
            : null}
        </ScrollView>
      </View>
    </>
  );
};
