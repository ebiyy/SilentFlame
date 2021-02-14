import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';

// class reason: Invariant Violation: `createAnimatedComponent` does not support stateless functional components; use a class component instead.
// https://github.com/software-mansion/react-native-reanimated/issues/593
export class GradientHelper extends Component {
  render() {
    const {style, color1, color2, startX, startY, endX, endY} = this.props;
    return (
      <LinearGradient
        colors={[color1, color2]}
        start={{
          x: startX,
          y: startY,
        }}
        end={{
          x: endX,
          y: endY,
        }}
        style={style}
      />
    );
  }
}
