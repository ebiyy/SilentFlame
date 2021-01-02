import 'react-native-gesture-handler';
import React from 'react';
import {View, Text***REMOVED*** from 'react-native';
import {NavigationContainer***REMOVED*** from '@react-navigation/native';
import {createStackNavigator***REMOVED*** from '@react-navigation/stack';
import SampleRealm from './realm.sample';
import {MyTabs***REMOVED*** from '../components/tab-bar';

function HomeScreen() {
***REMOVED***
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'***REMOVED******REMOVED***>
      <Text>Home Screen</Text>
    </View>
***REMOVED***
***REMOVED***

const Stack = createStackNavigator();

const NavigationSample = () => {
***REMOVED***
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen***REMOVED*** />
      </Stack.Navigator>
    </NavigationContainer>
***REMOVED***
***REMOVED***

export default NavigationSample;
