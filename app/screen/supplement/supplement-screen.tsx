import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountSupplement from './count-supplement';
import {ComStyles} from '../../global-style';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {isSupplisStorageState, supplisState} from './suppli.hook';
import FadeInView from '../../components/fade-in-view';
import RecycleBtn from './components/recycle-btn';
import ItemActions from './components/item-actions';
import storage from '../../helpers/custom-async-storage';
import {useNavigation} from '@react-navigation/native';

const SupplementScreen = () => {
  const navigation = useNavigation();
  const [switchCount, setSwitchCount] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const [supplis, setSupplis] = useRecoilState(supplisState);
  const supplisStorage = useRecoilValue(isSupplisStorageState);

  useEffect(() => {
    // storage.save({
    //   key: 'mySuppli',
    //   data: supplis,
    //   expires: 1000 * 3600,
    // });
    console.log('supplisStorage', supplisStorage);
    storage
      .load({
        key: 'mySuppli',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {},
          someFlag: true,
        },
      })
      .then((res) => {
        console.log(
          'get supplis data',
          res.map((o) => o.suppliName),
        );
        setSupplis(res);
      })
      .catch((err) => {
        switch (err.name) {
          case 'NotFoundError':
            // TODO;
            break;
          case 'ExpiredError':
            storage.remove({
              key: 'mySuppli',
            });
            break;
        }
      });
  }, []);

  return (
    <ScrollView>
      <View style={Styles.screenContainer}>
        <View style={[ComStyles.centeringContainer, Styles.addButtonContainer]}>
          <ItemActions
            switchCount={switchCount}
            setSwitchCount={setSwitchCount}
            isDelete={isDelete}
            setIsDelete={setIsDelete}
          />
        </View>
        <FadeInView>
          {supplis
            .filter((suppli) => !suppli.delete)
            .map((suppli, i) => (
              <CountSupplement
                key={i}
                suppli={suppli}
                switchCount={switchCount}
                isDelete={isDelete}
              />
            ))}
        </FadeInView>
        {supplis.filter((suppli) => suppli.delete).length > 0 && !isDelete && (
          <TouchableOpacity
            onPress={() => navigation.navigate('SuppliArchiveScreen')}>
            <View style={Styles.recycleBtnContainer}>
              <RecycleBtn />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const Styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
  addButtonContainer: {
    maxHeight: 60,
    marginBottom: 40,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  recycleBtnContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
});

export default SupplementScreen;
