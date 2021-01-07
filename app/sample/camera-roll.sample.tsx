// カメラロールにアクセスできる。
// 全ての画像を取得など、画像を選択できないため削除ようかも

import CameraRoll, {PhotoIdentifier***REMOVED*** from '@react-native-community/cameraroll';
import React, {useState***REMOVED*** from 'react';
import {ScrollView***REMOVED*** from 'react-native';
import {View, Button, Image***REMOVED*** from 'react-native';

const SampleCameraRoll = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>();

  const handleButtonPress = () => {
    CameraRoll.getPhotos({
      first: 1,
      assetType: 'Photos',
    ***REMOVED***)
      .then((r) => {
        setPhotos(r.edges);
      ***REMOVED***)
      .catch((err) => {
        //Error Loading Images
      ***REMOVED***
  ***REMOVED***

***REMOVED***
***REMOVED***
      <View>
        <Button title="Load Images" onPress={handleButtonPress***REMOVED*** />
        <ScrollView>
          {photos
            ? photos.map((p, i) => {
              ***REMOVED***
                  <Image
                    key={i***REMOVED***
                    style={{
                      width: 300,
                      height: 100,
                    ***REMOVED******REMOVED***
                    source={{uri: p.node.image.uri***REMOVED******REMOVED***
                  />
              ***REMOVED***
              ***REMOVED***)
            : null***REMOVED***
        </ScrollView>
      </View>
***REMOVED***
***REMOVED***
***REMOVED***

export default SampleCameraRoll;
