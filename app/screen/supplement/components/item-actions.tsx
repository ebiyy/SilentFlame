import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useRecoilState} from 'recoil';
import WideBtn from '../../../components/wide-btn';
import {screenThemeColor, shadowStyles, winWidth} from '../../../global-style';
import {imageResState, supplisState} from '../suppli.hook';

type setBooleanState = React.Dispatch<React.SetStateAction<boolean>>;

type GenerateSideIconProps = {
  setState: setBooleanState;
  iconName: string;
};

const GenerateSideIcon = ({setState, iconName}: GenerateSideIconProps) => {
  return (
    <View style={Styles.flexEnd}>
      <View style={Styles.iconContainer}>
        <TouchableHighlight
          underlayColor="white"
          onPress={() => setState((state) => !state)}>
          {(() => {
            switch (iconName) {
              case 'check-circle':
                return <Feather name="check-circle" size={50} color="black" />;
              case 'close':
                return <Fontisto name="close" size={35} color="lightpink" />;
              case 'minus-circle':
              case 'plus-circle':
                return <Feather name={iconName} size={40} color="gray" />;
            }
          })()}
        </TouchableHighlight>
      </View>
    </View>
  );
};

type Props = {
  switchCount: boolean;
  setSwitchCount: setBooleanState;
  isDelete: boolean;
  setIsDelete: setBooleanState;
};

const ItemActions = (props: Props) => {
  const navigation = useNavigation();
  const {switchCount, setSwitchCount, isDelete, setIsDelete} = props;
  const [imageRes, setImageRes] = useRecoilState(imageResState);
  const [supplis, setSupplis] = useRecoilState(supplisState);
  return (
    <>
      <GenerateSideIcon
        setState={setIsDelete}
        iconName={isDelete ? 'check-circle' : 'close'}
      />
      {!isDelete && (
        <>
          {/* <WideBtn
            btnText="サプリを登録する"
            toNavigate="SupplFormScreen"
            color={screenThemeColor.suppli}
            navigatePrames={{mode: 'add'}}
          /> */}
          <TouchableOpacity
            style={{width: winWidth / 2}}
            onPress={() => {
              setImageRes({});
              navigation.navigate('SupplFormScreen', {
                mode: 'add',
                setMarge: setSupplis,
                btnColor: screenThemeColor.suppli,
              });
            }}>
            <View
              style={[
                Styles.registrationTimePeriodItems,
                shadowStyles(screenThemeColor.suppli).boxShadow,
                {height: 75},
              ]}>
              <Text style={Styles.btnText}>サプリを登録する</Text>
            </View>
          </TouchableOpacity>
          <GenerateSideIcon
            setState={setSwitchCount}
            iconName={switchCount ? 'minus-circle' : 'plus-circle'}
          />
        </>
      )}
    </>
  );
};

const Styles = StyleSheet.create({
  flexEnd: {
    alignSelf: 'flex-end',
  },
  iconContainer: {
    padding: 0,
    borderRadius: 20,
    shadowColor: screenThemeColor.suppli,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    backgroundColor: 'white',
  },
  registrationTimePeriodItems: {
    margin: 3,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 150,
    // height: 80,
    borderRadius: 10,
    // backgroundColor: '#ddd',
    shadowColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: screenThemeColor.meals,
  },
  btnText: {
    fontSize: 18,
    fontFamily: 'Hiragino Sans',
  },
});

export default ItemActions;
