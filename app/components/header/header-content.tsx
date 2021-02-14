// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view
import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ImageSourcePropType,
} from 'react-native';
import {isAndroid, getStatusBarHeight} from '@freakycoder/react-native-helpers';

type Props = {
  title: string | undefined;
  subtitle: string | undefined;
  imageOnPress: (() => void) | undefined;
  imageSource: ImageSourcePropType | undefined;
};

const HeaderContent = (props: Props) => {
  const {
    title = 'Today',
    subtitle = 'Have a nice day',
    imageSource = require('./profile.jpg'),
    imageOnPress = () => {},
  } = props;
  return (
    <SafeAreaView>
      <View style={Styles.container}>
        {/* <View style={Styles.leftContainer}>
          <Text style={Styles.dateTextStyle}>{title}</Text>
          <Text style={Styles.saluteTextStyle}>{subtitle}</Text>
        </View>
        <View style={Styles.rightContainer}>
          {imageSource && (
            <TouchableOpacity onPress={imageOnPress}>
              <Image source={imageSource} style={Styles.myProfileImageStyle} />
            </TouchableOpacity>
          )}
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const {width} = Dimensions.get('window');

const Styles = StyleSheet.create({
  container: {
    width,
    height: 35,
    flexDirection: 'row',
    marginTop: isAndroid
      ? getStatusBarHeight() !== undefined
        ? getStatusBarHeight() + 8
        : 8
      : 8,
  },
  leftContainer: {
    left: 16,
  },
  dateTextStyle: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  saluteTextStyle: {
    fontSize: 14,
    color: 'white',
    fontWeight: '500',
  },
  rightContainer: {
    right: 16,
    position: 'absolute',
    flexDirection: 'row',
  },
  ticketImageStyle: {
    top: 8,
    right: 20,
    width: 35,
    height: 35,
  },
  myProfileImageStyle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
});

export default HeaderContent;
