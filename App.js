/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
***REMOVED*** from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
***REMOVED*** from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
***REMOVED***
***REMOVED***
      <StatusBar barStyle="dark-content" />
***REMOVED***
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView***REMOVED***>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine***REMOVED***>
              <Text style={styles.footer***REMOVED***>Engine: Hermes</Text>
            </View>
          )***REMOVED***
          <View style={styles.body***REMOVED***>
            <View style={styles.sectionContainer***REMOVED***>
              <Text style={styles.sectionTitle***REMOVED***>Step One</Text>
              <Text style={styles.sectionDescription***REMOVED***>
                Edit <Text style={styles.highlight***REMOVED***>App.js</Text> to change this
                screen and then come back to see your edits.
              </Text>
            </View>
            <View style={styles.sectionContainer***REMOVED***>
              <Text style={styles.sectionTitle***REMOVED***>See Your Changes</Text>
              <Text style={styles.sectionDescription***REMOVED***>
                <ReloadInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer***REMOVED***>
              <Text style={styles.sectionTitle***REMOVED***>Debug</Text>
              <Text style={styles.sectionDescription***REMOVED***>
                <DebugInstructions />
              </Text>
            </View>
            <View style={styles.sectionContainer***REMOVED***>
              <Text style={styles.sectionTitle***REMOVED***>Learn More</Text>
              <Text style={styles.sectionDescription***REMOVED***>
                Read the docs to discover what to do next:
              </Text>
            </View>
            <LearnMoreLinks />
          </View>
        </ScrollView>
***REMOVED***
***REMOVED***
***REMOVED***
***REMOVED***

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
***REMOVED***
  engine: {
    position: 'absolute',
    right: 0,
***REMOVED***
  body: {
    backgroundColor: Colors.white,
***REMOVED***
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
***REMOVED***
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
***REMOVED***
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
***REMOVED***
  highlight: {
    fontWeight: '700',
***REMOVED***
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
***REMOVED***
***REMOVED***

export default App;
