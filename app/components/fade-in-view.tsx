import React, {useRef, useEffect} from 'react';
import {Animated} from 'react-native';

type Props = {
  style?: Object;
  children?: Element;
  duration?: number;
};

export const FadeInView = (props: Props) => {
  const {style, children, duration = 500} = props;
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: duration,
      useNativeDriver: true,
    }).start();
  }, [duration, fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};
