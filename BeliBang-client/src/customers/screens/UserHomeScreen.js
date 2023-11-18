import React from 'react';
import { View, Text, StyleSheet, Button, ImageBackground } from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    console.log(result);
  } else {
    console.log('No values stored under that key.');
  }
}

export default function UserHomeScreen({ navigation }) {
  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/1173579665/vector/seamless-pattern-supermarket-grocery-store-food-drinks-vegetables-fruits-fish-meat-dairy.jpg?s=612x612&w=0&k=20&c=XQQ9oPb6lx4m32iPIrmb1fzugwqr-WRUJo8nTod1D2Q=' }}
      style={styles.container}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to BeliBang App</Text>
        <View style={styles.buttonContainer}>
          <Button title="Explore Street Sellers" onPress={() => navigation.navigate('ListStores')} />
          <Button title="View Street Sellers on the Map" onPress={() => navigation.navigate('MapScreen')} />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
});
