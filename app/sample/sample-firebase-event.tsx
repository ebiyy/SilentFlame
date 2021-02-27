import React, {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import analytics, {firebase} from '@react-native-firebase/analytics';

export const FirebaseCustomEvent = () => {
  const [isInitFirebase, setIsInitFirebase] = useState(true);
  useEffect(() => {
    firebase
      .analytics()
      .setAnalyticsCollectionEnabled(true)
      .then(() => setIsInitFirebase(true))
      .catch((e) => console.log('analytics', e));
  }, []);
  return (
    <View>
      {isInitFirebase && (
        <Button
          title="Add To Basket"
          onPress={async () =>
            await analytics().logEvent('basket', {
              id: 3745092,
              item: 'mens grey t-shirt',
              description: ['round neck', 'long sleeved'],
              size: 'L',
            })
          }
        />
      )}
    </View>
  );
};
