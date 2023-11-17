import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
  } else {
    console.log('No values stored under that key.');
  }
}

console.log(getValueFor('access_token'));

export default function UserHomeScreen({ navigation }) {
  return (
    <View>
      <Button title="Look list of street seller" onPress={() => navigation.navigate('ListStores')} />
      <Button title="Look street seller on the map" onPress={() => navigation.navigate('MapScreen')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739072',
  },
});
