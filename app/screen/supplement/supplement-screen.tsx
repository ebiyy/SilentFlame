import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountSupplement from './count-supplement';
import {ComStyles} from '../../global-style';
import {ScrollView} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {supplisState} from './suppli.hook';
import FadeInView from '../../components/fade-in-view';
import RecycleBtn from './components/recycle-btn';
import ItemActions from './components/item-actions';

const SupplementScreen = () => {
  const [switchCount, setSwitchCount] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const supplis = useRecoilValue(supplisState);

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
        <View style={Styles.recycleBtnContainer}>
          <RecycleBtn />
        </View>
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
