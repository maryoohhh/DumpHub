import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Map from './components/Map';

export default class App extends React.Component {
  render() {
    return (
      <Map />
    );
  }
}
