import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CountSupplement from '../../components/count-supplement';
import WideBtn from '../../components/wide-btn';
import {ComStyles, screenThemeColor, winWidth} from '../../global-style';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ScrollView, TouchableHighlight} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {supplsState} from './suppl.hook';
import FadeInView from '../../components/fade-in-view';

const SupplementScreen = () => {
  const [switchCount, setSwitchCount] = useState(true);
  const [isDelete, setIsDelete] = useState(false);
  const suppls = useRecoilValue(supplsState);
  return (
    <ScrollView>
      <View style={Styles.screenContainer}>
        <View style={[ComStyles.centeringContainer, Styles.addButtonContainer]}>
          <View style={{alignSelf: 'flex-end'}}>
            <View style={Styles.minusIcon}>
              <TouchableHighlight
                underlayColor="white"
                onPress={() => {
                  setIsDelete((state) => !state);
                }}>
                {isDelete ? (
                  <Feather name="check-circle" size={50} color="black" />
                ) : (
                  <Fontisto name="close" size={35} color="lightpink" />
                )}
              </TouchableHighlight>
            </View>
          </View>
          {!isDelete && (
            <>
              <WideBtn
                btnText="サプリを登録する"
                toNavigate="SupplementForm"
                color={screenThemeColor.suppl}
              />
              <View style={{alignSelf: 'flex-end'}}>
                <View style={Styles.minusIcon}>
                  <TouchableHighlight
                    underlayColor="white"
                    onPress={() => {
                      setSwitchCount((state) => !state);
                    }}>
                    <Feather
                      name={switchCount ? 'minus-circle' : 'plus-circle'}
                      size={40}
                      color="gray"
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </>
          )}
        </View>
        <FadeInView>
          {suppls
            .filter((suppl) => !suppl.delete)
            .map((obj, index) => (
              <CountSupplement
                key={index}
                supplementName={obj.supplementName}
                switchCount={switchCount}
                isDelete={isDelete}
              />
            ))}
        </FadeInView>
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
  addButton: {
    width: 300,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
  },
  minusIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: -10,
    marginHorizontal: winWidth * 0.08,
  },
  minusIcon: {
    padding: 0,
    borderRadius: 20,
    shadowColor: screenThemeColor.suppl,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
});

export default SupplementScreen;
