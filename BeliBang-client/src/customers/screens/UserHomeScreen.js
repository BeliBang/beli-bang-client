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

export default function UserHomeScreen() {
  return (
    <View>
      <Text>INI HALAMAN HOME</Text>
      <Button title="Lihat list pedagang" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#739072',
  },
});
