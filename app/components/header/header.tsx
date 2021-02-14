// base
// https://github.com/joeyschroeder/react-native-animated-background-color-view

import React, {useEffect, useRef, useState} from 'react';
import {
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  View,
} from 'react-native';

import validateColor from 'validate-color';
import {Text} from 'react-native-svg';
import HeaderContent from './header-content';
import Shape from './shape';

type Prop = {
  end?: PositionIndex;
  start?: PositionIndex;
  title?: string;
  gradient?: boolean;
  position?: PositionStyle;
  subtitle?: string;
  shapeColor?: string;
  shadowColor?: string;
  shadowStyle?: StyleProp<View>;
  imageSource?: ImageSourcePropType;
  imageOnPress?: () => void;
  gradientColors?: string[];
  headerContentComponent?: (props: any) => JSX.Element;
};

function getSecondsFromTimeNow() {
  const now = new Date();
  const currentTimestamp = now.getTime();
  const offset = now.getTimezoneOffset() * 60;
  return currentTimestamp / 1000 - offset;
}

const GradientHeader = (props: Prop) => {
  const {
    end,
    start,
    title,
    gradient,
    position,
    subtitle,
    shapeColor,
    shadowColor = '#000',
    shadowStyle,
    imageSource,
    imageOnPress,
    gradientColors,
    headerContentComponent,
  } = props;

  // const {format} = settings || {};

  // const [seconds, setSeconds] = useState(getSecondsFromTimeNow());
  // const intervalRef = useRef();
  // const [hour, setHour] = useState(0);

  // function clearIntervalRef() {
  //   if (intervalRef.current) {
  //     clearInterval(intervalRef.current);
  //     intervalRef.current = undefined;
  //   }
  // }

  // const startTimer = () => {
  //   if (!intervalRef.current) {
  //     intervalRef.current = setInterval(
  //       () => setSeconds(getSecondsFromTimeNow()),
  //       5000,
  //     );
  //   }
  // };

  // // didMount effect
  // useEffect(() => {
  //   startTimer();
  //   console.log(seconds);
  //   setHour((preState) => {
  //     console.log(preState);
  //     if (preState === 23) {
  //       return 0;
  //     } else {
  //       return preState + 1;
  //     }
  //   });
  //   return clearIntervalRef;
  // }, [seconds]);

  // const gradientArr = {
  //   0: ['#5B86E5', '#36D1DC'],
  //   1: ['#5B86E5', '#36D1DC'],
  //   2: ['#44a08d', '#093637'], //
  //   3: ['#5B86E5', '#36D1DC'],
  //   4: ['#5B86E5', '#36D1DC'],
  //   5: ['#20002c', '#cbb4d4'], //
  //   6: ['#b2fefa', '#0ed2f7'], //
  //   7: ['#6190e8', '#a7bfe8'], //
  //   8: ['#5B86E5', '#36D1DC'], //
  //   9: ['#4568dc', '#b06ab3'], //
  //   10: ['#4ac29a', '#bdfff3'], //
  //   11: ['#f7971e', '#ffd200'], //
  //   12: ['#f2994a', '#f2c94c'], //
  //   13: ['#e44d26', '#f16529'], //
  //   14: ['#d66d75', '#e29587'], //
  //   15: ['#CB356B', '#BD3F32'], //
  //   16: ['#30e8bf', '#ff8235'], //
  //   17: ['#5B86E5', '#36D1DC'],
  //   18: ['#3a1c71', '#d76d77', '#ffaf7b'], //['#c33764', '#1d2671']
  //   19: ['#5B86E5', '#36D1DC'],
  //   20: ['#5B86E5', '#36D1DC'],
  //   21: ['#a770ef', '#cf8bf3', '#fdb99b'], //
  //   22: ['#200122', '#6f0000'], //
  //   23: ['#5B86E5', '#36D1DC'],
  // };

  return (
    <View
      style={[Styles.container, shadowStyle || getShadowStyle(shadowColor)]}>
      <Shape
        end={end}
        start={start}
        position={position}
        gradient={gradient}
        shapeColor={shapeColor}
        gradientColors={['#a1ffce', '#faffd1']}
      />
      {headerContentComponent || (
        <HeaderContent
          title={title}
          subtitle={subtitle}
          imageSource={imageSource}
          imageOnPress={imageOnPress}
        />
      )}
    </View>
  );
};

const getShadowStyle = (shadowColor: string) => {
  return {
    ...Platform.select({
      ios: {
        shadowRadius: 4.65,
        shadowColor: shadowColor,
        shadowOpacity: 0.29,
        shadowOffset: {
          width: 0,
          height: 3,
        },
      },
      android: {
        elevation: 7,
      },
    }),
  };
};

const Styles = StyleSheet.create({
  container: {
    // top: 0,
    // position: 'absolute',
  },
});

export default GradientHeader;
