import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

export const ICON_TYPE = {
  MCi: 'MaterialCommunityIcons',
  Fa5i: 'FontAwesome5Icons',
  Ioni: 'Ionicons',
  Anti: 'AntDesign',
};

export type IconElm = (
  name: string,
  color: string,
  size: number,
) => JSX.Element;

export const MCi = (name: string, color: string, size: number) => (
  <MaterialCommunityIcons name={name} color={color} size={size} />
);

export const Fa5i = (name: string, color: string, size: number) => (
  <FontAwesome5 name={name} color={color} size={size} />
);

export const Ioni = (name: string, color: string, size: number) => (
  <Ionicons name={name} color={color} size={size} />
);

export const Anti = (name: string, color: string, size: number) => (
  <AntDesign name={name} color={color} size={size} />
);
