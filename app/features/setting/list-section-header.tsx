import React from 'react';
import {Text, View} from 'react-native';
import {shadowStyles} from '../../global/styles';

interface Props {
  icon: JSX.Element;
  title: string;
}

const StyledSectionWrapper = (props) => (
  <View
    style={{
      marginTop: 20,
      marginBottom: 10,
      width: '55%',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#090909',
      borderRadius: 10,
      ...shadowStyles('#090909').boxShadow,
    }}>
    {props.children}
  </View>
);

export const SettingsListSectionHeader = (props: Props) => {
  const {icon, title} = props;

  return (
    <StyledSectionWrapper>
      {icon}

      <Text
        style={{
          marginLeft: 13,
          color: '#090909',
          fontWeight: '700',
          fontSize: 18,
        }}>
        {title}
      </Text>
    </StyledSectionWrapper>
  );
};
